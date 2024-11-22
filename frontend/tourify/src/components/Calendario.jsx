import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { supabase } from '../supabaseClient';
import { addDays, isWithinInterval, differenceInDays } from 'date-fns';

registerLocale('es', es);

const Calendario = ({ productoId, onDateSelect, duracionMinima }) => {
  console.log('duracionMinima recibida:', duracionMinima);
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    obtenerReservas();
  }, [productoId]);

  const obtenerReservas = async () => {
    try {
      setIsRetrying(false);
      setError(null);
      setLoading(true);

      if (!productoId) {
        throw new Error('ID de producto no válido');
      }

      const { data, error } = await supabase
        .from('reservas')
        .select(`
          id,
          producto_id,
          start_date,
          end_date,
          status
        `)
        .eq('producto_id', productoId)
        .eq('status', 'active');

      if (error) throw error;
      setReservas(data || []);
    } catch (error) {
      console.error('Error detallado:', error);
      setError('No se pudo cargar la disponibilidad. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setIsRetrying(true);
    obtenerReservas();
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    
    // Si se selecciona la fecha de inicio
    if (start && !end) {
      setDateRange([start, null]);
    } 
    // Si se selecciona la fecha de fin
    else if (start && end) {
      const dias = differenceInDays(end, start) + 1;
      
      // Verificar si la duración seleccionada es correcta
      if (dias === duracionMinima) {
        setDateRange([start, end]);
        if (onDateSelect) {
          onDateSelect({
            startDate: start,
            endDate: end,
            duracionDias: duracionMinima
          });
        }
      } else {
        // Si la duración no es correcta, mantener solo la fecha de inicio
        setDateRange([start, null]);
        alert(`La duración debe ser exactamente ${duracionMinima} días`);
      }
    } else {
      // Si se deselecciona todo
      setDateRange([null, null]);
    }
  };

  const esFechaDisponible = (date) => {
    console.log('Verificando fecha:', date);
    console.log('Fecha inicio actual:', startDate);
    console.log('duracionMinima en validación:', duracionMinima);

    // Verificar si la fecha es anterior a hoy
    if (date < new Date()) {
      console.log('Fecha es anterior a hoy');
      return false;
    }

    // Si hay fecha inicial seleccionada, solo permitir fechas que cumplan con la duración
    if (startDate && !endDate) {
      const dias = differenceInDays(date, startDate) + 1;
      console.log('Días de diferencia:', dias);
      if (dias !== duracionMinima) {
        console.log('No cumple con duración mínima');
        return false;
      }
    }

    // Verificar si la fecha está dentro de alguna reserva existente
    const fechaOcupada = reservas.some(reserva => {
      const reservaStart = new Date(reserva.start_date);
      const reservaEnd = new Date(reserva.end_date);
      return isWithinInterval(date, { start: reservaStart, end: reservaEnd });
    });

    if (fechaOcupada) {
      console.log('Fecha ocupada por reserva');
      return false;
    }

    console.log('Fecha disponible');
    return true;
  };

  const handleClearDates = () => {
    setDateRange([null, null]);
  };

  return (
    <div>
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {isRetrying ? 'Intentando...' : 'Intentar nuevamente'}
          </button>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8127]"></div>
        </div>
      ) : (
        <div>
          {startDate && (
            <div className="mb-4 flex justify-start">
              <button
                onClick={handleClearDates}
                className="text-[#FF8127] hover:text-[#FF8127]/80 font-medium"
              >
                Borrar fechas
              </button>
            </div>
          )}

          <div className="react-datepicker-wrapper">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              locale="es"
              minDate={new Date()}
              filterDate={esFechaDisponible}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona las fechas"
              monthsShown={2}
              showDisabledMonthNavigation
              wrapperClassName="w-full"
              calendarClassName="!flex !gap-8 !border-0 !rounded-lg !bg-transparent"
              formatWeekDay={nameOfDay => nameOfDay.substring(0, 3) + '.'}
              dayClassName={date =>
                `hover:!bg-[#FF8127]/10 !rounded-full !w-10 !h-10 !leading-10 !m-1
                ${date.getTime() === (startDate?.getTime() || 0) ? '!bg-[#FF8127] !text-white' : ''}
                ${endDate && date.getTime() === endDate.getTime() ? '!bg-[#FF8127] !text-white' : ''}
                ${startDate && endDate && date > startDate && date < endDate ? '!bg-[#FF8127]/10' : ''}`
              }
              renderCustomHeader={({
                monthDate,
                customHeaderCount,
                decreaseMonth,
                increaseMonth,
              }) => (
                <div className="flex items-center justify-between px-4 py-2 bg-transparent">
                  <button
                    type="button"
                    onClick={decreaseMonth}
                    className="text-[#FF8127] hover:text-[#FF8127]/80 text-xl font-medium"
                    style={{ visibility: 'visible' }}
                  >
                    ‹
                  </button>
                  <span className="text-lg font-semibold text-gray-700">
                    {monthDate.toLocaleString('es', {
                      month: 'long',
                      year: 'numeric',
                    }).replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                  <button
                    type="button"
                    onClick={increaseMonth}
                    className="text-[#FF8127] hover:text-[#FF8127]/80 text-xl font-medium"
                    style={{ visibility: 'visible' }}
                  >
                    ›
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
