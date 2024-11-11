import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import { tabData } from "../utils/tabValues";
import CardCategorias from "./CardCategorias";
import { cardCategoria } from "../utils/cardCategoria";

const TabsCategorias = ({ selectedCategories }) => {
	const [value, setValue] = useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const filteredCards = cardCategoria.filter((card) =>
		selectedCategories.length === 0
			? true
			: selectedCategories.includes(card.tipoCategoria)
	);

	const filteredCount = filteredCards.length;

	return (
		<div style={{ marginTop: 30 }}>
			<TabContext value={value}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "20px",
					}}>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="inherit"
						aria-label="secondary tabs example"
						variant="scrollable"
						sx={{
							"& .MuiTabs-indicator": {
								backgroundColor: "#FE8C00",
							},
							"& .Mui-selected": {
								color: "#FE8C00",
							},
						}}>
						{tabData.map(
							({ value: tabValue, label, inconNoSelected, iconSelected }) => (
								<Tab
									className="mt-3"
									key={tabValue}
									value={tabValue}
									label={
										<div
											style={{
												textAlign: "center",
											}}>
											<img
												src={value == tabValue ? iconSelected : inconNoSelected}
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
				{tabData.map(({ value: tabValue }, index) => (
					<TabPanel key={tabValue} value={tabValue}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								gap: "40px 30px",
								margin: "0 auto",
							}}>
							{filteredCards.map((card) => (
								<CardCategorias
									key={card.id}
									info={card}
									filteredCount={filteredCount}
								/>
							))}
						</div>
					</TabPanel>
				))}
			</TabContext>
		</div>
	);
};

export default TabsCategorias;
