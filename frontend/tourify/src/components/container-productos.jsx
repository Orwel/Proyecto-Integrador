import React from 'react'
import { useProductos } from '../hook/use-productos';
import { Card } from './card';

export const ContainerProductos = () => {
	const { productos, loading, error } = useProductos();
console.log(productos, "ver aqui")
	return (
		<>
			<div>
				<div className="card-container">
					{productos.map((product) => (
						<Card
						key={product.id}
							id={product.id}
							image={product.url_img}
							title={product.name}
							location={product.destination}
							country={product.city}
							reviews={product.days}
							rating={product.nights}
							price={product.unit_price}
						/>
					))}
				</div>

			</div>
		</>
	)
}
