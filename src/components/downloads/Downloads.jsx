import React from 'react'
import './Downloads.css';
import appstore from '../../assets/appstore.png';
import googleplay from '../../assets/googleplay.png';

const Downloads = () => {
    return (
    <section className="downloads" id='map'>
        <div className="downloads__content">
            <h2 className="downloads__title">Descargas</h2>
            <div className="downloads__buttons">
                <a href="#"><img src={appstore} className="ps" alt="PlayStore" loading="lazy"/></a>
                <a href="#"><img src={googleplay} className="gp" alt="GooglePlay" loading="lazy"/></a>
            </div>
        </div>
    </section>
    )
}

export default Downloads