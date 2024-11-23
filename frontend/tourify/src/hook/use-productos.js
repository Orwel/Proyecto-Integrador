import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('id');

      if (error) throw error;
      setProductos(data);
    } catch (error) {
      console.error('Error fetching productos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setProductos(productos.filter(product => product.id !== productId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const handleCreate = async (newProduct) => {
    // ... código existente ...
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      // Preparar los datos para la actualización
      const updateData = {
        name: updatedProduct.name,
        destination: updatedProduct.destination,
        city: updatedProduct.city,
        duration_days: parseInt(updatedProduct.duration_days),
        duration_nights: parseInt(updatedProduct.duration_nights),
        unit_price: parseFloat(updatedProduct.unit_price),
        url_img: updatedProduct.url_img || null,
        description: updatedProduct.description || '',
        itinerary: updatedProduct.itinerary || '',
        reviews: parseInt(updatedProduct.reviews) || 0,
        characteristics: updatedProduct.characteristics || {}
      };

      console.log('Datos a actualizar:', updateData);

      const { data, error } = await supabase
        .from('productos')
        .update(updateData)
        .eq('id', updatedProduct.id)
        .select();

      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }

      // Actualizar el estado local
      setProductos(prevProductos => 
        prevProductos.map(producto => 
          producto.id === updatedProduct.id ? { ...producto, ...updateData } : producto
        )
      );

      await fetchProductos(); // Recargar los datos
      return { success: true, data };
    } catch (error) {
      console.error('Error detallado al actualizar:', error);
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

  return {
    productos,
    loading,
    error,
    handleDelete,
    handleCreate,
    handleUpdate,
    refetch: fetchProductos
  };
}; 