import { useState, useEffect } from "react";
import { useSupabase } from '../context/supabase-context';
import { useAuth } from "../context/AuthContext";

export const useReservas = () => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (productId, startDate, endDate) => {
    try {
      if (!user) throw new Error('Usuario no autenticado.');
      setLoading(true);

      const { data, error } = await supabase
        .from('reservas')
        .insert({
          producto_id: productId,
          user_id: user.id,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: 'active',
        })
        .single();

      if (error) throw error;

      setReservas((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchReservas = async () => {
      if (!user) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("reservas")
        .select(`
          id, 
          producto_id, 
          user_id, 
          start_date, 
          end_date, 
          status,
          productos (name, description), 
          users (first_name, last_name, email)
        `)
        .eq("user_id", user.id );

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setReservas(data);
      setLoading(false);
    };

    fetchReservas();
  }, [supabase, user]);

  return { reservas, loading, error, handleCreate };
};
