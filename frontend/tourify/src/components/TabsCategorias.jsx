import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Tabs } from "@mui/material";
import { tabData } from "../utils/tabValues";
import CardCategorias from "./CardCategorias";
import { cardCategoria } from "../utils/cardCategoria";

const TabsCategorias = () => {
	const [value, setValue] = useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div style={{ textAlign: "start", padding: "" }}>
			<TabContext value={value}>
				<Box>
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
						{tabData.map(({ value: tabValue, label, Icon }) => (
							<Tab
								className="mt-3"
								key={tabValue}
								value={tabValue}
								label={
									<div
										style={{
											textAlign: "center",
										}}>
										<Icon color={value === tabValue ? "#FE8C00" : "black"} />
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
						))}
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
							{cardCategoria.map((card) => (
								<CardCategorias key={card.id} info={card} />
							))}
						</div>
					</TabPanel>
				))}
			</TabContext>
		</div>
	);
};

export default TabsCategorias;
