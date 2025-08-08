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

  // Obtener facultades desde Firestore
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

  // Inicializar mapa
  useEffect(() => {
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const center = [-0.2105, -78.4891]; // Vista inicial
    const map = L.map('map').setView(center, 17);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marcadores de facultades
    markersRef.current = facultades.map(facultad =>
      L.marker(facultad.coords, { icon: buildingIcon })
        .addTo(map)
        .bindPopup(facultad.nombre)
    );

    // Click para ver coordenadas
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

  // Obtener ubicación del usuario con navigator.geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(latlng);
          setLocationError(null);
        },
        error => {
          console.error("Error de geolocalización:", error.message);
          setLocationError("No se pudo obtener tu ubicación.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError("Geolocalización no soportada en este navegador.");
    }
  }, []);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      const map = mapRef.current;

      if (window.userLocationMarker) map.removeLayer(window.userLocationMarker);
      if (window.userLocationCircle) map.removeLayer(window.userLocationCircle);

      window.userLocationMarker = L.marker(userLocation, { icon: userIcon })
        .addTo(map)
        .bindPopup("Estás aquí")
        .openPopup();

      window.userLocationCircle = L.circle(userLocation, {
        color: '#136AEC',
        fillColor: '#136AEC',
        fillOpacity: 0.15,
        radius: 20
      }).addTo(map);

      // Centrar
      map.setView(userLocation, 18);
    }
  }, [userLocation]);

  // Filtrar resultados
  useEffect(() => {
    setResults(
      facultades.filter(f =>
        f.nombre.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, facultades]);

  // Seleccionar edificio
  const handleSelect = (facultad, idx) => {
    if (mapRef.current && markersRef.current[idx]) {
      mapRef.current.setView(facultad.coords, 18);
      let popupContent = `<strong>${facultad.nombre}</strong>`;
      if (userLocation) {
        const distancia = mapRef.current.distance(userLocation, facultad.coords);
        popupContent += `<br>Distancia: ${(distancia / 1000).toFixed(2)} km`;
      }
      markersRef.current[idx].bindPopup(popupContent).openPopup();
    }
  };

  return (
    <>
  <Header />
  {locationError && (
      <div className="location-error-message">
        {locationError}
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    )}
  <div className="map-container">
    

    <div className="map-controls" style={{ maxWidth: '350px', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Buscar facultad / edificio..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="map-search-input"
        style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }}
      />
      <button
        className="btn-my-location"
        style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              pos => {
                const latlng = {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
                };
                setUserLocation(latlng);
              },
              err => console.error(err),
              { enableHighAccuracy: true }
            );
          }
        }}
      >
        📍 Mi ubicación
      </button>

      <ul className="map-search-list" style={{ padding: 0, margin: 0 }}>
        {results.map((facultad, idx) => (
          <li key={facultad.nombre} className="map-search-item" style={{ marginBottom: '0.5rem' }}>
            <button
              className="map-search-btn"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: '#f0f0f0',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onClick={() => handleSelect(facultad, idx)}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#ddd')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            >
              {facultad.nombre}
            </button>
          </li>
        ))}
      </ul>
    </div>

    <div id="map" className="map-leaflet"></div>
  </div>
  <Footer />
</>
  );
};

export default Map;
