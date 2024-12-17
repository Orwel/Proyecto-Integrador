import React, { useState } from 'react';
import { supabase } from "../supabaseClient";
import { Card } from './Card.jsx';
import { Pagination } from "@nextui-org/react";
import '../styles/searchResults.css';

export const ResultadosBusqueda = ({ criterios }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const productsPerPage = 2;

  React.useEffect(() => {
    // Solo realizar búsqueda si hay criterios y se ha realizado una búsqueda
    if (criterios.startDate === null && criterios.endDate === null && criterios.searchText === '') {
      setReservas([]);
      setBusquedaRealizada(false);
      return;
    }

    if (!criterios.startDate || !criterios.endDate) return;
    
    buscarProductosDisponibles(criterios);
    setBusquedaRealizada(true);
  }, [criterios]);

  const buscarProductosDisponibles = async ({ startDate, endDate, searchText }) => {
    setLoading(true);
    console.log('Buscando con criterios:', { startDate, endDate, searchText });

    try {
      // 1. Primero obtenemos todos los productos que coincidan con el destino
      let query = supabase.from('productos').select('*');

      if (searchText) {
        const cleanText = searchText.split(' (')[0];
        query = query.or(`city.ilike.%${cleanText}%,destination.ilike.%${cleanText}%`);
      }

      const { data: productos, error } = await query;
      if (error) throw error;

      // 2. Verificar disponibilidad en el rango de fechas
      const fechaInicio = new Date(startDate);
      const fechaFin = new Date(endDate);
      const duracionSolicitada = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

      // 3. Filtrar productos por duración mínima y disponibilidad
      const { data: reservasExistentes } = await supabase
        .from('reservas')
        .select('*')
        .overlaps('start_date', 'end_date', startDate, endDate);

      const productosDisponibles = productos.filter(producto => {
        // Verificar duración mínima
        if (duracionSolicitada < producto.duration_days) {
          return false;
        }

        // Verificar si no hay reservas que se solapen
        const tieneReserva = reservasExistentes?.some(reserva => 
          reserva.producto_id === producto.id
        );

        return !tieneReserva;
      });

      setReservas(productosDisponibles);
    } catch (err) {
      console.error('Error en la búsqueda:', err);
      setReservas([]);
    } finally {
      setLoading(false);
    }
  };

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = reservas.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(reservas.length / productsPerPage);

  if (loading) return <div>Cargando...</div>;
  if (!busquedaRealizada) return null;

  return (
    <div className="search-results">
      <h2 className="text-2xl font-bold mb-4">Resultados de la búsqueda:</h2>
      {reservas.length > 0 ? (
        <>
          <div className="search-results-grid">
            {currentProducts.map((producto) => (
              <div key={producto.id} className="flex justify-center">
                <div className="w-full max-w-[600px]">
                  <Card
                    id={producto.id}
                    image={producto.url_img}
                    title={producto.name}
                    location={producto.city}
                    country={producto.destination}
                    reviews={producto.reviews}
                    rating={producto.rating}
                    price={producto.unit_price}
                  />
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                color="warning"
                size="lg"
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">
          No se encontraron productos disponibles para las fechas y destino seleccionados.
        </p>
      )}
    </div>
  );
};
