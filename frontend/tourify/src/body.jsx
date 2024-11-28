import React, { useState } from "react";
import { ContainerProductos } from "./components/container-productos";
import Categorias from "./components/Categorias";
import { SearchBar } from './components/SearchBar';
import { ResultadosBusqueda } from "./components/ResultadosBusqueda";
import { useLocation } from "react-router-dom";

const Body = () => {
	const location = useLocation();
	const [categoriesSelected, setCategoriesSelected] = useState(false);
	const [criterios, setCriterios] = useState({
		startDate: null,
		endDate: null,
		searchText: ''
	});

	const handleBuscar = (datos) => {
		setCriterios(datos);
	};

	const handleCategoryChange = (categories) => {
		setCategoriesSelected(categories.length > 0);
	};

	return (
		<div className="container-body">
			{location.pathname === "/" && (
				<>
					<SearchBar onBuscar={handleBuscar} />
					<ResultadosBusqueda criterios={criterios} />
					<Categorias onCategoryChange={handleCategoryChange} />
					{!categoriesSelected && (
						<div className="recomendaciones-title">
							<div className="eslogan-recomendaciones">
								Recomendaciones
								<h2>¡Los destinos que podrían interesarte!</h2>
							</div>
							<p className="texto-recomendaciones">
								Con tantos destinos emocionantes, elegir el lugar ideal para
								vacacionar puede ser un reto. Por eso,
								<span> Tourify</span> ha reunido los mejores lugares.
							</p>
						</div>
					)}
					{!categoriesSelected && <ContainerProductos isFavorites={false} />}
				</>
			)}
		</div>
	);
};

export default Body;
