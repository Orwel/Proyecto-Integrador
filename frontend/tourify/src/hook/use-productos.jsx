import { useState, useEffect } from "react";
import { useSupabase } from "../context/supabase-context";
import { useNavigate } from "react-router-dom";

export const useProductos = () => {
	const { supabase } = useSupabase();
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Función para crear un nuevo producto
	const handleCreate = async (newProducto) => {
		setLoading(true);
		const { data, error } = await supabase
			.from("productos")
			.insert([newProducto]);

		if (error) {
			console.log("Datos a insertar:", newProducto);
			console.log("Características:", newProducto.caracteristicas);
			console.log(error);
			setError(error);
			setLoading(false);
			return;
		}

		setProductos((prevProducts) => [...prevProducts, data[0]]);
		setLoading(false);
	};

	// Función para actualizar un producto
	const handleUpdate = async (id, updatedProducto) => {
		setLoading(true);
		const { data, error } = await supabase
			.from("productos")
			.update(updatedProducto)
			.eq("id", id);

		if (error) {
			setError(error);
			setLoading(false);
			return;
		}

		setProductos((prevProducts) =>
			prevProducts.map((product) =>
				product.id === id ? { ...product, ...data[0] } : product
			)
		);
		setLoading(false);
	};

	// Función para eliminar un producto
	const handleDelete = async (id) => {
		const { data, error } = await supabase
			.from("productos")
			.delete()
			.eq("id", id);

		if (error) {
			setError(error);
			setLoading(false);
			return;
		}

		setProductos((prevProducts) =>
			prevProducts.filter((product) => product.id !== id)
		);
	};

	// Obtener productos al montar el componente
	useEffect(() => {
		const fetchProductos = async () => {
			setLoading(true);
			const { data, error } = await supabase
				.from("productos")
				.select("*")
				.order("id", { ascending: true });

			if (error) {
				setError(error);
				setLoading(false);
				return;
			}

			setProductos(data);
			setLoading(false);
		};

		fetchProductos();
	}, [supabase]);

	return {
		productos,
		loading,
		error,
		handleCreate,
		handleUpdate,
		handleDelete,
	};
};
