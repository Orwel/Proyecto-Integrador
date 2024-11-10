import { useState } from 'react'
import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useProductos } from '../hook/use-productos'
import { useCharacteristics } from '../hook/use-characteristics'

export const ActualizarProducto = () => {
    const id = parseInt(useParams().id);
    console.log(id)
    const { productos, loading, error } = useProductos();
    const { characteristics, loadingChar, errorChar } = useCharacteristics();
    const product = productos.find(product => product.id === id);
    console.log(products)

    const characteristic = (char) => {
        const asArray = Object.entries(product.characteristics)
        const filtered = asArray.filter(([key, value]) => typeof key === char)
        return filtered[value]
    }
    const [name, setName] = useState('');
    const [destiny, setdDestiny] = useState('');



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
                    <label htmlFor="name">Días</label>
                    <input
                        type='text'
                        id='dias'
                        value={product.days}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-details'>
                    <label htmlFor="name">Noches</label>
                    <input
                        type='text'
                        id='noches'
                        value={product.nights}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-details'>
                    <label htmlFor="unit_price">Precio Unitario</label>
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
