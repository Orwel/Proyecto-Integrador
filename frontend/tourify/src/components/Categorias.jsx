import React, { useState } from "react";
import TabsCategorias from "./TabsCategorias";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import searchIcon from "@imagenes/search.svg";
import { listaTiposCategoria } from "../utils/listaTiposCategoria";

const Categorias = () => {
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleCategoryChange = (categories) => {
		setSelectedCategories(categories);
	};

	return (
		<div style={{ width: "100%", padding: "0rem 2rem" }}>
			<h2
				style={{
					padding: "2.5rem 2rem",
					maxWidth: "80%",
					textAlign: "start",
				}}>
				<h6 style={{ color: "#FE8C00", marginBottom: "10px" }}>Categorias</h6>
				Encuentra tu <span style={{ color: "#FE8C00" }}>Estilo</span>, explora
				el <span style={{ color: "#FE8C00" }}>Mundo...</span>
			</h2>
			<section
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
					rowGap: 30,
					padding: "0 25px",
				}}>
				<MultipleSelectCheckmarks
					categorias={listaTiposCategoria}
					onCategoryChange={handleCategoryChange}
				/>
				<Search>
					<SearchIconWrapper>
						<img src={searchIcon} />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ "aria-label": "search" }}
					/>
				</Search>
			</section>
			<TabsCategorias selectedCategories={selectedCategories} />
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

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	marginLeft: 0,
	width: "100%",
	backgroundColor: "white",
	borderRadius: 8,
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "50ch",
		},

		"&:focus": {},
	},
}));
