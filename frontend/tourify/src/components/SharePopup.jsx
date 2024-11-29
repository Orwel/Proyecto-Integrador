import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/share-popup.css";
import {
  FaLink,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";

const SharePopup = ({ link, title, image, description, onClose }) => {
  // Estado para manejar el mensaje personalizado.
  const [customMessage, setCustomMessage] = useState("");

  // Función para copiar el mensaje personalizado junto con el enlace.
  const handleCopyLink = () => {
    const contentToCopy = `${customMessage}\n${link}`; // Concatenamos el mensaje y el enlace.
    navigator.clipboard.writeText(contentToCopy); // Copiamos el contenido al portapapeles.
    alert("¡Mensaje y enlace copiados al portapapeles!"); // Alerta de confirmación.
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Mira este producto en Tourify");
    const body = encodeURIComponent(`${customMessage}\n${link}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleInstagramRedirect = () => {
    alert(
      "Instagram no permite compartir enlaces directamente. Comparte el enlace copiado."
    );
  };

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
      `${customMessage}\n${link}`
    )}`;
    window.open(whatsappShareUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      link
    )}&text=${encodeURIComponent(customMessage)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const content = (
    <div
      className="share-popup-overlay"
      onClick={(e) => e.target.className === "share-popup-overlay" && onClose()}
    >
      <div className="share-popup">
        <header className="share-popup-header">
          <h3>Compartir producto</h3>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </header>

        <div className="share-popup-content">
          <div className="product-info">
            <img src={image} alt={title} className="product-image" />
            <div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </div>

          {/* Caja de texto para mensaje personalizado */}
          <textarea
            className="message-box"
            placeholder="Escribe un mensaje personalizado (opcional)"
            maxLength="450"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)} // Actualiza el mensaje personalizado.
          ></textarea>
          <span className="character-count">
            {customMessage.length}/450 caracteres
          </span>

          {/* Botones para compartir en redes sociales */}
          <div className="social-buttons-grid">
            <button className="social-button" onClick={handleCopyLink}>
              <FaLink /> Copiar el enlace
            </button>
            <button className="social-button" onClick={handleEmailShare}>
              <FaEnvelope /> Correo electrónico
            </button>
            <button className="social-button" onClick={handleInstagramRedirect}>
              <FaInstagram /> Instagram
            </button>
            <button className="social-button" onClick={handleFacebookShare}>
              <FaFacebook /> Facebook
            </button>
            <button className="social-button" onClick={handleWhatsAppShare}>
              <FaWhatsapp /> WhatsApp
            </button>
            <button className="social-button" onClick={handleTwitterShare}>
              <FaTwitter /> X.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default SharePopup;
