import React from 'react'
import './Main.css';
import { Link } from 'react-router';

const Main = () => {
    return (
        <main>
            <section className="hero">
                <div className="hero__content">
                    <h2 className="hero__title">Explora el Campus con Polimaps</h2>
                    <p className="hero__subtitle">"Descubre la EPN a un clic y recorre el campus como un experto."</p>
                    <div className="hero__buttons">
                        <Link to="/map" className="button">Usalo Ahora!</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main