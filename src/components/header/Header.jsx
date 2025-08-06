import React from 'react'
import './Header.css';
import 'animate.css';
import Main from '../main/Main';
import { Link } from 'react-router';
import { useState , useEffect} from "react"
import posicion from '../../assets/posicion.png';;

const Header = () => {
    const [menuActive, setMenuActive] = useState(false)
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenu = () => {
        setMenuActive(!menuActive)
    }
    const closeMenu = () => {
        setMenuActive(false)
    }

    useEffect(() => {
    const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false); 
    } else {
        setShowHeader(true); 
    }

    setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`navbar ${showHeader ? 'navbar--show' : 'navbar--hide'}`}>
        <nav className="navbar_container">
            <Link to="/"><h1 className="navbar_logo">
            Pol <img src={posicion} alt="ubicacion-logo" /> Maps
            </h1></Link>

            <ul className={`navbar_menu ${menuActive ? "menu--active" : ""}`}>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/map" onClick={closeMenu}>Map</Link></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            <li><button className='b1'><Link to="/login" onClick={closeMenu}><span className='truncate'>Login</span></Link></button></li>
            <li><button><Link to="/register" onClick={closeMenu}><span className='truncate'>Register</span></Link></button></li>
            </ul>
            

            <div className="header__hamburger" onClick={toggleMenu}>
            <i className="fas fa-bars hamburger"></i>
            </div>
        </nav>
    </header>
    )
}

export default Header