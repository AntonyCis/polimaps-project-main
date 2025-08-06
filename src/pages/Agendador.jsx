import React, { useState, useEffect } from "react";
import "../styles/Agendador.css";
import { dbFirebase } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

function Agendador() {
  const [formData, setFormData] = useState({
    nombre: "",
    encargado: "",
    tipoEvento: "",
    descripcion: "",
    fechaEvento: "",
    lugarEvento: "",
    imagenUrl: ""
  });
  const [eventos, setEventos] = useState([]);
  const [editId, setEditId] = useState(null); 

  const fetchEventos = async () => {
    const querySnapshot = await getDocs(collection(dbFirebase, "eventos"));
    const eventosList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEventos(eventosList);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Actualizar evento existente
        await updateDoc(doc(dbFirebase, "eventos", editId), formData);
        alert("¡Evento actualizado!");
      } else {
        // Crear nuevo evento
        await addDoc(collection(dbFirebase, "eventos"), formData);
        alert("¡Tu evento ha sido registrado!");
      }
      setFormData({
        nombre: "",
        encargado: "",
        tipoEvento: "",
        descripcion: "",
        fechaEvento: "",
        lugarEvento: "",
        imagenUrl: ""
      });
      setEditId(null); // Salir del modo edición
      fetchEventos();
    } catch (error) {
      alert("Error al registrar/actualizar el evento: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este evento?")) {
      await deleteDoc(doc(dbFirebase, "eventos", id));
      fetchEventos();
    }
  };

  const handleUpdate = (evento) => {
    setFormData({
      nombre: evento.nombre || "",
      encargado: evento.encargado || "",
      tipoEvento: evento.tipoEvento || "",
      descripcion: evento.descripcion || "",
      fechaEvento: evento.fechaEvento || "",
      lugarEvento: evento.lugarEvento || "",
      imagenUrl: evento.imagenUrl || ""
    });
    setEditId(evento.id);
  };

  return (
    <>
    <div className="agendador-bg">
    <div className="agendador-container" style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
      <div className="form-box" style={{ flex: 1 }}>
        <h2>{editId ? "Actualizar Evento" : "Registrar Evento"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="encargado"
            value={formData.encargado}
            onChange={handleChange}
            placeholder="Encargado"
            required
          />
          <select
            name="tipoEvento"
            value={formData.tipoEvento}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el tipo de evento</option>
            <option value="Cultural">Cultural</option>
            <option value="Academico">Academico</option>
            <option value="Social">Social</option>
            <option value="Deportivo">Deportivo</option>
          </select>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            placeholder="Descripción del evento"
            required
          ></textarea>
          <input
            type="date"
            name="fechaEvento"
            value={formData.fechaEvento}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lugarEvento"
            value={formData.lugarEvento}
            onChange={handleChange}
            placeholder="Lugar del evento"
            required
          />
          <input
            type="url"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
            placeholder="URL de la imagen (opcional)"
          />
          <div className="form-actions">
            <button type="submit">{editId ? "Actualizar" : "Enviar"}</button>
            {editId && (
              <button type="button" onClick={() => {
                setFormData({
                  nombre: "",
                  encargado: "",
                  tipoEvento: "",
                  descripcion: "",
                  fechaEvento: "",
                  lugarEvento: "",
                  imagenUrl: ""
                });
                setEditId(null);
              }}>
                Cancelar
              </button>
            )}
          </div>
          <p className="Home">
            <a href="/#">Home</a>
          </p>
        </form>
      </div>
      {/* Lista de eventos */}
      <div className="eventos-list" style={{ flex: 1, background: "#f8f8f8", borderRadius: "8px", padding: "1rem" }}>
        <h2>Eventos Registrados</h2>
        {eventos.length === 0 ? (
          <p>No hay eventos registrados.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {eventos.map(evento => (
              <li key={evento.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "0.5rem" }}>
                <strong>{evento.nombre}</strong> <br />
                <span>Encargado: {evento.encargado}</span> <br />
                <span>Tipo: {evento.tipoEvento}</span> <br />
                <span>Fecha: {evento.fechaEvento}</span> <br />
                <span>Lugar: {evento.lugarEvento}</span> <br />
                <span>Descripción: {evento.descripcion}</span> <br />
                {evento.imagenUrl && (
                  <img
                    src={evento.imagenUrl}
                    alt={evento.nombre}
                    style={{ maxWidth: "100%", maxHeight: "150px", marginTop: "0.5rem", borderRadius: "6px" }}
                  />
                )}
                <div style={{ marginTop: "0.5rem" }}>
                  <button onClick={() => handleDelete(evento.id)} style={{ marginRight: "0.5rem", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}>
                    Eliminar
                  </button>
                  <button onClick={() => handleUpdate(evento)} style={{ background: "#3498db", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}>
                    Actualizar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
    </>
  );
}

export default Agendador;
