import React from 'react'
import './Gallery.css';

const Gallery = () => {
    return (
    <section className="gallery">
    <h2 className="gallery__title">Galeria y Documentación</h2>
    <div className="gallery__content">
        <div className="gallery__images">
            <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/GXnSPdObbXE?start=101"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
            />
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