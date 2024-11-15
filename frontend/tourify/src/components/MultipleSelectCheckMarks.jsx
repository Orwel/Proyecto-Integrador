import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";
import filterLines from "@imagenes/filterLines.svg";

export default function MultipleSelectCheckmarks({
	categorias,
	onCategoryChange,
}) {
	const [selectedCategory, setSelectedCategory] = useState([]);
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setSelectedCategory(typeof value === "string" ? value.split(",") : value);
		onCategoryChange(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, maxWidth: 300, width: 200 }}>
				<InputLabel id="demo-multiple-checkbox-label">
					<Box display="flex" alignItems="center">
						<img src={filterLines} alt="Filtro" />
						<Typography variant="body1">Filtros</Typography>
					</Box>
				</InputLabel>

				<Select
					labelId="demo-multiple-checkbox-label"
					id="demo-multiple-checkbox"
					multiple
					value={selectedCategory}
					onChange={handleChange}
					input={
						<OutlinedInput sx={{ backgroundColor: "white" }} label="Filtros" />
					}
					renderValue={(selected) => selected.join(", ")}
					MenuProps={MenuProps}
					IconComponent={() => null}
					sx={{
						borderRadius: 4,
						backgroundColor: "white",
						boxShadow: "0px 2px 4px 1px gray",
					}}>
					{categorias.map((categoria) => (
						<MenuItem key={categoria} value={categoria}>
							<Checkbox checked={selectedCategory.includes(categoria)} />
							<ListItemText primary={categoria} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
