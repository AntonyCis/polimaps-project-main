import React from 'react'
import './Services.css';

const Services = () => {
    return (
        <section className="services">
            <div className="services__content">
                <h2 className="services__title">Servicios</h2>
                <div className="services__cards">
                    <p className="service">
                    <i className="fas fa-chalkboard-teacher"></i> Espacios Académicos
                    </p>
                    <p className="service">
                    <i className="fas fa-compass"></i> Ubicación y orientación
                    </p>
                    <p className="service">
                    <i className="fas fa-user-graduate"></i> Servicios estudiantiles
                    </p>
                    <p className="service">
                    <i className="fas fa-tree"></i> Zonas comunes
                </p>
                </div>
            </div>
        </section>
    )
}

export default Services