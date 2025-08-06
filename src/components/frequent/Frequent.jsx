import React, { useState } from 'react';
import './Frequent.css';

const faqs = [
  {
    question: '¿Qué hago si no sé dónde está mi aula?',
    answer: 'Puedes usar el mapa interactivo de Polimaps para buscar tu aula por nombre o código. También puedes consultar la sección "Ubicación y orientación" en la app.',
  },
  {
    question: '¿Dónde encuentro información sobre eventos?',
    answer: 'En la sección de eventos de Polimaps verás actividades culturales, académicas y deportivas con fechas, lugares y responsables. También puedes revisar el blog de noticias.',
  },
  {
    question: '¿Cómo registro eventos en el mapa?',
    answer: 'Si eres organizador, puedes solicitar acceso al panel de administración escribiendo a polimaps@gmail.com. Desde allí podrás añadir eventos geolocalizados.',
  },
];

const Frequent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="frequent">
      <div className="frequent__container">
        <h2 className="frequent__title">Preguntas Frecuentes</h2>
        <ul className="frequent__list">
          {faqs.map((faq, index) => (
           <li
            key={index}
            className={`frequent__item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAnswer(index)}
            >
            <span>
                {faq.question}
                <i className={`fa ${activeIndex === index ? 'fa-chevron-up' : 'fa-arrow-circle-right'}`}></i>
            </span>
            {activeIndex === index && (
                <p className="frequent__answer">{faq.answer}</p>
            )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Frequent;
