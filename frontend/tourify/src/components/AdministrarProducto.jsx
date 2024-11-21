import React, { useState } from 'react'
import { useProductos } from '../hook/use-productos'
import { useNavigate } from 'react-router-dom'
import { ActualizarProducto } from './ActualizarProducto';
import { useCharacteristics } from '../hook/use-characteristics';


export const AdministrarProducto = () => {
	const { productos, loading, error, handleDelete } = useProductos();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false)
	const { characteristics, loadingChar, errorChar } = useCharacteristics();





	return (
		<>
			<div className="products-admin desktop-only" >
				<div className='products-admin-title'>
					<p>Listado de Productos</p>
				</div>
				<div className='tabla-products'>
					<table className="table table-bordered ">
						<thead>
							<tr>
								<th scope="col">Id</th>
								<th scope="col">Nombre</th>
								<th scope="col">País</th>
								<th scope="col">Ciudad</th>
								<th scope="col">Tiempo</th>
								<th scope="col">Precio Unitario</th>
								<th scope="col">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{productos.map(product => (
								<tr key={product.id}>
									<th scope="row">{product.id}</th>
									<th scope="row">{product.name}</th>
									<td>{product.destination}</td>
									<td>{product.city}</td>
									<td>{product.nights} noches <br /> {product.days} días</td>
									<td className='price'>$ {product.unit_price}</td>
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
													<ActualizarProducto closeModal={() => setShowModal(false)} product={product} characteristics={characteristics} />
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
