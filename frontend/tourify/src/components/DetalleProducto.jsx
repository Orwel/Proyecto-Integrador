import React, { useState } from 'react';
import Calendario from './Calendario';

const DetalleProducto = ({ producto }) => {
  const handleDateSelect = ({ startDate, endDate, duracionDias }) => {
    console.log('Fechas seleccionadas:', { startDate, endDate, duracionDias });
    // Aquí puedes manejar la lógica de reserva
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{producto?.name}</h2>
        <p className="mb-2">Destino: {producto?.destination}</p>
        <p className="mb-2">Ciudad: {producto?.city}</p>
        <p className="mb-4">Precio: ${producto?.unit_price}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Selecciona tus fechas</h3>
        <Calendario 
          productoId={producto?.id}
          onDateSelect={handleDateSelect}
        />
      </div>
    </div>
  );
};

export default DetalleProducto; 