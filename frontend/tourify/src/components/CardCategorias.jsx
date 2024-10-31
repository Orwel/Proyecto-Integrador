import React from "react";
import location from "@imagenes/location.png";
import arrow from "@imagenes/arrowRight.svg";

const CardCategorias = ({ info }) => {
	return (
		<div
			style={{
				overflow: "hidden",
				borderRadius: "20px",
				boxShadow: "0 4px 6px 0px #6B7280",
			}}>
			<img src={info.img1} alt="imagen" style={{ width: "100%" }} />
			<div
				style={{
					padding: "20px 10px",
					display: "flex",
					flexDirection: "column",
					rowGap: "20px",
					fontSize: "12px",
					backgroundColor: "#ffffff",
					margin: "-10px 0",
					position: "relative",
				}}>
				<p style={{ fontWeight: "bold" }}>{info.eslogan}</p>
				<p
					style={{
						margin: "0",
						display: "flex",
						justifyContent: "space-between",
					}}>
					<span style={{ color: "#6B7280" }}>{info.tiempo}</span>{" "}
					<span style={{ color: "#FE8C00" }}>{info.precio}</span>
				</p>
				<div
					style={{
						display: "flex",
						alignContent: "center",
						alignItems: "center",
						gap: "10px",
					}}>
					<img src={location} />
					<span style={{ color: "#6B7280" }}>{info.ubicacion}</span>
					<button
						style={{
							backgroundColor: "#FE8C00",
							position: "absolute",
							right: "0",
							borderRadius: "20px",
							display: "flex",
							alignItems: "center",
							padding: "10px",
							gap: "10px",
							color: "#FFEED9",
							border: "none",
							cursor: "pointer",
						}}>
						<img src={arrow} /> Explorar mas
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardCategorias;
