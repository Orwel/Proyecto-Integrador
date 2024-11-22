import { useFavorites } from "../hook/use-favorites";
import { useAuth } from "../context/AuthContext";
import Heart from "../assets/Icons/Heart";
import HeartFull from "../assets/Icons/HeartFull";


const ProductFavs = ({ productId }) => {
  const { user } = useAuth();
  const { handleCreate, handleDelete, favorites } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.product_id === productId);

  const handleFavoriteClick = async () => {
    if (!user) {
      alert("Necesitas iniciar sesión para añadir productos a favoritos.");
      return;
    }

    try {
      if (isFavorited) {
        await handleDelete(productId);
      } else {
        await handleCreate(productId);
      }
    } catch (error) {
      console.error("Error al manejar favoritos:", error);
    }
  }

  return (
    <button onClick={handleFavoriteClick} className="card-favorite">
      {isFavorited ? (<HeartFull />) : (<Heart />)}
    </button>
  );
};

export default ProductFavs;
