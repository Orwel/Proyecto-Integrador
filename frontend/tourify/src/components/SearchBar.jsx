import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Autocomplete, TextField } from '@mui/material';

export const SearchBar = ({ onBuscar }) => {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [searchText, setSearchText] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleInputChange = async (newValue) => {
		try {
			if (newValue.length > 2) {
				const { data: ciudades } = await supabase
					.from('productos')
					.select('city')
					.ilike('city', `%${newValue}%`)
					.limit(5);

				const { data: destinos } = await supabase
					.from('productos')
					.select('destination')
					.ilike('destination', `%${newValue}%`)
					.limit(5);

				const uniqueCities = [...new Set(ciudades.map(item => item.city))];
				const uniqueDestinations = [...new Set(destinos.map(item => item.destination))];
				
				setSuggestions([
					...uniqueCities.map(city => `${city} (Ciudad)`),
					...uniqueDestinations.map(dest => `${dest} (País)`)
				]);
			}
		} catch (error) {
			console.error('Error al buscar sugerencias:', error);
		}
	};

	const resetSearch = () => {
		setDateRange([null, null]);
		setSearchText('');
		setSearchResults([]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (startDate && endDate && searchText) {
			onBuscar({ startDate, endDate, searchText });
		}
	};

	const onChange = (dates) => {
		setDateRange(dates);
	};

	const calendarStyles = `
		.react-datepicker-wrapper {
			width: 100%;
			position: relative;
		}
		.react-datepicker-popper {
			position: absolute !important;
			left: 0 !important;
			margin-top: 8px !important;
			z-index: 9999 !important;
			width: ${isMobile ? '100%' : 'auto'};
		}
		.react-datepicker {
			font-family: inherit;
			border: 1px solid #e2e8f0;
			border-radius: 0.5rem;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
			width: ${isMobile ? '100%' : 'auto'};
			display: ${isMobile ? 'block' : 'flex'} !important;
			background-color: white;
		}
		.react-datepicker__month-container {
			float: none;
			width: ${isMobile ? '100%' : 'auto'};
		}
		.react-datepicker__month {
			margin: 0.4em 0;
			padding: 0 4px;
		}
		.react-datepicker__day-names, 
		.react-datepicker__week {
			display: flex;
			justify-content: space-around;
			white-space: nowrap;
		}
		.react-datepicker__day-name, 
		.react-datepicker__day {
			width: ${isMobile ? '2rem' : '2.5rem'};
			line-height: ${isMobile ? '2rem' : '2.5rem'};
			margin: 2px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: ${isMobile ? '0.8rem' : '0.9rem'};
		}
		.react-datepicker__header {
			background-color: #FF8127;
			border-bottom: none;
			padding: 0.8rem 0;
		}
		.react-datepicker__current-month {
			font-size: ${isMobile ? '0.9rem' : '1rem'};
			margin-bottom: 0.5rem;
		}
		.react-datepicker__day--selected,
		.react-datepicker__day--in-selecting-range,
		.react-datepicker__day--in-range {
			background-color: #FF8127;
			color: white;
			border-radius: 50%;
		}
		.react-datepicker__day--keyboard-selected {
			background-color: #FF8127;
			color: white;
			border-radius: 50%;
		}
		.react-datepicker__day:hover {
			background-color: #FFE5D1;
			border-radius: 50%;
		}
		.react-datepicker__day--disabled {
			color: #ccc !important;
			cursor: not-allowed !important;
			background-color: #f0f0f0 !important;
		}
		.react-datepicker__day--disabled:hover {
			background-color: #f0f0f0 !important;
		}
		@media (max-width: 768px) {
			.react-datepicker {
				font-size: 0.8rem;
			}
			.react-datepicker__month-container {
				width: 100%;
			}
			.react-datepicker__month {
				margin: 0;
			}
		}
	`;

	return (
		<>
			<style>{calendarStyles}</style>
			<div className="search-bar-container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				<div className="flex flex-col gap-4 mb-6">
					<div className="flex flex-col">
						<h2 className="text-2xl sm:text-3xl font-bold">¿A dónde quieres ir?</h2>
						<p className="text-gray-600 mt-2 text-sm sm:text-base">
							Selecciona un rango de fechas y un destino
						</p>
					</div>
					
					{(searchResults.length > 0 || searchText || startDate || endDate) && (
						<button
							onClick={resetSearch}
							className="self-start text-gray-600 hover:text-gray-800 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
						>
							✕ Limpiar búsqueda
						</button>
					)}
				</div>

				<div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
					<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1 min-w-0" style={{ position: 'relative' }}>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Fechas del viaje
							</label>
							<div style={{ position: 'relative' }}>
								<DatePicker
									selected={startDate}
									onChange={onChange}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									monthsShown={isMobile ? 1 : 2}
									dateFormat="dd/MM/yyyy"
									placeholderText="Selecciona las fechas"
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
									popperClassName="react-datepicker-popper"
									calendarClassName="react-datepicker"
									popperPlacement="bottom-start"
									minDate={new Date()}
									popperModifiers={[
										{
											name: "offset",
											options: {
												offset: [0, 8],
											},
										},
										{
											name: "preventOverflow",
											options: {
												boundary: 'viewport',
												padding: 8,
											},
										}
									]}
								/>
							</div>
						</div>

						<div className="flex-1 min-w-0">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Destino
							</label>
							<Autocomplete
								options={suggestions}
								value={searchText}
								onChange={(_, newValue) => setSearchText(newValue)}
								onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
								freeSolo
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="¿A dónde vas?"
										fullWidth
										sx={{
											'& .MuiOutlinedInput-root': {
												borderRadius: '0.5rem',
												height: '42px',
											}
										}}
									/>
								)}
							/>
						</div>

						<div className="flex items-end">
							<button
								type="submit"
								className="w-full sm:w-auto px-6 py-2 bg-[#FF8127] text-white rounded-lg hover:bg-[#FF8127]/90 transition-colors"
								disabled={!startDate || !endDate || !searchText}
							>
								Buscar
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
