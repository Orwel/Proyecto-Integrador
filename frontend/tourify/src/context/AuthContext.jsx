import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "./supabase-context";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const { supabase } = useSupabase();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  
  const getUserInfo = async (id) => {
    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

      if (profile && !error) {
        setUserInfo(profile);
        console.log("Valor de userInfo:", profile);
      } else if (error) {
        console.log("Error al obtener userInfo:", error);
      }
    };

  
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        getUserInfo(sessionUser.id);
      }
    };

    getSession();

   
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        getUserInfo(session.user.id);
      } else if (event === "SIGNED_OUT") {
        navigate("/");
        setUserInfo(null);
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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error !== null) {
        respError = error;
        console.log("error ", error);
      } else {
        respData = data;
        if (data.user) {
          console.log(data.user.id);
          getUserInfo(data.user.id); 
        }
      }
    } catch (error) {
      console.log(error);
    }

    return { respData, respError };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setUserInfo(null);
  };

  const signUp = async (email, password, first_name, last_name) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });

    if (error) throw error;
    return data;
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
