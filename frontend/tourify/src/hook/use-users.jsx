import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';

export const useUsers = () => {
  const { supabase } = useSupabase();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleUpdateUser = async (id, updatedUser) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .update(updatedUser)
      .eq('id', id)
      .select();

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

    setUsers(data || []);
    setLoading(false);
  };

  // Obtener usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, [supabase]);

  // Verificar y recargar usuarios si el array está vacío
  useEffect(() => {
    if (!loading && users.length === 0) {
      fetchUsers();
    }
  }, [users, loading]);

  return { users, loading, error, handleCreateUser, handleUpdateUser, handleDeleteUser };
};
