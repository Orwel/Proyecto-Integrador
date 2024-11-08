import { useState, useEffect } from 'react';
import { useSupabase } from '../context/supabase-context';

export const useCharacteristics = () => {
    const { supabase } = useSupabase();
    const [characteristics, setCharacteristics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCharacteristics();
    }, []);

    const fetchCharacteristics = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('caracteristicas')
            .select('*')
            .order('id', { ascending: true });
        setCharacteristics(data);

        if (error) {
            setError(error);
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    return { characteristics, loading, error };
};
