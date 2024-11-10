import React from 'react'
import { useProductos } from '../hook/use-productos'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


export const AdministrarProducto = () => {
    const { productos, loading, error, handleDelete } = useProductos();
    const navigate = useNavigate();



    return (
        <>
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
                                        (<li>
                                            {key}
                                        </li>)
                                    ))}
                                </td>
                                <td>
                                    <button
                                        className='btn btn-outline-primary'
                                        onClick={() => handleDelete(product.id)}
                                    >🗑</button>

                                    <button
                                        className='btn btn-outline-primary'
                                    > <Link to={'/ActualizarProducto/' + product.id}>🖍</Link>
                                    </button>

                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
