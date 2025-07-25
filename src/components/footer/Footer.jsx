import React from 'react'
import './Footer.css';
import esfot from '../../assets/ESFOT.avif';

const Footer = () => {
    return (
        <footer class="footer">
        <div class="footer__container">
            <div class="footer__social">
                <h3>Síguenos en redes</h3>
                <div class="social__icons">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>

            <div class="footer__links">
                <h3>Enlaces de interés</h3>
                <div class="links">
                    <a href="#">Soporte técnico</a>
                    <a href="#">Blog de noticias</a>
                    <a href="#">Preguntas frecuentes (FAQ)</a>
                </div>
            </div>

            <div class="footer__contact">
                <img src={esfot} alt=""/>
                <h3>Contacto</h3>
                <p class="write">polimaps@gmail.com</p>
            </div>
        </div>

        <hr/>
        <p class="footer__copy">© Derechos Reservados -  2025 Escuela de Formación de Tecnólogos. Sitio desarrollado por estudiantes para estudiantes. 💛</p>
    </footer>
    )
}

export default Footer