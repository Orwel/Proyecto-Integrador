import React, { useState, useEffect } from "react";
import TabsCategorias from "./TabsCategorias";
import MultipleSelectCheckmarks from "./MultipleSelectCheckMarks";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import searchIcon from "@imagenes/search.svg";
import { supabase } from "../supabaseClient";

const Categorias = ({ onCategoryChange }) => {
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const cargarCategorias = async () => {
		try {
			const { data, error } = await supabase.from("categorias").select("*");
			if (error) throw error;
			setCategorias(data);
		} catch (error) {
			console.error("Error al cargar categorías:", error);
		}
	};

	useEffect(() => {
		cargarCategorias();
	}, []);

	// console.log(categorias);
	// console.log("categorias seleccionadas", selectedCategories);

	const handleCategoryChange = (categories) => {
		setSelectedCategories(categories);
		onCategoryChange(categories);
	};

	return (
		<div style={{ width: "100%", padding: "0rem 2rem" }}>
			<h2
				className="mt-24 pb-4 sm:mt-0"
				style={{
					padding: "2rem 2rem",
					maxWidth: "80%",
					textAlign: "start",
				}}>
				<p style={{ color: "#FE8C00", marginBottom: "10px" }}>Categorias</p>
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
					categorias={categorias}
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
			<TabsCategorias
				selectedCategories={selectedCategories}
				categorias={categorias}
			/>
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
