import React, { useState } from 'react'
import { useProductos } from '../hook/use-productos'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Panel from '../Panel';
import { ActualizarProducto } from './ActualizarProducto';


export const AdministrarProducto = () => {
    const { productos, loading, error, handleDelete } = useProductos();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)



    return (
        <>
            <div className="products-admin" >
                <div className='products-admin-title'>
                    <p>Listado de Productos</p>
                </div>
                <div className='tabla-products'>
                    <table className="table table-bordered ">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Destino</th>
                                <th scope="col">Días</th>
                                <th scope="col">Noches</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Ciudad</th>
                                <th scope="col">Itinerario</th>
                                <th scope="col">Caracteristicas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(product => (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
                                    <th scope="row">{product.name}</th>
                                    <td>{product.destination}</td>
                                    <td>{product.days}</td>
                                    <td>{product.nights}</td>
                                    <td>{product.unit_price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.city}</td>
                                    <td>{product.itinerary}</td>
                                    <td>
                                        {Object.entries(product.characteristics).map(([key, value]) => (
                                            value === 1 &&
                                            (<li key={key}>
                                                {key}
                                            </li>)
                                        ))}
                                    </td>
                                    <td>
                                        <div className='btns-table'>
                                            <button
                                                className='btn-actualizar'
                                                onClick={() => handleDelete(product.id)}
                                            >🗑</button>

                                            <button
                                                className='btn-actualizar'
                                                onClick={() => setShowModal(true)}
                                            >
                                                🖍</button>
                                            {showModal &&
                                                <div className="containerUpdate">
                                                    <ActualizarProducto closeModal={() => setShowModal(false)} product={product} />
                                                </div>}
                                        </div>

                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
