import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategorias = async () => {
    try {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('id');

      if (error) throw error;
      console.log("Categorías cargadas:", data);
      setCategorias(data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    refetch: fetchCategorias
  };
}; 