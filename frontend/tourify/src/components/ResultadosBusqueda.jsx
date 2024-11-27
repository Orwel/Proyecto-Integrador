import React, { useState } from 'react';
import { supabase } from "../supabaseClient";

export const ResultadosBusqueda = ({ criterios }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!criterios.startDate || !criterios.endDate) return;

    buscarProductosDisponibles(criterios);
  }, [criterios]);

  const buscarProductosDisponibles = async ({ startDate, endDate, filterText }) => {
    setLoading(true);

    try {
      // Llamada a la función SQL
      const { data, error } = await supabase
        .rpc('productos_disponibles', {
          fecha_inicio: startDate,
          fecha_fin: endDate,
          filtro_texto: filterText || null,
        });

      if (error) {
        console.error('Error al ejecutar la función SQL:', error);
        setReservas([]);
      } else {
        setReservas(data);
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      setReservas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Resultados:</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : reservas.length > 0 ? (
        <ul>
          {reservas.map((producto) => (
            <li key={producto.id}>{producto.nombre}</li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron productos disponibles.</p>
      )}
    </div>
  );
};
