import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    try {
      console.log('Iniciando fetchProductos');
      
      // Obtener productos con sus características
      const { data: productos, error: productosError } = await supabase
        .from('productos')
        .select(`
          *,
          productos_caracteristicas!left (
            caracteristica_id,
            valor
          )
        `)
        .order('id');

      if (productosError) {
        console.error('Error al obtener productos:', productosError);
        throw productosError;
      }

      console.log('Productos raw:', productos);

      // Formatear los productos
      const productosFormateados = await Promise.all(productos.map(async (producto) => {
        // Obtener características para este producto
        const { data: caracteristicas, error: charError } = await supabase
          .from('productos_caracteristicas')
          .select('caracteristica_id, valor')
          .eq('producto_id', producto.id);

        if (charError) {
          console.error(`Error obteniendo características para producto ${producto.id}:`, charError);
          return { ...producto, characteristics: {} };
        }

        console.log(`Características raw para producto ${producto.id}:`, caracteristicas);

        // Convertir características a objeto con valores numéricos
        const characteristics = (caracteristicas || []).reduce((acc, pc) => ({
          ...acc,
          [pc.caracteristica_id]: parseInt(pc.valor)
        }), {});

        console.log(`Características formateadas para producto ${producto.id}:`, characteristics);

        return {
          ...producto,
          characteristics
        };
      }));

      console.log('Productos formateados final:', productosFormateados);
      setProductos(productosFormateados);
    } catch (error) {
      console.error('Error en fetchProductos:', error);
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
      console.log('Producto a actualizar:', updatedProduct);
      console.log('Características a actualizar:', updatedProduct.characteristics);

      // 1. Actualizar datos básicos del producto
      const { error: productError } = await supabase
        .from('productos')
        .update({
          name: updatedProduct.name,
          destination: updatedProduct.destination,
          city: updatedProduct.city,
          duration_days: parseInt(updatedProduct.duration_days),
          duration_nights: parseInt(updatedProduct.duration_nights),
          unit_price: parseFloat(updatedProduct.unit_price),
          url_img: updatedProduct.url_img || null,
          description: updatedProduct.description || '',
          itinerary: updatedProduct.itinerary || '',
          reviews: parseInt(updatedProduct.reviews) || 0
        })
        .eq('id', updatedProduct.id);

      if (productError) {
        console.error('Error actualizando producto:', productError);
        throw productError;
      }

      // 2. Eliminar características existentes
      const { error: deleteError } = await supabase
        .from('productos_caracteristicas')
        .delete()
        .eq('producto_id', updatedProduct.id);

      if (deleteError) {
        console.error('Error eliminando características:', deleteError);
        throw deleteError;
      }

      // 3. Preparar características para insertar
      const caracteristicasToInsert = Object.entries(updatedProduct.characteristics)
        .filter(([_, value]) => value === 1)
        .map(([charId, _]) => ({
          producto_id: updatedProduct.id,
          caracteristica_id: parseInt(charId),
          valor: 1
        }));

      console.log('Características a insertar:', caracteristicasToInsert);

      // 4. Insertar nuevas características
      if (caracteristicasToInsert.length > 0) {
        const { data: insertedData, error: insertError } = await supabase
          .from('productos_caracteristicas')
          .insert(caracteristicasToInsert)
          .select();

        if (insertError) {
          console.error('Error insertando características:', insertError);
          throw insertError;
        }

        console.log('Características insertadas:', insertedData);
      }

      // 5. Recargar datos
      await fetchProductos();
      return { success: true };
    } catch (error) {
      console.error('Error completo al actualizar:', error);
      throw error;
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