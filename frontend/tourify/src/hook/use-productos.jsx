import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';

export const useProductos = () => {
  const { supabase } = useSupabase();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    console.log(id)
    const { data, error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)
      .select('*');


    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (data) {
      console.log(data);
    }

    setProductos(prevProducts => {
      return prevProducts.filter(product => product.id !== id)
    })
  }


  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      const productosRandom = data.sort(() => Math.random() - 0.5);
      setProductos(productosRandom);
      setLoading(false);
    };

    fetchProductos();
  }, [supabase]);

  return { productos, loading, error, handleDelete };
};
