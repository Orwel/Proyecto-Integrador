import React, { useState, useEffect } from "react";
import { useProductos } from "../hook/use-productos";
import { Card } from "./Card";
import { Tabs, Tab } from "@nextui-org/react";

const TabsCategorias = ({ categorias }) => {
	const [selectedTabCategory, setSelectedTabCategory] = useState("1");
	const { productos } = useProductos();
	const [productosFiltrados, setProductosFiltrados] = useState([]);

	useEffect(() => {
		if (productos && productos.length > 0) {
			const filtrados = selectedTabCategory
				? productos.filter(producto => producto.categoria_id === parseInt(selectedTabCategory))
				: productos;
			setProductosFiltrados(filtrados);
		}
	}, [selectedTabCategory, productos]);

	const handleSelectionChange = (key) => {
		setSelectedTabCategory(key);
		console.log("Categoría seleccionada:", key);
		console.log("Productos filtrados:", productosFiltrados);
	};

	return (
		<div className="flex w-full flex-col">
			<Tabs
				aria-label="Options"
				selectedKey={selectedTabCategory}
				onSelectionChange={handleSelectionChange}
				className="flex justify-start overflow-auto"
			>
				{categorias.map((categoria) => (
					<Tab
						key={categoria.id.toString()}
						title={categoria.name}
					/>
				))}
			</Tabs>
			
			<div className="card-container">
				{productosFiltrados.map((producto) => (
					<Card 
						key={producto.id}
						id={producto.id}
						image={producto.url_img}
						title={producto.name}
						location={producto.city}
						country={producto.destination}
						reviews={producto.reviews}
						rating={producto.rating}
						price={producto.unit_price}
					/>
				))}
			</div>
		</div>
	);
};

export default TabsCategorias;
