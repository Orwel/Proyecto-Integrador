import React from "react";
import { ContainerProductos } from "./components/container-productos";
import Categorias from "./components/Categorias";
const Body = () => {
	return (
		<div className="container-body">
			<Categorias />
			<ContainerProductos />
		</div>
	);
};

export default Body;
