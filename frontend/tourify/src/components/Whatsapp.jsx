import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+573150023164";
  const message = "¡Hola! Me gustaría recibir más información.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.floatingButton}
      aria-label="Contactar por WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={styles.icon}
      />
    </a>
  );
};

const styles = {
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#25D366",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    textDecoration: "none",
  },
  icon: {
    width: "35px",
    height: "35px",
  },
};

export default WhatsAppButton;
