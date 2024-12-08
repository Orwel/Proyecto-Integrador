import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ReservaConfirmada = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { success, message } = state || {};

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-[#ececec]">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        {success ? (
          <h1 className="text-3xl font-extrabold mb-4 text-center">
            ¡Reserva confirmada!
          </h1>
        ) : (
          <h1 className="text-3xl font-extrabold text-red-600 mb-4 text-center">
            Error al confirmar la reserva
          </h1>
        )}
        <p className="text-lg text-gray-700 text-center mb-6">{message}</p>
        <button
          onClick={() => navigate('/')}
          className="block mx-auto bg-[#FE8C00] text-white px-8 py-3 rounded-xl hover:scale-105 transform transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ReservaConfirmada;
