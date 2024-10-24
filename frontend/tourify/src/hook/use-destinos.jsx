import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';


export const useDestinos = () => {
  const { supabase } = useSupabase(); 
  const [destinos, setDestinos] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDestinos = async () => {
      setLoading(true); 
      const { data, error } = await supabase
        .from('destinos') 
        .select('*'); 

      if (error) {
        setError(error); 
        setLoading(false); 
        return;
      }

      setDestinos(data);
      setLoading(false);
    };

    fetchDestinos(); 
  }, [supabase]); 

  return { destinos, loading, error }; 
};
