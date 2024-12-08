import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerProductos } from './container-productos';
import { useFavorites } from '../hook/use-favorites';
import { useAuth } from '../context/AuthContext';
import './Favorite.css';

export const ListaFavoritos = () => {
    const { user } = useAuth();
    const { favorites, error } = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate('/');
        }
      }, [user, navigate]);
    
    if (error) return <div>Error al cargar los favoritos</div>; 
    if (favorites.length === 0) return <div>No tienes productos favoritos aún.</div>;

    return (
        <>
            <div className='favorite'>
                <h1 className='titulo-favoritos'>Listado de Favoritos</h1>
                <div className='container-favorite'>
                    <ContainerProductos isFavorites={true} />
                </div>
            </div>

        </>
    )
}
