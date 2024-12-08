import { useState } from "react";
import { useProductos } from "../hook/use-productos";
import { Card } from "./Card";
import { useFavorites } from "../hook/use-favorites";

const shuffleProducts = (products) => {
	for (let i = products.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	[products[i], products[j]] = [products[j], products[i]];
	}
	return products;
  };

export const ContainerProductos = ({ isFavorites }) => {
	const { productos, loading, error } = useProductos();
	const { favorites } = useFavorites();
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 6;

	const listIdFavorites = favorites.map((item) => item.product_id);

	// Filtra el objeto de productos con solo los favoritos
	const productsFavorites = productos.filter(({ id }) => listIdFavorites.includes(id));
	const productsList = isFavorites ? productsFavorites : productos

	const shuffledProducts = shuffleProducts([...productsList]);

	if (loading) return <div>Cargando...</div>;
	if (error) return <div>Error al cargar los productos</div>;

	// Calcula los índices para los productos para la página actual
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = shuffledProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	// Calcular el número total de páginas
	const totalPages = Math.ceil(shuffledProducts.length / productsPerPage);

	// Función para cambiar la página mediante un número de página
	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div>
				<div className="card-container">
					{currentProducts.map((product) => (
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
				{/* Numeración de Páginas */}
				<div className="pagination">
					<button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="nav-button">❮</button>
					{[...Array(totalPages)].map((_, index) => (
						<button key={index + 1} onClick={() =>
							handlePageClick(index + 1)}
							className={`page-number ${currentPage === index + 1 ? "active-page" : ""}`}>{index + 1}</button>
					))}
					<button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="nav-button">❯</button>
				</div>
			</div>
		</>
	);
};