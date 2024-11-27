import React from "react";

const PoliticaPrivacidad = () => {
    return (
        <div style={styles.container}>
        <h1 style={styles.title}>Política de Privacidad</h1>
        <p style={styles.text}>
            En <span style={styles.brand}>Tourify</span>, valoramos y respetamos tu privacidad. Esta política describe
            cómo recopilamos, usamos, compartimos y protegemos tu información personal cuando utilizas nuestros servicios. 
            Al utilizar nuestra plataforma, aceptas los términos de esta política.
        </p>
        <ol style={styles.list}>
            <li style={styles.listItem}>
            <strong>Información que recopilamos:</strong> 
            <br />
            <strong>● Datos personales: </strong> 
            Al registrarte, es posible que te solicitemos datos como tu nombre y correo electrónico
            para gestionar tus reservas y mantenerte informado.
            <br />
            <strong>● Información de uso: </strong> 
            Recopilamos datos sobre cómo interactúas con nuestra plataforma para mejorar nuestros servicios.
            </li>
            <li style={styles.listItem}>
            <strong>Uso de la información:</strong>
            <br />
            ● Utilizamos tus datos para procesar reservas, comunicarnos contigo, 
            ofrecerte recomendaciones personalizadas y mejorar tu experiencia en <span style={styles.brand}>Tourify</span>.
            <br />
            ● Podemos enviarte correos electrónicos sobre novedades, 
            ofertas o actualizaciones que consideremos relevantes. 
            Puedes optar por no recibir estos correos en cualquier momento.
            <br />
            ● Para cumplir con nuestras obligaciones legales y regulatorias.
            </li>
            <li style={styles.listItem}>
            <strong>Compartir información con terceros:</strong> 
            <br />
            ● Podemos compartir tu información personal con socios y proveedores de servicios 
            confiables para procesar pagos, gestionar reservas, o realizar otras actividades 
            necesarias para brindarte nuestros servicios. Estos proveedores están sujetos a 
            acuerdos de confidencialidad que limitan el uso de tu información a los fines 
            establecidos por <span style={styles.brand}>Tourify</span>.
            <br />
            ● Si es necesario para cumplir con una obligación legal o en respuesta a una solicitud gubernamental, 
            podemos compartir tu información con las autoridades pertinentes.
            <br />
            Nunca venderemos tu información personal a terceros.
            </li>
            <li style={styles.listItem}>
            <strong>Protección de tu información:</strong> 
            <br />
            ● Nos tomamos en serio la seguridad de tus datos. Implementamos medidas de seguridad físicas, 
            técnicas y administrativas para proteger tu información personal contra el acceso no autorizado,
            uso indebido, alteración o divulgación. Sin embargo, ningún método de transmisión por
            Internet o de almacenamiento electrónico es completamente seguro, por lo que no podemos 
            garantizar una seguridad absoluta.
            </li>
            <li style={styles.listItem}>
            <strong>Tus derechos:</strong>
            <br />
            ● Puedes acceder, corregir o eliminar tu información en cualquier momento. 
            Para realizar estas acciones, contáctanos en <strong>tourifycolombia@gmail.com</strong>.
            </li>
            <li style={styles.listItem}>
            <strong>Cambios en la política de privacidad:</strong> 
            <br />
            ● Podemos actualizar esta política de privacidad para reflejar cambios en nuestras prácticas 
            o en las leyes que nos afectan. Te notificaremos sobre cualquier cambio importante mediante 
            un aviso en la plataforma o a través de los canales de contacto que tengamos registrados.
            <br />
            Te recomendamos que revises esta política de privacidad periódicamente para estar informado de cualquier cambio.
            </li>
            <br />
            <strong>Contáctanos. </strong>Si tienes alguna pregunta sobre esta política de privacidad, 
            no dudes en escribirnos a <strong>tourifycolombia@gmail.com</strong>.
        </ol>
        </div>
    );
};

const styles = {
    container: {
        padding: "100px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "16px",
        textAlign: "center",
        color: "#333",
    },
    text: {
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#555",
        marginBottom: "16px",
        textAlign: "left",
    },
    list: {
        paddingLeft: "20px",
        textAlign: "left",
    },
    listItem: {
        marginBottom: "12px",
        color: "#555",
    },
    brand: {
        fontWeight: "bold",
        color: "#FE8C00",
    },
};

export default PoliticaPrivacidad;
