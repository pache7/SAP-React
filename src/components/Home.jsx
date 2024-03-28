import React from 'react';
import { Carousel, Button,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '-50px' }}>
            <h1>Bienvenido...</h1>
           
          
            <br/>
            <div>
                <Link to="/login">
                    <Button variant="primary" className="m-2">Iniciar sesión</Button>
                </Link>
                <Link to="/registrar">
                    <Button variant="secondary" className="m-2">Registrarse</Button>
                </Link>
            </div>

        </div>
    );
}

export default Home;
