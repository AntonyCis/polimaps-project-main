import React, { useState } from 'react';
import './Contact.css';
import mapPlaceholderImage from '../../assets/map-placeholder.png'; // Asegúrate de tener una imagen de placeholder

const Contact = () => {
    // El estado para controlar si el mapa ya se cargó o no
    const [mapLoaded, setMapLoaded] = useState(false);

    // La función que se ejecuta al hacer clic para cargar el iframe
    const loadMap = () => {
        setMapLoaded(true);
    };

    return (
        <>
            <section className="container contact" id='contact'>
                <div className="contact__form">
                    <h2 className="contact__title">¿Tienes preguntas? Escríbenos</h2>
                    <form action="https://formsubmit.co/antony.cisneros@epn.edu.ec" method="POST">
                        <input type="name" name="nombre" placeholder="Nombre" required />
                        <input type="email" name="corre0" placeholder="Correo" required />
                        <input type="tel" name="celular" placeholder="Celular" required />
                        <textarea name="observaciones" placeholder="Observaciones" rows="4"></textarea>
                        <label className="checkbox__label">
                            <input type="checkbox" required />
                            Términos y condiciones
                        </label>
                        <button type="submit" className="btn button">Enviar</button>
                    </form>
                </div>
                <div className="contact__map">
                    {!mapLoaded ? (
                        // Esto se muestra inicialmente: una imagen con un botón de "Cargar mapa"
                        <div className="map-facade" onClick={loadMap}>
                            <img 
                                src={mapPlaceholderImage} 
                                alt="Ubicación de la EPN en Google Maps" 
                                width="600" 
                                height="450" 
                                style={{ cursor: 'pointer' }}
                            />
                            <button className="map-button">Cargar Mapa</button>
                        </div>
                    ) : (
                        // Esto se muestra solo después de que el usuario hace clic
                        <iframe
                            title="Mapa de ubicación de la Escuela Politécnica Nacional"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7914484515727!2d-78.4919116242656!3d-0.2102860353982151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a107e1cd44b%3A0x88a284f66939ed4!2sESCUELA%20POLIT%C3%89CNICA%20NACIONAL!5e0!3m2!1ses-419!2sec!4v1748692694233!5m2!1ses-419!2sec"
                            width="600"
                            height="450"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    )}
                </div>
            </section>
        </>
    );
}

export default Contact;