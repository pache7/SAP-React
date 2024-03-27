import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"
import { AlertNavigation } from './template/AlertNavigation';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import * as mp_services from '../services/avatarServices'

import Carousel from 'react-bootstrap/Carousel';

export default function Home({login, setLogin}){
    
    const [prod_carrusel, setProductosCarrusel] = useState([])
    const [loading, setLoading] = useState(true)
    const [symMoneda, setSymboloMoneda] = useState('')
    const [alert, setAlert] = useState({variant:'',text:'',duration:0,link:''});

    useEffect(()=>{

        const allProductos = async ()=>{
            try{
                const response = await mp_services.getAll()              
                
                const productos = response.results;
                const randomProducts  = productos.slice().sort(() => Math.random() - 0.5)            
                const top10_productos = randomProducts.slice(0, 10);

                setProductosCarrusel(top10_productos)
                setLoading(false)                 
        
            }catch(e){
                setAlert({
                    variant: "danger",
                    text: "Ooops... Ha ocurrido un error",
                    duration: 0
                })
            }
        }

        const pagosDisponibles = async ()=>{
            try{
                const response = await mp_services.getMonedasDisponiblesMp()
                const arg_moneda = response.find(e => e.id == 'ARS');
                setSymboloMoneda(arg_moneda.symbol)
            }catch(e){
                setAlert({
                    variant: "danger",
                    text: "Ooops... Ha ocurrido un error",
                    duration: 0
                })
            }
        }

        pagosDisponibles()
        allProductos()
    },[]);

    if(loading){
        return <>
            <div className="mt-5 pt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </>
    }else{
        return(
            <>            
                <div className="row">
                    <div className='col-6'>
                        <Carousel data-bs-theme="dark">
                        {prod_carrusel.map((product, index) => (
                            <Carousel.Item key={index}>

                                <img className="d-block w-100" src={product.thumbnail} alt={`Product ${index}`}/>

                                <Carousel.Caption>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={product.thumbnail} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>{product.description}</Card.Text>
                                            <Card.Text>{symMoneda} {product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Carousel.Caption>

                            </Carousel.Item>
                        ))}
                        </Carousel>
                        <AlertNavigation {...alert} />
                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-center text-center flex-column'>
                        <h2>¡Ofertas de la semana!</h2>
                        <h5>¡No te pierdas estas increíbles ofertas!</h5>
                        <p>Descubre una variedad de productos a precios especiales</p>
                        {!login &&
                        <>
                            <Link to="/login" className="w-100 mb-1">
                                <Button variant="success" className="w-100">Iniciar sesión</Button>
                            </Link>
                            <Link to="/registrar" className="w-100">
                                <Button variant="dark" className="w-100">Registrarse</Button>
                            </Link>                        
                        </>
                        }
                        {login &&
                            <Link className="w-100 mb-1">
                                <Button variant="dark" className="w-100" 
                                    onClick={()=>setLogin(false)}>
                                    Cerrar sesión
                                </Button>
                            </Link>
                        }
                    </div>
                </div>
                
            </>
        )
    }   
}