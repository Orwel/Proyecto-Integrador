import React, { useState } from "react";

const CardCategorias = ({ info, filteredCount }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}>
			<img
				src={info.url_img}
				alt="imagen"
				style={{
					width: "100%",
					objectFit: "cover",
					height: "100%",
					borderRadius: "20px",
				}}
				onLoad={handleImageLoad}
			/>
			{imageLoaded && (
				<span
					className="text-center lg:text-start"
					style={{
						textDecoration: "underline",
						bottom: "-10",
						paddingTop: "20px",
					}}>
					{filteredCount} Destinos encontrados
				</span>
			)}
		</div>
	);
};

export default CardCategorias;
