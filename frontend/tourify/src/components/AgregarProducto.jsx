import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const AgregarProducto = ({
	closeModal,
	handleCreate,
	characteristics,
}) => {
	const [categorias, setCategorias] = useState([]);
	const [producto, setProducto] = useState({
		name: "",
		destination: "",
		city: "",
		duration_days: "",
		duration_nights: "",
		unit_price: "",
		categoria_id: "",
		characteristics: [],
	});

	useEffect(() => {
		cargarCategorias();
	}, []);

	const cargarCategorias = async () => {
		try {
			const { data, error } = await supabase.from("categorias").select("*");
			if (error) throw error;
			setCategorias(data);
		} catch (error) {
			console.error("Error al cargar categorías:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await handleCreate(producto); // Llamada a la función para insertar
			console.log("Producto creado en la base de datos:", producto);

			// Limpiar formulario y cerrar modal
			setProducto({
				name: "",
				destination: "",
				city: "",
				duration_days: "",
				duration_nights: "",
				unit_price: "",
				categoria_id: "",
				characteristics: [],
			});
			closeModal();
		} catch (error) {
			console.error("Error al agregar producto:", error);
			alert("Error al agregar producto");
		}
	};

	return (
		<div>
			<div className="modal-content">
				<form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
					<div className="mb-4">
						<label className="block mb-2">Nombre:</label>
						<input
							type="text"
							value={producto.name}
							onChange={(e) =>
								setProducto({ ...producto, name: e.target.value })
							}
							className="w-full p-2 border rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2">País:</label>
						<input
							type="text"
							value={producto.destination}
							onChange={(e) =>
								setProducto({ ...producto, destination: e.target.value })
							}
							className="w-full p-2 border rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2">Ciudad:</label>
						<input
							type="text"
							value={producto.city}
							onChange={(e) =>
								setProducto({ ...producto, city: e.target.value })
							}
							className="w-full p-2 border rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2">Noches:</label>
						<input
							type="number"
							value={producto.duration_nights}
							onChange={(e) =>
								setProducto({ ...producto, duration_nights: e.target.value })
							}
							className="w-full p-2 border rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2">Días de duración:</label>
						<input
							type="number"
							value={producto.duration_days}
							onChange={(e) =>
								setProducto({ ...producto, duration_days: e.target.value })
							}
							className="w-full p-2 border rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2">Precio Unitario:</label>
						<input
							type="number"
							value={producto.unit_price}
							onChange={(e) =>
								setProducto({ ...producto, unit_price: e.target.value })
							}
							className="w-full p-2 border rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2">Categoría:</label>
						<select
							value={producto.categoria_id}
							onChange={(e) =>
								setProducto({ ...producto, categoria_id: e.target.value })
							}
							className="w-full p-2 border rounded"
							required>
							<option value="">Seleccione una categoría</option>
							{categorias?.map((cat) => (
								<option className="" key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>

					<div className="mb-4">
						<label className="block mb-2">Características:</label>
						{characteristics.map((car) => (
							<div key={car.id} className="mb-2">
								<label className="block text-sm">{car.name}:</label>
								<input
									type="text"
									onChange={(e) => {
										const nuevasCaracteristicas = [...producto.characteristics];
										const index = nuevasCaracteristicas.findIndex(
											(c) => c.id === car.id
										);
										if (index >= 0) {
											nuevasCaracteristicas[index].valor = e.target.value;
										} else {
											nuevasCaracteristicas.push({
												id: car.id,
												valor: e.target.value,
											});
										}
										setProducto({
											...producto,
											characteristics: nuevasCaracteristicas,
										});
									}}
									className="w-full p-2 border rounded"
								/>
							</div>
						))}
					</div>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={closeModal}
							className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
							Cancelar
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Agregar Producto
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AgregarProducto;
