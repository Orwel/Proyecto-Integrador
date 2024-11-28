import { Link } from "react-router-dom";
import ProductFavs from "./ProductFavs";
import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa"; // Icono de Telegram
import SharePopup from "./SharePopup"; // Componente emergente para compartir
import "../styles/Card.css"; // Asegúrate de mantener estilos consistentes
export const Card = ({ id, image, title, location, country, reviews, rating, price ,description}) => {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  const handleShareClick = () => {
    setIsSharePopupOpen(true); // Abrir ventana emergente
  };

  const closeSharePopup = () => {
    setIsSharePopupOpen(false); // Cerrar ventana emergente
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
      <Link to={"/detail/" + id}>
      <h3>{title}</h3>
      </Link>
        <p className="card-location">{country}</p>
        <p className="card-location">📍({location})</p>
        <div className="card-footer">
          <div className="card-footer-left">
            <span className="rating-star">⭐ {rating}</span>
            <span className="reviews">({reviews} reviews)</span>
          </div>
          <span className="price">${price}</span>
        </div>
      </div>
      <div className="card-favorite">
      <div className="card-actions">
        
        <button
          className="card-share"
          style={{color: "#FE8C00" }}
          onClick={handleShareClick}
        >
          <FaTelegramPlane size={20} />
        </button>
      </div>
      
        <ProductFavs productId={id} />
        
      </div>

      {isSharePopupOpen && (
      <SharePopup 
      link={`http://localhost:5173/detail/${id}`}
      title={title} // Pasar el título del producto
      image={image} // Pasar la imagen del producto
      description={description} // Pasar descripción corta
      onClose={closeSharePopup} // Función para cerrar el popup
      />
      
    )}
      

    </div>

  );

  
}