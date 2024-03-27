import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import * as mp_services from '../../services/avatarServices'

export default function ShowProducto(){

    const [loading, setLoading] = useState(true)
    const { id_producto } = useParams();
    const [ myProducto, setProducto ] = useState({})
    const [ myFoto, setFoto] = useState('')
    const [ ciudad, setCiudad] = useState({})
    const [ descrip, setDescrip] = useState('')


    useEffect(()=>{

        const buscarById = async ()=>{
            
            const response = await mp_services.getById(id_producto)
            const res_descrip = await mp_services.getDescriptionById(id_producto)

            setDescrip(res_descrip.plain_text)
            
            setProducto(response)
            setCiudad({
                nombre: response.seller_address.city.name,
                estado: response.seller_address.state.name
            })
            setFoto(response.pictures[0].secure_url)
            setLoading(false)
        }

        buscarById()

    },[id_producto]);

    const comprarProducto = () => {
      alert(`Próximamente acción para comprar artículo: ${myProducto.id}`);
    };

    if(loading){
      return <>
          <div> Cargando... </div>
      </>
    }else{

      return (
        <>
          <div className="row">
            <div className="card mb-3">

              <img src={myFoto} className="card-img-top" alt={myProducto.title} />

              <div className="card-body">

                <h5> { myProducto.title}   </h5>
                <p> { myProducto.warranty} </p>
                <p> { descrip } </p>
                <p> ${ myProducto.price}   </p>
                <p> { ciudad.nombre } - { ciudad.estado } </p>
                <button type="button" className="btn btn-success" onClick={ comprarProducto }>
                  Comprar
                </button>
              </div>

            </div>
          </div>
        </>
      );
    }

}