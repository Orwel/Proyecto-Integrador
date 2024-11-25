import React, { useState } from "react";
import { ContainerProductos } from "./components/container-productos";
import Categorias from "./components/Categorias";
import { SearchBar } from './components/SearchBar';
import { ResultadosBusqueda } from "./components/ResultadosBusqueda";
const Body = () => {
	const [categoriesSelected, setCategoriesSelected] = useState(false);
	const handleCategoryChange = (categories) => {
		setCategoriesSelected(categories.length > 0);
	};
	const [criterios, setCriterios] = useState({});

	const handleBuscar = (datos) => {
		setCriterios(datos);
	};

	return (
		<div className="container-body">
			{location.pathname == '/' && <div><SearchBar onBuscar={handleBuscar} />  <ResultadosBusqueda criterios={criterios} /></div>}
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
		</div>
	);
};

export default Body;
