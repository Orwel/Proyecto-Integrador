import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context'; // Importa el contexto

export const useCategorias = () => {
  const { supabase } = useSupabase(); // Obtén Supabase del contexto
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data, error } = await supabase
          .from('categorias') // Cambia 'categorias' por el nombre real de tu tabla en Supabase
          .select('*');

        if (error) throw error;
        setCategorias(data || []);
      } catch (error) {
        console.error('Error al obtener las categorías:', error.message);
      }
    };

    fetchCategorias();
  }, [supabase]);

  const handleCreate = async (categoria) => {
    try {
      const { data, error } = await supabase
        .from('categorias')
        .insert([categoria]);

      if (error) throw error;
      setCategorias((prev) => [...prev, ...data]);
    } catch (error) {
      console.error('Error al agregar la categoría:', error.message);
    }
  };

  const handleUpdate = async (id, updatedCategoria) => {
    try {
      const { data, error } = await supabase
        .from('categorias')
        .update(updatedCategoria)
        .eq('id', id);

      if (error) throw error;
      setCategorias((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, ...data[0] } : cat))
      );
    } catch (error) {
      console.error('Error al actualizar la categoría:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('categorias').delete().eq('id', id);

      if (error) throw error;
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error('Error al eliminar la categoría:', error.message);
    }
  };

  return { categorias, handleCreate, handleUpdate, handleDelete };
};
