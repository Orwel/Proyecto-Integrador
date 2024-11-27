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
      const { data: productos, error: checkError } = await supabase
        .from('productos')
        .select('id')
        .eq('categoria_id', categoriaId);

      if (checkError) throw checkError;

      if (productos?.length > 0) {
        throw new Error('No se puede eliminar la categoría porque hay productos asociados a ella');
      }

      const { error: deleteError } = await supabase
        .from('categorias')
        .delete()
        .eq('id', categoriaId);

      if (deleteError) {
        console.error('Error al eliminar:', deleteError);
        throw new Error('Error al eliminar la categoría');
      }

      setCategorias(prev => prev.filter(cat => cat.id !== categoriaId));
      return { success: true };
    } catch (error) {
      console.error('Error completo:', error);
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