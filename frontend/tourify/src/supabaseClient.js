import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Añadir logs para depuración
console.log('Intentando conectar a Supabase...');
console.log('URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true
  },
  db: {
    schema: 'public'
  }
});

// Verificar conexión
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
}); 