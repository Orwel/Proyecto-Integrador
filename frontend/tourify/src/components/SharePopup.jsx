import React from "react";
import "../styles/share-popup.css";
import { FaLink, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";

const SharePopup = ({ link, title, image, description, onClose }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    alert("¡Enlace copiado al portapapeles!");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Mira este producto en Tourify");
    const body = encodeURIComponent(`Hola, quiero compartir este producto contigo: ${link}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleInstagramRedirect = () => {
    alert("Instagram no permite compartir enlaces directamente. Comparte el enlace copiado.");
  };

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(facebookShareUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;
    window.open(whatsappShareUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(
      "¡Mira este producto en Tourify!"
    )}`;
    window.open(twitterShareUrl, "_blank");
  };

  return (
    <div className="share-popup-overlay">
      <div className="share-popup">
        <header className="share-popup-header">
          <h3>Compartir producto</h3>
          <button className="close-button" onClick={onClose}>✖</button>
        </header>

        <div className="share-popup-content">
          <div className="product-info">
            <img src={image} alt={title} className="product-image" />
            <div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </div>

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

          <textarea
            className="message-box"
            placeholder="Escribe un mensaje"
            maxLength="450"
          ></textarea>
          <span className="character-count">0/450 caracteres</span>

          <button className="send-button">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;