import React from 'react'
import About from '../components/about/About'
import Contact from '../components/contact/Contact'
import Downloads from '../components/downloads/Downloads'
import Footer from '../components/footer/Footer'
import Frequent from '../components/frequent/Frequent'
import Gallery from '../components/gallery/Gallery'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Services from '../components/services/Services'

const Landing = () => {
    return (
        <>
        <div data-aos="fade-down">
                <Header />
        </div>
        <div style={{ height: '80px' }}></div>
        <div data-aos="zoom-in" data-aos-duration="1500">
                <Main />
        </div>
        <div data-aos="zoom-in" data-aos-duration="1500">
                <About />
        </div>
        <div data-aos="zoom-in" data-aos-duration="1500">
                <Services />
        </div>
        <div data-aos="zoom-in" data-aos-duration="1500">
                <Downloads />
        </div>
        <div data-aos="zoom-in" data-aos-duration="1500">
                <Gallery />
        </div>
        <div data-aos="zoom-in" data-aos-duration="1500">
                <Frequent />
        </div>
        <div data-aos="zoom-in" data-aos-duration="1500">
                <Contact />
        </div>
        <Footer />
    </>
    )
}

export default Landing