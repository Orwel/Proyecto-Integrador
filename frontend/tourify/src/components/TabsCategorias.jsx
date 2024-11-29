import React, { useState, useEffect } from "react";
import { useProductos } from "../hook/use-productos";
import { Card } from "./card";
import { Tabs, Tab, Pagination } from "@nextui-org/react";
import '../styles/categorias.css';

const TabsCategorias = ({ categorias }) => {
	const [selectedTabCategory, setSelectedTabCategory] = useState("1");
	const { productos } = useProductos();
	const [productosFiltrados, setProductosFiltrados] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 2;

	useEffect(() => {
		if (productos && productos.length > 0) {
			const filtrados = selectedTabCategory
				? productos.filter(producto => producto.categoria_id === parseInt(selectedTabCategory))
				: productos;
			setProductosFiltrados(filtrados);
			setCurrentPage(1);
		}
	}, [selectedTabCategory, productos]);

	const handleSelectionChange = (key) => {
		setSelectedTabCategory(key);
	};

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
	const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);

	return (
		<div className="flex w-full flex-col items-center px-4 md:px-8 lg:px-16">
			<Tabs
				aria-label="Options"
				selectedKey={selectedTabCategory}
				onSelectionChange={handleSelectionChange}
				
				className="flex justify-center overflow-auto mb-8 w-full max-w-6xl"
			>
				{categorias.map((categoria) => (
					<Tab
						key={categoria.id.toString()}
						title={categoria.name}
					/>
				))}
			</Tabs>
			
			<div className="w-full max-w-[1400px] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
					{currentProducts.map((producto) => (
						<div key={producto.id} className="flex justify-center">
							<div className="categoria-card">
								<Card 
									id={producto.id}
									image={producto.url_img}
									title={producto.name}
									location={producto.city}
									country={producto.destination}
									reviews={producto.reviews}
									rating={producto.rating}
									price={producto.unit_price}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center mt-8">
					<Pagination
						total={totalPages}
						page={currentPage}
						onChange={setCurrentPage}
						color="warning"
						size="lg"
					/>
				</div>
			)}
		</div>
	);
};

export default TabsCategorias;
