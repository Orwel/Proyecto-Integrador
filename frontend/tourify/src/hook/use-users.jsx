import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';

export const useUsers = () => {
  const { supabase } = useSupabase();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para crear un nuevo usuario
  const handleCreateUser = async (newUser) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .insert([newUser]);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      setUsers(prevUsers => [...prevUsers, data[0]]);
    }
    setLoading(false);
  };

  // Función para actualizar un usuario
  const handleUpdateUser = async (id, updatedUser) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .update(updatedUser)
      .eq('id', id);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      setUsers(prevUsers =>
        prevUsers.map(user => 
          user.id === id ? { ...user, ...data[0] } : user
        )
      );
    }
    setLoading(false);
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (id) => {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setUsers(prevUsers => 
      prevUsers.filter(user => user.id !== id)
    );
  };

  // Obtener usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setUsers(data || []);  // Asegurarse de que data sea un array antes de usarlo
      setLoading(false);
    };

    fetchUsers();
  }, [supabase]);

  return { users, loading, error, handleCreateUser, handleUpdateUser, handleDeleteUser };
};
