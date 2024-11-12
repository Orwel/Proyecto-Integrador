import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "./supabase-context";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const { supabase } = useSupabase();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('name')
          .eq('id', data.session.user.id)
          .single();
        if (profile) setUser((user) => ({ ...user, name: profile.name }));
      }

    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, navigate]);

  const signIn = async (email, password) => {
    let respData = null;
    let respError = null;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error !== null) {
        respError = error;
        console.log('error ', error)
      } else {
        respData = data;
        if (data.user) {
          console.log(data.user.id);
          const { data: dataUser, error } = await supabase
            .from('users')
            .select()
            .eq('id', data.user.id)
            .limit(1)
            .single()
          if (!error) {
            console.log('DATA USER SETUSERINFO', dataUser)
            setUserInfo(dataUser)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }

    return { respData, respError }
  }


  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setUserInfo(null); 
  };

  const signUp = async (email, password, name) => {

    const { user, error } = await supabase.auth.signUp({
      email, password, options: {
        data: {
          name,
        },
      }
    });
    if (error) throw error;


  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};