import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Autocomplete, TextField } from '@mui/material';
import { Card } from './Card';

export const SearchBar = ({ onBuscar }) => {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [searchText, setSearchText] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	// Estilos personalizados para el calendario
	const calendarClassName = "custom-datepicker";
	const calendarStyles = `
		.custom-datepicker .react-datepicker__header {
			background-color: #FF8127;
		}
		.custom-datepicker .react-datepicker__current-month,
		.custom-datepicker .react-datepicker__day-name {
			color: white;
		}
		.custom-datepicker .react-datepicker__day--selected,
		.custom-datepicker .react-datepicker__day--in-selecting-range,
		.custom-datepicker .react-datepicker__day--in-range,
		.custom-datepicker .react-datepicker__day--keyboard-selected {
			background-color: #FF8127 !important;
			color: white !important;
		}
		.custom-datepicker .react-datepicker__day--in-range:not(.react-datepicker__day--in-selecting-range) {
			background-color: #FFE5D1 !important;
			color: #FF8127 !important;
		}
		.custom-datepicker .react-datepicker__day:hover {
			background-color: #FFE5D1 !important;
			color: #FF8127 !important;
		}
		.custom-datepicker .react-datepicker__month-container {
			float: left;
		}
		.custom-datepicker .react-datepicker {
			display: flex;
		}
	`;

	const resetSearch = () => {
		setDateRange([null, null]);
		setSearchText('');
		setSearchResults([]);
		onBuscar({ startDate: null, endDate: null, searchText: '' });
	};

	useEffect(() => {
		const loadSuggestions = async () => {
			if (searchText.length < 2) {
				setSuggestions([]);
				return;
			}

			setLoading(true);
			try {
				const { data, error } = await supabase
					.from('productos')
					.select('city, destination')
					.or(`city.ilike.%${searchText}%, destination.ilike.%${searchText}%`)
					.limit(10);

				if (error) throw error;

				const uniqueLocations = [...new Set(
					data.flatMap(item => [
						item.city && `${item.city} (Ciudad)`,
						item.destination && `${item.destination} (País)`
					]).filter(Boolean)
				)];

				setSuggestions(uniqueLocations);
			} catch (error) {
				console.error('Error cargando sugerencias:', error);
			} finally {
				setLoading(false);
			}
		};

		const debounceTimer = setTimeout(loadSuggestions, 300);
		return () => clearTimeout(debounceTimer);
	}, [searchText]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!startDate || !endDate) {
			alert('Por favor, selecciona un rango de fechas');
			return;
		}

		try {
			let query = supabase
				.from('productos')
				.select('*');

			if (searchText) {
				query = query.or(`city.ilike.%${searchText}%,destination.ilike.%${searchText}%`);
			}

			const { data, error } = await query;

			if (error) throw error;
			setSearchResults(data);
			onBuscar({ startDate, endDate, searchText });
		} catch (error) {
			console.error('Error en la búsqueda:', error);
		}
	};

	return (
		<>
			<style>{calendarStyles}</style>
			<div className="search-bar-container" style={{ position: 'relative', zIndex: 10 }}>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
					<div className="flex flex-col">
						<h2 className="search-title text-xl md:text-2xl font-bold">¿A dónde quieres ir?</h2>
						<p className="text-gray-600 mt-2 text-sm md:text-base">Selecciona un rango de fechas y un destino</p>
					</div>
					{(searchResults.length > 0 || searchText || startDate || endDate) && (
						<button
							onClick={resetSearch}
							className="text-gray-600 hover:text-gray-800 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm md:text-base"
						>
							✕ Limpiar búsqueda
						</button>
					)}
				</div>
				<div className="search-fields-container p-4 md:p-6">
					<form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-end">
						<div className="flex-1 min-w-0">
							<label className="search-label block mb-2">Fechas del viaje</label>
							<DatePicker
								monthsShown={window.innerWidth > 768 ? 2 : 1}
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								onChange={(update) => setDateRange(update)}
								isClearable={true}
								placeholderText="Selecciona las fechas"
								className={`search-date-picker-expanded ${calendarClassName} w-full`}
								dateFormat="dd/MM/yyyy"
								minDate={new Date()}
								popperPlacement="bottom-start"
								popperModifiers={[
									{
										name: "offset",
										options: {
											offset: [0, 10],
										},
									},
									{
										name: "preventOverflow",
										options: {
											boundary: "viewport",
										},
									},
								]}
							/>
						</div>

						<div className="hidden md:block search-divider" />

						<div className="flex-1 min-w-0">
							<label className="search-label block mb-2">Destino</label>
							<Autocomplete
								freeSolo
								options={suggestions}
								loading={loading}
								value={searchText}
								onChange={(_, newValue) => setSearchText(newValue || '')}
								onInputChange={(_, newInputValue) => setSearchText(newInputValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="¿A dónde quieres viajar?"
										variant="outlined"
										fullWidth
									/>
								)}
								className="search-autocomplete-expanded"
								ListboxProps={{
									style: { maxHeight: '200px' }
								}}
							/>
						</div>

						<button 
							type="submit" 
							className="search-button-expanded w-full md:w-auto"
							disabled={!startDate || !endDate}
						>
							Buscar
						</button>
					</form>
				</div>
			</div>

			{searchResults.length > 0 && (
				<div className="search-results px-4 md:px-8 lg:px-16" style={{ position: 'relative', zIndex: 5 }}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
						{searchResults.map((producto) => (
							<Card
								key={producto.id}
								id={producto.id}
								image={producto.url_img}
								title={producto.name}
								location={producto.city}
								country={producto.destination}
								reviews={producto.reviews}
								rating={producto.rating}
								price={producto.unit_price}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};
