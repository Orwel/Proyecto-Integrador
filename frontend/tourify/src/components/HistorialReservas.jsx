import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/reservas.css'; // Importamos el archivo CSS

const HistorialReservas = () => {
    const { user } = useAuth();
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const obtenerHistorial = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from('reservas')
                    .select(`
                        id,
                        producto_id (name, destination, url_img),
                        start_date,
                        end_date,
                        status,
                        created_at
                    `)
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setReservas(data);
            }
        };

        obtenerHistorial();
    }, [user]);

    const statusMap = {
        active: "Confirmada",
    };

    return (
        <div className="historial-container">
            <h1 className="historial-title">Historial de Reservas</h1>
            <div className="reservas-list">
                {reservas.map((reserva) => (
                    <div className="reserva-card" key={reserva.id}>
                        <img
                            className="reserva-img"
                            src={reserva.producto_id.url_img}
                            alt={reserva.producto_id.name}
                        />
                        <div className="reserva-info">
                            <h1 className="reserva-name"><strong>Tour o experiencia: </strong></h1>

                            <h2 className="reserva-name">{reserva.producto_id.name}</h2>
                            <p className="reserva-destination">📍 {reserva.producto_id.destination}</p>
                            <p className="reserva-fechas">
                                <p>Inicio del evento {new Date(reserva.start_date).toLocaleDateString()} | Fin del evento: {new Date(reserva.end_date).toLocaleDateString()} </p>
                            </p>
                            <br />
                            <div className='reserva-status'>
                                <p>Estado: {statusMap[reserva.status] || reserva.status}  </p>
                                <p>
                                    <strong>Fecha reserva: </strong>{ new Date(reserva.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistorialReservas;