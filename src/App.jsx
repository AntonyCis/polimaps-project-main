import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import Memes from './pages/Memes';
import { authFirebase } from './firebase'


function App() {

  const [user, setUser] = useState("")
  

  useEffect(() => {
    authFirebase.onAuthStateChanged((user)=>{
      setUser(user)
    })
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user.email}/> : <Navigate to="/login"/>} />
        <Route path="memes" element={<Memes />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App
