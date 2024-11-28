import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';
import { useNavigate } from "react-router-dom";

export const useCaracteristicas = () => {
  const { supabase } = useSupabase();
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' }); 

  // Función para obtener las características
  const fetchCaracteristicas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('caracteristicas')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setCaracteristicas(data);
    setLoading(false);
  };

  // Función para crear una nueva caracteristica
  const handleCreate = async (newCaracteristica) => {
    try {
      console.log("Intentando insertar: ", newCaracteristica);

      const { data, error } = await supabase
        .from('caracteristicas')
        .insert([newCaracteristica]);

      if (error) {
        throw error;
      }
      if (Array.isArray(data)) {
        setCaracteristicas(prevCaracteristicas => [
          ...prevCaracteristicas,
          ...data, 
        ]);
      }   
      setMessage({
        text: 'Característica agregada exitosamente',
        type: 'success',
      });  
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      fetchCaracteristicas();
    } catch (error) {
      console.error('Error al agregar característica:', error);
      setMessage({
        text: `Error al agregar característica: ${error.message}`,
        type: 'error',
      });
    }
  };
  
  // Función para actualizar una caracteristica
  const handleUpdate = async (updatedCaracteristica) => {
    const { data, error } = await supabase
      .from('caracteristicas')
      .update({
        name: updatedCaracteristica.name,
        description: updatedCaracteristica.description,
        url_icon: updatedCaracteristica.url_icon,
      })
      .eq('id', updatedCaracteristica.id);
  
    if (error) {
      throw error;
    }
    fetchCaracteristicas();
    return data;
  };
  
  // Función para eliminar una caracteristica
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('caracteristicas')
        .delete()
        .eq('id', id);
  
      if (error) {
        throw error; 
      }
    } catch (error) {
      console.error('Error capturado en handleDelete:', error); 
      throw error; 
    }
    fetchCaracteristicas();
  };

  // Obtener características al montar el componente
  useEffect(() => {
    fetchCaracteristicas();
  }, [supabase]);

  return { caracteristicas, loading, error, handleCreate, handleUpdate, handleDelete };
};
