import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { useEffect, useState, lazy, Suspense } from 'react';
import AOS from 'aos';
import { authFirebase } from './firebase';

// Carga diferida de todos los componentes de página
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Agendador = lazy(() => import('./pages/Agendador'));
const Memes = lazy(() => import('./pages/Memes'));
const Docente = lazy(() => import('./pages/Docente'));
const MapComponent = lazy(() => import('./pages/map'));

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authFirebase.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user.email} /> : <Navigate to="/login" />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="memes" element={<Memes />} />
          <Route path="/agendador" element={<Agendador />} />
          <Route path="/docente" element={<Docente />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;