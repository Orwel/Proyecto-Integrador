import { useFavorites } from "../hook/use-favorites";
import { useAuth } from "../context/AuthContext";
import HeartIcon from '../assets/Icons/Heart.svg';
import EmptyHeartIcon from '../assets/Icons/Union.svg';

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
    <button onClick={handleFavoriteClick}>
      {isFavorited ? <img src={EmptyHeartIcon} alt="Corazón vacío" /> : <img src={HeartIcon} alt="Corazón lleno"/>}
    </button>
  );
};

export default ProductFavs;
