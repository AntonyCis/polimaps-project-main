import { useForm } from "react-hook-form";
import { dbFirebase } from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const EdificiosCrud = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [edificios, setEdificios] = useState([]);
  const [id, setId] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
      if (L.DomUtil.get('map') !== null) {
        L.DomUtil.get('map')._leaflet_id = null;
      }
      const center = [-0.2105, -78.4891];
      const map = L.map('map').setView(center, 17);
      mapRef.current = map;
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
  
      map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        L.popup()
          .setLatLng(e.latlng)
          .setContent(`Coordenadas:<br>Latitud: ${lat}<br>Longitud: ${lng}`)
          .openOn(map);
      });
    }, []);

  // Crear o actualizar
  const handleCreate = async (data) => {
  try {
    // Convertir latitud y longitud a array
    const coords = [
      parseFloat(data.latitud),
      parseFloat(data.longitud)
    ];
    const edificioData = {
      nombre: data.nombre,
      imagen: data.imagen,
      ubicacion: data.ubicacion,
      descripcion: data.descripcion,
      coords
    };
    if (id) {
      await updateDoc(doc(dbFirebase, "edificios", id), edificioData);
      setId("");
      reset({ nombre: "", imagen: "", ubicacion: "", descripcion: "", latitud: "", longitud: "" });
    } else {
      await addDoc(collection(dbFirebase, "edificios"), edificioData);
      reset();
    }
    handleGet();
  } catch (error) {
    console.log(error);
  }
};

  // Obtener
  const handleGet = async () => {
    const snapshot = await getDocs(collection(dbFirebase, "edificios"));
    const documentos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setEdificios(documentos);
  };

  // Eliminar
  const handleDelete = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este edificio?");
    if (confirmar) {
      const edificioDoc = doc(dbFirebase, "edificios", id);
      await deleteDoc(edificioDoc);
      handleGet();
    }
  };

  // Editar
  const handleEdit = (edificio) => {
  setId(edificio.id);
  reset({
    nombre: edificio.nombre,
    imagen: edificio.imagen,
    ubicacion: edificio.ubicacion,
    descripcion: edificio.descripcion,
    latitud: edificio.coords ? edificio.coords[0] : "",
    longitud: edificio.coords ? edificio.coords[1] : ""
  });
};

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Formulario */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="text-xl font-bold mb-2">{id ? "Editar Facultad/Edificio" : "Crear Facultad/Edificio"}</h4>
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre:</label>
            <input type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Nombre de la facultad/edificio"
              {...register("nombre", { required: true })}
            />
            {errors.nombre && <span className="text-red-500 text-sm">El nombre es requerido</span>}
          </div>

          <div>
            <label className="block font-medium">Imagen:</label>
            <input type="url"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="URL de la imagen"
              {...register("imagen", { required: true })}
            />
            {errors.imagen && <span className="text-red-500 text-sm">La imagen es requerida</span>}
          </div>

          <div className="flex gap-4">
                <div className="flex-1">
                <label className="block font-medium">Latitud:</label>
                <input
                    type="number"
                    step="any"
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Latitud"
                    {...register("latitud", { required: true })}
                />
                {errors.latitud && <span className="text-red-500 text-sm">La latitud es requerida</span>}
                </div>
                <div className="flex-1">
                <label className="block font-medium">Longitud:</label>
                <input
                    type="number"
                    step="any"
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Longitud"
                    {...register("longitud", { required: true })}
                />
                {errors.longitud && <span className="text-red-500 text-sm">La longitud es requerida</span>}
                </div>
            </div>

          <div>
            <label className="block font-medium">Descripción:</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Descripción"
              {...register("descripcion", { required: true })}
            ></textarea>
            {errors.descripcion && <span className="text-red-500 text-sm">La descripción es requerida</span>}
          </div>

          <input type="submit"
            value={id ? "Actualizar" : "Guardar"}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          />
        </form>
      </div>

      {/* Lista */}
      <div>
        <h4 className="text-xl font-bold mb-2">Lista de Facultades/Edificios</h4>
        {edificios.length === 0 && (
          <div className="bg-yellow-100 p-4 rounded text-center text-yellow-700">
            No existen registros...
          </div>
        )}

        <div className="space-y-4">
          {edificios.map((edificio) => (
            <div key={edificio.id} className="bg-white p-4 rounded-xl shadow-md flex gap-4">
              <img src={edificio.imagen} alt="edificio"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <p className="font-semibold">Nombre: <span className="font-normal">{edificio.nombre}</span></p>
                <p className="font-semibold">Ubicación: <span className="font-normal">{edificio.ubicacion}</span></p>
                <p className="font-semibold">Descripción: <span className="font-normal">{edificio.descripcion}</span></p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    onClick={() => handleEdit(edificio)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(edificio.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="map-container col-span-1 md:col-span-2 -mt-40"> 
        {/* Mapa */}
        <div className="col-span-1 md:col-span-2 flex justify-center items-center -mt-40">
          <div id="map" className="map-leaflet w-full h-[400px] rounded-xl shadow-md"></div>
        </div>
      </div>
    </section>
  );
}

export default EdificiosCrud;