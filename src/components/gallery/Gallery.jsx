import React from 'react'
import './Gallery.css';
import imgVideo from '../../assets/imgVideo.webp';

const Gallery = () => {
    return (
    <section className="gallery">
    <h2 className="gallery__title">Galeria y Documentación</h2>
    <div className="gallery__content">
        <div className="gallery__images">
            <img src={imgVideo} alt="Video" />
        </div>
        <div className="gallery__downloads">
            <ul className="download__list">
                <li className="download__item">📚 Biblioteca y acceso a recursos digitales</li>
                <li className="download__item">☕ Cafeterías y zonas de descanso</li>
                <li className="download__item">🚌 Rutas de transporte</li>
                <li className="download__item">💻 Acceso a Wi-Fi y laboratorios</li>
            </ul>
        </div>
    </div>
</section>

    )
}

export default Gallery