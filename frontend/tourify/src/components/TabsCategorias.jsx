import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { CircularProgress, Tabs } from "@mui/material";
import { tabData } from "../utils/tabValues";
import CardCategorias from "./CardCategorias";
import { useProductos } from "../hook/use-productos";
import { listaTiposCategoria } from "../utils/listaTiposCategoria";
import { Link } from "react-router-dom";

const TabsCategorias = ({ selectedCategories }) => {
	const [value, setValue] = useState("1");
	const { productos, loading, error } = useProductos();

	const asignarCategoria = (producto) => {
		if (producto.id < 4) return listaTiposCategoria[0];
		else if (producto.id >= 4 && producto.id <= 7)
			return listaTiposCategoria[1];
		else if (producto.id >= 8 && producto.id <= 10)
			return listaTiposCategoria[2];
		else return listaTiposCategoria[3];
	};

	const productosConCategoria = productos?.map((producto) => ({
		...producto,
		categoria: asignarCategoria(producto),
	}));

	const handleChange = (event, newValue) => {
		if (selectedCategories.length === 0) {
			setValue(newValue);
		}
	};

	const selectedTabCategory = tabData.find((tab) => tab.value === value)?.label;
	console.log(
		"🚀 ~ TabsCategorias ~ selectedTabCategory:",
		selectedTabCategory
	);

	const filteredCards = productosConCategoria?.filter((card) => {
		if (selectedCategories.length > 0) {
			return selectedCategories.some(
				(selectedCategory) =>
					selectedCategory.toLowerCase() === card.categoria.toLowerCase()
			);
		} else {
			return card.categoria.toLowerCase() === selectedTabCategory.toLowerCase();
		}
	});

	const filteredCount = filteredCards.length;

	return (
		<div style={{ marginTop: 30 }}>
			<TabContext value={value}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "20px",
						alignItems: "center",
					}}>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="inherit"
						aria-label="secondary tabs example"
						variant="scrollable"
						sx={{
							"& .MuiTabs-indicator": { backgroundColor: "#FE8C00" },
							"& .Mui-selected": { color: "#FE8C00" },
						}}>
						{tabData.map(
							({ value: tabValue, label, inconNoSelected, iconSelected }) => (
								<Tab
									key={tabValue}
									value={tabValue}
									label={
										<div style={{ textAlign: "center" }}>
											<img
												src={
													value === tabValue ? iconSelected : inconNoSelected
												}
												style={{ margin: "0 auto" }}
											/>
											<span
												style={{
													display: "block",
													marginTop: "4px",
													fontSize: "18px",
												}}>
												{label}
											</span>
										</div>
									}
								/>
							)
						)}
					</Tabs>
				</Box>
				{tabData.map(({ value: tabValue }) => (
					<TabPanel
						sx={{
							maxWidth: "1350px",
							padding: "50px",
							margin: "0 auto",
						}}
						key={tabValue}
						value={tabValue}>
						<div style={{ textAlign: "center" }}>
							{loading ? (
								<CircularProgress sx={{ color: "orange" }} />
							) : (
								<div
									className="justify-center lg:justify-between"
									style={{
										display: "flex",
										flexWrap: "wrap",
										gap: "40px 20px",
										margin: "0 auto",
									}}>
									{filteredCards.map((card) => (
										<div
											style={{
												minHeight: "400px",
												flexDirection: "column",
												maxHeight: "500px",
											}}
											key={card.id}
											className="w-[80%] lg:w-[45%] xl:w-[49%]">
											<Link to={"detail/" + card.id}>
												<CardCategorias
													info={card}
													filteredCount={filteredCount}
												/>
											</Link>
										</div>
									))}
								</div>
							)}
						</div>
					</TabPanel>
				))}
			</TabContext>
		</div>
	);
};

export default TabsCategorias;
