import React from "react";

const CardCategorias = ({ info, filteredCount }) => {
	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				display: "flex",
				flexDirection: "column",
			}}>
			<img
				src={info.img1}
				alt="imagen"
				style={{ height: "100%", borderRadius: "20px" }}
			/>
			<span
				style={{
					textDecoration: "underline",
					textAlign: "start",
					bottom: "-10",
					paddingTop: "20px",
				}}>
				{filteredCount} Destinos encontrados
			</span>
		</div>
	);
};

export default CardCategorias;
