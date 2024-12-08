import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';
import { useAuth } from "../context/AuthContext";

export const useFavorites = () => {
    const { supabase } = useSupabase();
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    //Agregar favorites
    const handleCreate = async (productId) => {
        if (!user)
            return;

        setLoading(true);

        const prevFavorites = [...favorites];
        setFavorites((prevFavorites) => [...prevFavorites, { user_id: user.id, product_id: productId }]);

        const { data, error } = await supabase
            .from("favorites")
            .insert({ user_id: user.id, product_id: productId });

        if (error) {
            setFavorites(prevFavorites);
            setError(error);
            setLoading(false);
            // alert("Hubo un error al añadir el producto a favoritos.");
            setModalType("error");
            setModalOpen(true);
            return;
        }

        if (data && data.length > 0) {
            setLoading(false);
        }
        // alert("Producto añadido a favoritos.");
        setModalType("favsAñadidos");
        setModalOpen(true);
    };

    //Eliminar favoritos
    const handleDelete = async (productId) => {
        if (!user) return;
        setLoading(true);

        const { data, error } = await supabase
            .from("favorites")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", productId);

        if (error) {
            setError(error);
            setLoading(false);
            // alert("Hubo un error al eliminar el producto de favoritos.");
            setModalType("error");
            setModalOpen(true);
            return;
        }

        setFavorites((prevFavorites) =>
            prevFavorites.filter((favorite) => favorite.product_id !== productId)
        );

        setLoading(false);
        // alert("Producto eliminado de favoritos.");
        setModalType("favsEliminados");
        setModalOpen(true);
    };

    // Fetch inicial de favoritos
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;
            setLoading(true);

            const { data, error } = await supabase
                .from("favorites")
                .select("*")
                .eq("user_id", user.id)

            if (error) {
                setError(error);
                setLoading(false);
                return;
            }

            setFavorites(data);
            setLoading(false);
        };

        fetchFavorites();
    }, [supabase, user]);

    return { favorites, loading, error, handleCreate, handleDelete, modalOpen, modalType, setModalOpen, setModalType };
};