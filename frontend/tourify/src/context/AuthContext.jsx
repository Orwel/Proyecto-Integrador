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
      // console.log("Valor de userInfo:", profile);
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
        // navigate("/");
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
          // console.log(data.user.id);
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
    let respData = null;
    let respError = null;
  
    try {
      // Verificar si el correo ya existe en la tabla de usuarios
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
  
      if (checkError && checkError.code !== "PGRST116") {
        // Otro error inesperado al verificar el usuario
        console.error("Error al verificar usuario existente:", checkError);
        respError = "Error inesperado al verificar el correo electrónico.";
        return { respData, respError };
      }
  
      if (existingUser) {
        // El correo ya está registrado
        respError = "El correo ya está registrado. Por favor, inicia sesión.";
        console.error(respError);
        return { respData, respError };
      }
  
      // Si no existe, proceder con el registro
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name,
            last_name,
          },
        },
      });
  
      console.log("Respuesta de signUp:", response);
  
      if (response.error) {
        respError = response.error.message;
        console.error("Error en signUp:", response.error.message);
      } else {
        respData = response.data;
        console.log("Nuevo ID de usuario en signUp:", response.data.user?.id);
      }
    } catch (error) {
      console.error("Error inesperado durante el registro:", error);
      respError = "Ocurrió un error inesperado al intentar registrarse.";
    }
  
    return { respData, respError };
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
