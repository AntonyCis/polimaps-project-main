import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../styles/Memes.css'; 

const Memes = () => {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setMemes(data.data.memes.slice(0, 20)); 
                }
            })
            .catch(error => console.error("Error al obtener memes:", error));
    }, []);

    return (
        <>
        <section id="memes" className="memes__section">
            <h2 className="memes__title">Galería de Memes</h2>
            <div className="memes__grid">
                {memes.map(meme => (
                    <div key={meme.id} className="meme__card">
                        <img src={meme.url} alt={meme.name} className="meme__image" />
                        <p className="meme__name">{meme.name}</p>
                    </div>
                ))}
            </div>
        </section>
        <Link to="/"><button>Volver a la página principal</button></Link>
        </>
    );
};

export default Memes;