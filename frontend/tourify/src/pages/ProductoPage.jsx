import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import DetalleProducto from '../components/DetalleProducto';

const ProductoPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProducto(data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      obtenerProducto();
    }
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!producto) return <div>Producto no encontrado</div>;

  return <DetalleProducto producto={producto} />;
};

export default ProductoPage; 