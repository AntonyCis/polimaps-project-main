import React from 'react'
import './Frequent.css';

const Frequent = () => {
    return (
        <section className="frequent">
            <div className="frequent__container">
                <h2 className="frequent__title">Preguntas Frecuentes</h2>
                <ul className="frequent__list">
                    <li className="frequent__item">
                        ¿Qué hago si no sé dónde está mi aula? <i className="fa fa-arrow-circle-right"></i>
                    </li>
                    <li className="frequent__item">
                        ¿Donde encuentro información sobre eventos? <i className="fa fa-arrow-circle-right"></i>
                    </li>
                    <li className="frequent__item">
                        ¿Cómo registro eventos en el mapa? <i className="fa fa-arrow-circle-right"></i>
                    </li>
                    </ul>
                </div>
        </section>
    )
}

export default Frequent