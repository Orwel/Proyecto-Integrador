import React from 'react'
import { useSupabase } from "../context/supabase-context";


export const useImages = () => {
  const { supabase } = useSupabase();

  const insertImages = async (newImage) => {
    try {
 
      if (!newImage || !newImage.url_imge || !newImage.product_id) {
        throw new Error("Los datos de la imagen son incompletos.");
      }

      const { data, error } = await supabase
        .from('images')
        .insert(newImage)
        .select();

      if (error) {
        throw error; 
      }

      return { data };
    } catch (error) {
      console.error("Error al insertar la imagen:", error.message);
      return { error }; 
    }
  };

  return {
    insertImages,
  };
};
