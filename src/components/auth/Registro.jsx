import { useForm } from 'react-hook-form'
import { useState } from 'react'
import ButtonLoading from '../template/ButtonLoading';
import { Form } from 'react-bootstrap'
import { fireRegister } from '../../services/authServices'
import { errorMessage } from '../../Utils/errorMessaje';

import { AlertNavigation } from '../template/AlertNavigation';

export default function Registro() {
    const { register, handleSubmit, formState: {errors} } = useForm({ mode: "onChange" })
    const [alert, setAlert] = useState({variant:'',text:'',duration:0,link:''});
    const [loading,setLoading] = useState(false)

    const onSubmit = async(data)=>{

        setLoading(true);
        try{
            const response = await fireRegister(data);

            console.log(response)
            setAlert({
                variant: "success",
                text: "El Usuario ha sido creado con éxito",
                duration: 3000,
                link: "/login"
            })
            setLoading(false);
        }catch (e){
            console.log(e)
            setAlert({
                variant: "danger",
                text: errorMessage[e.code] || "Ooops... Ha ocurrido un error",
                duration: 0
            })
            setLoading(false);
        }

    }

  return (    
    <>
    <div className='row' >

        <div className='col-6'>
        <Form onSubmit={ handleSubmit(onSubmit) }>

            <Form.Group className='mb-3'>
                <Form.Label>Apellido</Form.Label>
                <Form.Control type='text' placeholder='Apellido' {...register("apellido", { required: true })}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type='text' placeholder='Nombre' {...register("nombre",{ required: true })}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>DNI</Form.Label>
                <Form.Control type='text' placeholder='DNI' {...register("dni",{ required: true })}/>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type='text' {...register("telefono")}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select {...register("rol")}>
                    <option>Seleccionar</option>
                    <option value="admin">Admin</option>
                    <option value="consulta">Consulta</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="gerente">Gerente</option>
                    <option value="atencion_cliente">Atención al cliente</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Email </Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register("password",{ required: true })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Estoy de acuerdo con las políticas de la empresa" 
                    {...register("acuerdo", { required: true })}/>
            </Form.Group>

            <ButtonLoading variant="primary" type="submit" loading={loading}>
                Registrar
            </ButtonLoading>

        </Form>
        <br></br>
        <AlertNavigation {...alert} />
        </div>

    </div>
    </>

  );
}