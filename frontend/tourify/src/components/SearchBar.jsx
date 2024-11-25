import React, { useState } from 'react';

export const SearchBar = ({ onBuscar }) => {
	const [startDate, setStartDate] = useState('');
  	const [endDate, setEndDate] = useState('');
  	const [filterText, setFilterText] = useState('');

	  const handleSubmit = (e) => {
		e.preventDefault();
		if (!startDate || !endDate) {
		  alert('Por favor, selecciona ambas fechas');
		  return;
		}
		onBuscar({ startDate, endDate, filterText });
	  };

	return (
		<>
			<div className="search-bar">
				<h2>¿A dónde quieres ir?</h2>
				<div className="search-fields">
				<form onSubmit={handleSubmit} className='search-form'>
					<div className="search-field">
						<label>
						Fecha Inicio:
						<input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className="search-field"
							placeholder='Agrega fecha de inicio'
						/>
						</label>
					</div>
					<div className="divider" />
					<div className="search-field">
						<label>
						Fecha Fin:
						<input
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="search-field"
							placeholder='Agrega fecha de fin'
						/>
						</label>
					</div>
					<div className="divider" />
					<div className="search-field">
						<label>
						Ubicación
						<input
							type="text"
							value={filterText}
							placeholder="Explora destinos"
							onChange={(e) => setFilterText(e.target.value)}
							className="search-field"
						/>
						</label>
					</div>
					<div className="divider" />
					<button type="submit" className="search-button">Buscar</button>
					</form>
				</div>
			</div>
		</>
	);
};
