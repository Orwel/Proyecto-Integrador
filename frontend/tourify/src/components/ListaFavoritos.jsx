import React from 'react'
import { ContainerProductos } from './container-productos';
import './Favorite.css';


export const ListaFavoritos = () => {

    return (
        <>
            <div className='favorite'>
                <h1>Listado de Favoritos</h1>
                <div className='container-favorite'>
                    <ContainerProductos isFavorites={true} />
                </div>
            </div>

        </>
    )
}
