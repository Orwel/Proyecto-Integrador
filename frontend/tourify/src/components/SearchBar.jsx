import React from 'react'

export const SearchBar = () => {
	return (
		<>
			<div className="search-bar">
				<h2>¿A dónde quieres ir?</h2>
				<div className="search-fields">
					<div className="search-field">
						<label>Ubicación</label>
						<input className="search-field" type="search" placeholder="Explora destinos" />
						
					</div>
					<div className="divider" />
					<div className="search-field">
						<label>Check in</label>
						<input className="search-field" type="search" placeholder="Agrega fecha" />
						
					</div>
					<div className="divider" />
					<div className="search-field">
						<label>Check out</label>
						<input className="search-field" type="search" placeholder="Agrega fecha" />
						
					</div>
					<div className="divider" />
					<button className="search-button">Buscar</button>
				</div>
			</div>
		</>
	)
}
