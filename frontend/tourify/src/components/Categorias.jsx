import React from "react";
import TabsCategorias from "./TabsCategorias";

const Categorias = () => {
	return (
		<div style={{ width: "100%", padding: "0rem 2rem" }}>
			<h2
				style={{
					padding: "5rem 2rem",
					maxWidth: "80%",
					textAlign: "start",
				}}>
				Encuentra tu <span style={{ color: "#FE8C00" }}>Estilo</span>, explora
				el <span style={{ color: "#FE8C00" }}>Mundo...</span>
			</h2>
			<TabsCategorias />
			<div className="recomendaciones-title">
				<p className="eslogan-recomendaciones">
					Recomendaciones
					<h2>¡Los destinos que podrían interesarte!</h2>
				</p>
				<p className="texto-recomendaciones">
					Con tantos destinos emocionantes, elegir el lugar ideal para
					vacacionar puede ser un reto. Por eso,
					<span> Tourify</span> ha reunido los mejores lugares.
				</p>
			</div>
		</div>
	);
};

export default Categorias;
