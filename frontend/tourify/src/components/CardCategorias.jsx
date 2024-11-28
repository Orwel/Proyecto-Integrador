import React, { useState } from "react";
import { CircularProgress } from "@mui/material";

const CardCategorias = ({ info, filteredCount }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const handleImageError = () => {
		setImageLoaded(false);
	};

	return (
		<div
			style={{
				overflow: "hidden",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}>
			{!imageLoaded && (
				<div
					style={{
						position: "absolute",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "100%",
					}}>
					<CircularProgress sx={{ color: "#FE8C00" }} />
				</div>
			)}
			<img
				src={info.url_img}
				alt={info.name || "imagen"}
				style={{
					width: "100%",
					objectFit: "cover",
					height: "100%",
					borderRadius: "20px",
					opacity: imageLoaded ? 1 : 0,
					transition: "opacity 0.3s ease-in-out",
				}}
				onLoad={handleImageLoad}
				onError={handleImageError}
			/>
			{imageLoaded && (
				<span
					className="text-center lg:text-start"
					style={{
						textDecoration: "underline",
						paddingTop: "20px",
						display: "block",
						width: "100%",
					}}>
					{filteredCount} Destinos encontrados
				</span>
			)}
		</div>
	);
};

export default CardCategorias;
