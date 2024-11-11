import { useEffect, useState } from 'react'
import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCharacteristics } from '../hook/use-characteristics'
import { useProductos } from '../hook/use-productos'


export const ActualizarProducto = () => {
    const id = parseInt(useParams().id);
    const { characteristics, loadingChar, errorChar } = useCharacteristics();
    const { productos, loading, error } = useProductos();
    const product = productos.find(product => product.id === id);
    console.log(product)

    return (
        <div className='formActualizar'>
            <form>
                <div className='form-details'>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type='text'
                        id='name'
                        value={product.name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-details'>
                    <label htmlFor="destiny">Destino</label>
                    <input
                        type='text'
                        id='destination'
                        value={product.destination}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-details'>
                    <label htmlFor="dias">Días</label>
                    <input
                        type='text'
                        id='dias'
                        value={product.days}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-details'>
                    <label htmlFor="noches">Noches</label>
                    <input
                        type='text'
                        id='noches'
                        value={product.nights}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-details'>
                    <label htmlFor="unit_z|price">Precio Unitario</label>
                    <input
                        type='text'
                        id='precio'
                        value={product.unit_price}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-details'>
                    <label htmlFor="url_img">Url Imagen</label>
                    <textarea
                        type='text'
                        id='url_img'
                        rows="3"
                        value={product.url_img}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className='form-details'>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        type='text'
                        id='descripción'
                        rows="5"
                        value={product.description}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className='form-details'>
                    <label htmlFor="city">Ciudad</label>
                    <input
                        type='text'
                        id='ciudad'
                        value={product.city}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-details'>
                    <label htmlFor="itinerary">Itinerario</label>
                    <textarea
                        type='text'
                        id='itinerary'
                        rows="6"
                        value={product.itinerary}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </textarea>
                </div>
            </form>
        </div>
    )
}
