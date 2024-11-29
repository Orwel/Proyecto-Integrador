import React from "react";

const TerminosServicio = () => {
    return (
        <div style={styles.container}>
        <h1 style={styles.title}>Términos de Servicio</h1>
        <p style={styles.text}>
            Bienvenido a <span style={styles.brand}>Tourify</span>. 
            Al utilizar nuestra plataforma, aceptas cumplir
            con los siguientes términos y condiciones de uso. Por favor, léelos
            detenidamente.
        </p>
        <ol style={styles.list}>
            <li style={styles.listItem}>
            <strong>Aceptación de los Términos</strong> 
            <br /> Al acceder o utilizar 
            <span style={styles.brand}> Tourify</span>, aceptas estos términos de uso en su totalidad. Si no estás de acuerdo con alguno 
            de los términos, debes abstenerte de utilizar nuestra plataforma.
            </li>
            <li style={styles.listItem}>
            <strong>Descripción del Servicio:</strong> 
            <br />
            <span style={styles.brand}> Tourify</span> proporciona una
            plataforma en línea para explorar, buscar y reservar experiencias y tours. La
            disponibilidad de las experiencias puede variar y está sujeta a
            cambios.
            </li>
            <li style={styles.listItem}>
            <strong>Registro y Cuenta de Usuario</strong> 
            <br />
            Para acceder a ciertas
            funciones, es posible que debas crear una cuenta. Eres responsable de
            mantener la confidencialidad de tus datos de acceso y de todas las
            actividades que ocurran bajo tu cuenta. Te comprometes a notificar de inmediato a <span style={styles.brand}> Tourify</span>
            sobre cualquier uso no autorizado de tu cuenta.
            </li>
            <li style={styles.listItem}>
            <strong>Política de Reservas y Cancelaciones</strong>
            <br /> 
            Las reservas
            están sujetas a disponibilidad. Las políticas de cancelación pueden
            variar según cada experiencia o tour, y es responsabilidad del usuario
            revisar dichas políticas antes de hacer una reserva.
            </li>
            <li style={styles.listItem}>
            <strong>Propiedad Intelectual</strong>
            <br /> 
            Todos los contenidos de <span style={styles.brand}> Tourify</span>, incluidos textos, gráficos, logos e imágenes, 
            son propiedad de <span style={styles.brand}> Tourify</span> y están protegidos por leyes de derechos de autor.
            No se permite la reproducción, distribución o modificación sin autorización.
            </li>
            <li style={styles.listItem}>
            <strong>Limitación de Responsabilidad</strong>
            <br /> 
            <span style={styles.brand}> Tourify</span> no se hace responsable por inconvenientes, pérdidas o daños que puedan surgir 
            del uso de los servicios ofrecidos en la plataforma. Las experiencias son proporcionadas 
            por terceros y <span style={styles.brand}> Tourify</span> no garantiza su calidad ni disponibilidad.
            </li>
            <li style={styles.listItem}>
            <strong>Modificación de los Términos</strong>
            <br /> 
            <span style={styles.brand}>Tourify </span>se reserva el derecho de modificar estos términos en 
            cualquier momento. Las actualizaciones serán publicadas en esta página y, al continuar utilizando 
            la plataforma, aceptas los términos actualizados.
            </li>
            <li style={styles.listItem}>
            <strong>Contacto</strong>
            <br /> 
            Si tienes preguntas sobre estos términos de uso, puedes contactarnos en <strong>tourifycolombia@gmail.com</strong>.
            </li>
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

export default TerminosServicio;
