import React from "react";
import TabsCategorias from "./TabsCategorias";
import { useCategorias } from '../hook/use-categorias';

const Categorias = () => {
	const { categorias, loading } = useCategorias();

	if (loading) return <div>Cargando categorías...</div>;

	return (
		<div style={{ width: "100%", padding: "0rem 2rem" }}>
			<h2
				className="mt-24 pb-4 sm:mt-0"
				style={{
					padding: "5rem 2rem",
					maxWidth: "80%",
					textAlign: "start",
				}}>
				<p style={{ color: "#FE8C00", marginBottom: "10px" }}>Categorias</p>
				Encuentra tu <span style={{ color: "#FE8C00" }}>Estilo</span>, explora
				el <span style={{ color: "#FE8C00" }}>Mundo...</span>
			</h2>
			<TabsCategorias categorias={categorias} />
		</div>
	);
};

export default Categorias;
