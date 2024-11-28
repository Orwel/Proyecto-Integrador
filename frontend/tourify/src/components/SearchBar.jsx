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
		.custom-datepicker .react-datepicker__current-month {
			color: white;
		}
		.custom-datepicker .react-datepicker__day--selected,
		.custom-datepicker .react-datepicker__day--in-range {
			background-color: #FF8127 !important;
		}
		.custom-datepicker .react-datepicker__day--keyboard-selected {
			background-color: #FF8127;
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
			<div className="search-bar-container" style={{ position: 'relative', zIndex: 1000 }}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="search-title">¿A dónde quieres ir?</h2>
					{(searchResults.length > 0 || searchText || startDate || endDate) && (
						<button
							onClick={resetSearch}
							className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
						>
							✕ Limpiar búsqueda
						</button>
					)}
				</div>
				<div className="search-fields-container">
					<form onSubmit={handleSubmit} className="search-form-expanded">
						<div className="search-field-group">
							<label className="search-label">Fechas del viaje</label>
							<DatePicker
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								onChange={(update) => setDateRange(update)}
								isClearable={true}
								placeholderText="Selecciona las fechas"
								className={`search-date-picker-expanded ${calendarClassName}`}
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

						<div className="search-divider" />

						<div className="search-field-group">
							<label className="search-label">Destino</label>
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
							className="search-button-expanded"
							disabled={!startDate || !endDate}
						>
							Buscar
						</button>
					</form>
				</div>
			</div>

			{searchResults.length > 0 && (
				<div className="search-results" style={{ position: 'relative', zIndex: 1 }}>
					<div className="search-results-grid">
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
