import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';
import { useAuth } from "../context/AuthContext";


export const useFavorites = () => {
    const { supabase } = useSupabase();
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Agregar favorites
    const handleCreate = async (productId) => {
        if (!user) return;
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
            alert("Hubo un error al añadir el producto a favoritos.");
            return;
        }

        if (data && data.length > 0) {
            setLoading(false);
        }
        alert("Producto añadido a favoritos.");
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
            alert("Hubo un error al eliminar el producto de favoritos.");
            return;
        }
    
        setFavorites((prevFavorites) => 
            prevFavorites.filter((favorite) => favorite.product_id !== productId)
        );

        setLoading(false);
        alert("Producto eliminado de favoritos.");

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
    
    return { favorites, loading, error, handleCreate, handleDelete };
};