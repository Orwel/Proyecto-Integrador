import React from "react";
import TabsCategorias from "./TabsCategorias";
import { useCategorias } from '../hook/use-categorias';

const Categorias = ({ onCategoryChange }) => {
	const { categorias, loading } = useCategorias();

	if (loading) return <div>Cargando categorías...</div>;

	return (
		<div style={{ width: "100%", padding: "0rem 2rem" }}>
			<h2
				className="mt-1 pb-3 sm:mt-0"
				style={{
					padding: "2rem 2rem",
					maxWidth: "100%",
					textAlign: "start",
				}}>
				<p style={{ color: "#FE8C00", marginBottom: "10px" }}>Categorias</p>
				Encuentra tu <span style={{ color: "#FE8C00" }}>Estilo</span>, explora
				el <span style={{ color: "#FE8C00" }}>Mundo...</span>
			</h2>
			<TabsCategorias 
				categorias={categorias} 
				onCategorySelect={onCategoryChange}
			/>
		</div>
	);
};

export default Categorias;
