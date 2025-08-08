import React, { useState } from 'react';
import './Gallery.css';

const videoId = "GXnSPdObbXE";

const Gallery = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="gallery">
      <h2 className="gallery__title">Galeria y Documentación</h2>
      <div className="gallery__content">
        <div 
          className="gallery__images" 
          style={{ maxWidth: 560, margin: '0 auto', cursor: 'pointer', position: 'relative', borderRadius: 12, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
          onClick={() => setPlayVideo(true)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setPlayVideo(true)}}
          role="button"
          tabIndex={0}
          aria-label="Reproducir video de YouTube"
        >
          {playVideo ? (
            <iframe
              width="100%"
              height="280"
              src={`https://www.youtube.com/embed/${videoId}?start=101&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
              style={{ borderRadius: '12px' }}
            />
          ) : (
            <>
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="Miniatura del video"
                style={{ width: '100%', borderRadius: 12, display: 'block' }}
                loading="lazy"
                aria-hidden="true"
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 64,
                color: 'white',
                textShadow: '0 0 10px rgba(0,0,0,0.7)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                ▶
              </div>
            </>
          )}
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
  );
};

export default Gallery;
