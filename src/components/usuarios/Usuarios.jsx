import { useEffect, useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Producto from './Usuario.jsx'
import * as mp_services from '../../services/avatarServices.js'
import { AlertNavigation } from '../template/AlertNavigation';
import Spinner from 'react-bootstrap/Spinner';


export default function ProductosHome(){
    
    const [alert, setAlert] = useState({variant:'',text:'',duration:0,link:''});
    const [myBusqueda, setMyBusqueda] = useState('Star Wars')
    const [myTitulo, setMyTitulo] = useState(myBusqueda)
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

    const handleButtonBusqueda = async() => {
      setLoading(true);
      try {
        const response = await mp_services.getAll(myBusqueda);
        setProductos(response.results);
        
        setMyTitulo(myBusqueda);
        
        setAlert({
            variant: "success",
            text: "Búsqueda Ok",
            duration: 3000
        }) 
        setLoading(false);
        setTimeout(()=>{
            setAlert({variant:'',text:'',duration:0,link:''})            
        },3000)
        
      } catch {
        setLoading(false);
        setAlert({
            variant: "danger",
            text: "Ooops... Ha ocurrido un error",
            duration: 0
        })
      }
    };

    useEffect(()=>{
        const allProductos = async ()=>{
            try{
                const response = await mp_services.getAll(myBusqueda)              
                
                setProductos(response.results)
                setLoading(false) 
        
            }catch(e){
                setAlert({
                    variant: "danger",
                    text: "Ooops... Ha ocurrido un error",
                    duration: 0
                })
            }
        }
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
                    <InputGroup className="mb-3 mt-3">
                        <FormControl placeholder="Ingrese palabra clave" value={myBusqueda}
                            onChange={(e) => setMyBusqueda(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleButtonBusqueda}>
                            Buscar en MercadoLibre
                        </Button>
                    </InputGroup>
                    <AlertNavigation {...alert} />
                </div>
                
                <h1>{myTitulo}</h1>
                
                <div className="row">
                    {productos.map((producto)=>(                      
                        <Producto 
                            key= { producto.id }
                            id = { producto.id}
                            title= { producto.title }
                            price= { producto.price }
                            address= { producto.address }    
                            thumbnail = { producto.thumbnail }                         
                        />  
                    ))}
                </div>
            </>
        )
    }
}