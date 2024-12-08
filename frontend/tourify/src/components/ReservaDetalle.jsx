import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useReservas } from '../hook/use-reservas';
import { useProductos } from '../hook/use-productos';
import { ModalConfirmation } from "./modalConfirmation";
import ProductGallery from "./ProductGallery";
import '../styles/reservas.css';

const ReservaDetalle = () => {
  const { user } = useAuth();
  const { id: productId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { handleCreate, loading, error } = useReservas();
  const { productos, loading: loadingProductos, error: errorProductos } = useProductos();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const producto = productos.find((producto) => producto.id === parseInt(productId));

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (state && state.fechaInicio && state.fechaFin) {
      setFechaInicio(new Date(state.fechaInicio));
      setFechaFin(new Date(state.fechaFin));
    }
  }, [state]);

  const handleConfirmarReserva = async () => {
    if (!fechaInicio || !fechaFin) {
      //alert('Por favor selecciona un rango de fechas válido.');
      setModalType("fechasValidas");
      setModalOpen(true);
      return;
    }

    if (!user) {
      setModalType("SesionAuth");
      setModalOpen(true);
      return;
    }

    try {
      await handleCreate(productId, fechaInicio, fechaFin);
      navigate('/reserva-confirmada', {
        state: { 
          success: true, 
          message: `Tu reserva para el producto
          ${producto.name} en ${producto.destination} los días ${fechaInicio} al ${fechaFin}
        ha sido confirmada.` },
    });
  } catch (err) {
    navigate('/reserva-confirmada', {
      state: { success: false, message: `Error al confirmar la reserva: ${err.message}` },
    });
  }
};

  const handleBackToDetail = () => {
    navigate(-1, { state: { fechaInicio, fechaFin } });
  };

  if (loadingProductos) {return <p>Cargando datos del producto...</p>;}
  if (errorProductos) {return <p>Error al cargar el producto: {errorProductos.message}</p>;}
  if (!productos) {return <p>Producto no encontrado.</p>;}
  
  return (
    <div className="reserva-detail">
      <div className="detail-title">
          <h1>Detalle de la reserva</h1>
          <button onClick={handleBackToDetail}>← Volver</button>
      </div>

      {/* Datos de Producto */}
      <div className="card">
        <ProductGallery productId={productId} />
        <h2>{producto.name}</h2>
        <span>📍 {producto.city}</span>
        <p>{producto.description}</p>
        <br />
        
      </div>

      {/* Datos del Usuario */}
      { user && (
          <div className="user-info bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tus Datos</h3>
            <p><strong>Nombre: </strong>{user.first_name} {user.last_name}</p>
            <p className='text-left'><strong>Correo electrónico: </strong>{user.email}</p>
          </div>
        )}

      {/* Datos de la Reserva */}
      <div className="fecha-info">
        <div className="table-container">
          <h3 className='text-3xl font-bold '>Datos de la Reserva</h3>
            <p className="detail-time">
              <span className=" text-xl font-bold text-center">Duración: {producto.duration_days} días</span>
            </p>
          <table>
            <thead>
              <tr>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{fechaInicio ? fechaInicio.toLocaleDateString() : "Fecha no válida"}</td>
                <td>{fechaFin ? fechaFin.toLocaleDateString() : "Fecha no válida"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón de Confirmación */}
      <div className="confirm-btn-container">
        <button
          onClick={handleConfirmarReserva}
          className="confirm-btn"
          disabled={loading}
        >
          {loading ? 'Confirmando...' : 'Confirmar Reserva'}
        </button>
      </div>

      {/* Mensajes de error */}
      {error && <p className="error-msg">Error: {error.message}</p>}

      {/* Modal de Confirmación */}
      <ModalConfirmation
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        type={modalType}
        onConfirm={() => setModalOpen(false)}
        navigate={() => {}}
        role_id={null}
      />
    </div>
  );
};

export default ReservaDetalle;