import { useFavorites } from "../hook/use-favorites";
import { useAuth } from "../context/AuthContext";
import Heart from "../assets/Icons/Heart";
import HeartFull from "../assets/Icons/HeartFull";
import { ModalConfirmation } from "./modalConfirmation";

const ProductFavs = ({ productId }) => {
  const { user } = useAuth();
  const { handleCreate, handleDelete, favorites, modalOpen, modalType, setModalOpen, setModalType } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.product_id === productId);


  const handleFavoriteClick = async () => {
    if (!user) {
      // alert("Necesitas iniciar sesión para añadir productos a favoritos.");
      setModalType("iniciarSesion");
      setModalOpen(true);
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
    <>
      <button onClick={handleFavoriteClick}>
        {isFavorited ? (<HeartFull />) : (<Heart />)}
      </button>
    
      {/* Mostrar el modal en base al estado */}
      <ModalConfirmation
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        type={modalType}
        onConfirm={() => setModalOpen(false)}
        navigate={() => {}}
        role_id={null}
      />
    </>
  );
};

export default ProductFavs;
