import { createContext, useState, useEffect, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';  

const Context = createContext(undefined);

export default function SupabaseProvider({ children }) {
  const navigate = useNavigate();  
  const [supabase] = useState(() => createClient(
    'https://ajcbomdufukavyhkteqy.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqY2JvbWR1ZnVrYXZ5aGt0ZXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NTIwMDAsImV4cCI6MjA0NTIyODAwMH0.WQKvGN6_dq5fPieMWVWIxRGnXl5lXiAQkwBcO0B_gkA'
  ));

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
        // Navega a una ruta específica si es necesario, por ejemplo:
        // navigate('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        // Navega a la página de inicio o de login si es necesario
        // navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, navigate]);

  return (
    <Context.Provider value={{ supabase, isAuthenticated }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
