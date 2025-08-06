import React, { useEffect, useState } from "react";
import { dbFirebase } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./events.css";

const Events = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const querySnapshot = await getDocs(collection(dbFirebase, "eventos"));
      const eventosList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEventos(eventosList);
    };
    fetchEventos();
  }, []);

  return (
    <div className="events-list">
      <h2 className="events-title">Eventos</h2>
      {eventos.length === 0 ? (
        <p>No hay eventos registrados.</p>
      ) : (
        <div className="event-cards-container">
          {eventos.map(evento => (
            <div key={evento.id} className="event-card">
              {evento.imagenUrl && (
                <img
                  src={evento.imagenUrl}
                  alt={evento.nombre}
                  className="event-card-img"
                />
              )}
              <div className="event-card-body">
                <strong className="event-card-title">{evento.nombre}</strong>
                <span className="event-card-info">Encargado: {evento.encargado}</span>
                <span className="event-card-info">Tipo: {evento.tipoEvento}</span>
                <span className="event-card-info">Fecha: {evento.fechaEvento}</span>
                <span className="event-card-info">Lugar: {evento.lugarEvento}</span>
                <span className="event-card-desc">{evento.descripcion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;