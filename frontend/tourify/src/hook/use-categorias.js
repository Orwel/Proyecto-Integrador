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

  const handleCreate = async (newCategoria) => {
    try {
      if (!newCategoria.name || !newCategoria.description || !newCategoria.url_image) {
        throw new Error('Todos los campos son requeridos');
      }

      const { data, error } = await supabase
        .from('categorias')
        .insert([newCategoria])
        .select();

      if (error) throw error;

      setCategorias(prev => [...prev, data[0]]);
      return { success: true };
    } catch (error) {
      console.error('Error creating categoria:', error);
      throw error;
    }
  };

  const handleDelete = async (categoriaId) => {
    try {
      const { error } = await supabase
        .from('categorias')
        .delete()
        .eq('id', categoriaId);

      if (error) throw error;

      setCategorias(prev => prev.filter(cat => cat.id !== categoriaId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting categoria:', error);
      throw error;
    }
  };

  return {
    categorias,
    loading,
    error,
    handleCreate,
    handleDelete,
    refetch: fetchCategorias
  };
}; 