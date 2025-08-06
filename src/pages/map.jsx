import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/map.css';
import { dbFirebase } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const buildingIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/5352/5352118.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const Map = () => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [facultades, setFacultades] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Obtener facultades/edificios desde Firestore
  useEffect(() => {
    const fetchFacultades = async () => {
      const querySnapshot = await getDocs(collection(dbFirebase, "edificios"));
      const lista = querySnapshot.docs.map(doc => ({
        nombre: doc.data().nombre,
        coords: doc.data().coords,
        ...doc.data()
      }));
      setFacultades(lista);
      setResults(lista);
    };
    fetchFacultades();
  }, []);

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

    // Configuración de geolocalización
    const locateOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      setView: true,
      maxZoom: 18
    };

    function onLocationFound(e) {
      setLocationError(null);
      setUserLocation(e.latlng);
      const radius = e.accuracy / 2;
      
      // Eliminar marcadores y círculos anteriores
      if (window.userLocationMarker) map.removeLayer(window.userLocationMarker);
      if (window.userLocationCircle) map.removeLayer(window.userLocationCircle);

      // Crear nuevos elementos
      window.userLocationMarker = L.marker(e.latlng, { icon: userIcon })
        .addTo(map)
        .bindPopup(`Estás aquí (±${Math.round(radius)} metros)`)
        .openPopup();
      
      window.userLocationCircle = L.circle(e.latlng, radius, {
        color: '#136AEC',
        fillColor: '#136AEC',
        fillOpacity: 0.15
      }).addTo(map);
    }

    function onLocationError(e) {
      console.error('Error de geolocalización:', e.message);
      setLocationError('No se pudo obtener tu ubicación. Asegúrate de haber permitido el acceso a la ubicación.');
      
      L.popup()
        .setLatLng(map.getCenter())
        .setContent('No se pudo obtener tu ubicación')
        .openOn(map);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.locate(locateOptions);

    // Marcadores de facultades
    markersRef.current = facultades.map(facultad =>
      L.marker(facultad.coords, { icon: buildingIcon })
        .addTo(map)
        .bindPopup(facultad.nombre)
    );

    map.on('click', function(e) {
      const { lat, lng } = e.latlng;
      L.popup()
        .setLatLng(e.latlng)
        .setContent(`Coordenadas:<br>Latitud: ${lat}<br>Longitud: ${lng}`)
        .openOn(map);
    });

    return () => {
      map.remove();
    };
  }, [facultades]);

  // Filtrar resultados al escribir
  useEffect(() => {
    setResults(
      facultades.filter(f =>
        f.nombre.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, facultades]);

  const handleSelect = (facultad, idx) => {
    if (mapRef.current && markersRef.current[idx]) {
      mapRef.current.setView(facultad.coords, 18);
      markersRef.current[idx].openPopup();
    }
  };

  return (
    <>
      <Header />
      <div className="map-container">
        {locationError && (
          <div className="location-error-message">
            {locationError}
            <button onClick={() => mapRef.current?.locate()}>
              Reintentar
            </button>
          </div>
        )}
        <div className="map-search">
          <input
            type="text"
            placeholder="Buscar facultad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="map-search-input"
          />
          <ul className="map-search-list">
            {results.map((facultad, idx) => (
              <li key={facultad.nombre} className="map-search-item">
                <button
                  className="map-search-btn"
                  onClick={() => handleSelect(facultad, idx)}
                >
                  {facultad.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div id="map" className="map-leaflet"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Map;