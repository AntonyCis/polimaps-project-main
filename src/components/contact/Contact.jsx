import React from 'react'
import './Contact.css';

const Contact = () => {
    return (
        <>
        <section className="container contact" id='contact'>
            <div className="contact__form">
                <h2 className="contact__title">¿Tienes preguntas? Escríbenos</h2>
                <form>
                    <input type="name" name="nombre" placeholder="Nombre" required/>
                    <input type="email" name="corre0" placeholder="Correo" required/>
                    <input type="tel" name="celular" placeholder="Celular" required/>
                    <textarea name="observaciones" placeholder="Observaciones" rows="4"></textarea>
                    <label className="checkbox__label">
                        <input type="checkbox" required/>
                        Términos y condiciones
                    </label>
                    <button type="submit" className="btn button">Enviar</button>
                </form>
            </div>

            <div className="contact__map">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7914484515727!2d-78.4919116242656!3d-0.2102860353982151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a107e1cd44b%3A0x88a284f66939ed4!2sESCUELA%20POLIT%C3%89CNICA%20NACIONAL!5e0!3m2!1ses-419!2sec!4v1748692694233!5m2!1ses-419!2sec"
                width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
        </>
    )
}

export default Contact