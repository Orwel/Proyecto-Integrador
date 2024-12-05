import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { supabase } from '../supabaseClient';
import { isWithinInterval, differenceInDays } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ModalConfirmation } from "./modalConfirmation";

registerLocale('es', es);

const Calendario = ({ productoId, onDateSelect, duracionMinima, onClearDates }) => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    obtenerReservas();
  }, [productoId]);

  const obtenerReservas = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!productoId) {
        throw new Error('ID de producto no válido');
      }

      const { data, error } = await supabase
        .from('reservas')
        .select('start_date, end_date')
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

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);

    if (start && end) {
      const dias = differenceInDays(end, start) + 1;
      if (dias !== duracionMinima) {
        //alert(`La duración debe ser exactamente ${duracionMinima} días`);
        setModalType(`duracion ${duracionMinima}`);
        setModalOpen(true);
      } else {
        onDateSelect({ startDate: start, endDate: end });
      }
    }
  };

  const esFechaDisponible = (date) => {
    if (!date || date < new Date()) return false;
    if (!reservas.length) return true;

    return !reservas.some(reserva =>
      isWithinInterval(date, { start: new Date(reserva.start_date), end: new Date(reserva.end_date) })
    );
  };

  const onConfirmReserva = async () => {
    if (!user) {
      //alert("Por favor, inicia sesión para realizar una reserva.");
      setModalType("SesionAuth");
      setModalOpen(true);
      return;
    }

    if (!startDate || !endDate) {
      //alert("Debes seleccionar un rango de fechas válido.");
      setModalType("fechasValidas");
      setModalOpen(true);
      return;
    }

    try {
      navigate(`/reserva/${productoId}`, {
        state: { fechaInicio: startDate, fechaFin: endDate },
      });
      alert("¡Reserva realizada con éxito!");
      setModalType("reserva");
      setModalOpen(true);

    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Se produjo un error al realizar la reserva. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <div className="calendario-container">
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={obtenerReservas}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Intentar nuevamente
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
                onClick={() => { setDateRange([null, null]); onClearDates && onClearDates(); }}
                className="text-[#FF8127] hover:text-[#FF8127]/80 font-medium"
              >
                Borrar fechas
              </button>
            </div>
          )}

          <style>
            {`
              .react-datepicker {
                font-size: ${isMobile ? '0.8rem' : '1rem'} !important;
                width: ${isMobile ? '100%' : 'auto'} !important;
              }
              .react-datepicker__month-container {
                float: ${isMobile ? 'none' : 'left'} !important;
                width: ${isMobile ? '100%' : 'auto'} !important;
              }
              .react-datepicker__day {
                width: ${isMobile ? '2rem' : '2.5rem'} !important;
                line-height: ${isMobile ? '2rem' : '2.5rem'} !important;
                margin: ${isMobile ? '0.2rem' : '0.3rem'} !important;
              }
              @media (max-width: 768px) {
                .react-datepicker__month-container {
                  margin: 0 auto !important;
                }
                .react-datepicker {
                  display: block !important;
                }
              }
            `}
          </style>

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
            monthsShown={isMobile ? 1 : 2}
            showDisabledMonthNavigation
            calendarClassName="custom-calendar"
            formatWeekDay={nameOfDay => nameOfDay.substring(0, 3) + '.'}
            renderCustomHeader={({
              monthDate,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div className="flex items-center justify-between px-4 py-2">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  className="text-[#FF8127] hover:text-[#FF8127]/80 text-xl font-medium"
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
                >
                  ›
                </button>
              </div>
            )}
          />
        </div>
      )}

    <button className="bg-[#FE8C00] text-white px-6 py-3 rounded-xl hover:scale-105 transform transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onConfirmReserva}
        disabled={!startDate || !endDate || loading}
      >
      {loading ? 'Cargando disponibilidad...' : 'Confirmar fechas'}
    </button>

      <ModalConfirmation
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        type={modalType}
        onConfirm={() => setModalOpen(false)}
        navigate={() => { }}
        role_id={null}
        duracionMinima={duracionMinima} 
      />
    </div>
  );
};

export default Calendario;