import { useForm } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { AlertNavigation } from '../template/AlertNavigation';
import ButtonLoading from '../template/ButtonLoading';
import { fireLogin } from '../../services/authServices';
import { errorMessage } from '../../Utils/errorMessaje';
import Card from 'react-bootstrap/Card';

export default function Login({setLogin, setUserName}) {

    const { register ,handleSubmit, formState: {errors} } = useForm({mode:"onChange"});
    const [alert, setAlert] = useState({variant:'',text:'',duration:0,link:''});
    const [loading,setLoading] = useState(false);

    const onSubmit = async (data)=>{

        setLoading(true);
        try{
            const responseLogin = await fireLogin(data);

            setUserName(`${responseLogin?.apellido} ${responseLogin?.nombre}`);
            setAlert({
                variant: "success",
                text: `Bienvenido ${responseLogin?.apellido} ${responseLogin?.nombre}!`,
                duration: 3000,
                link: '/productos'
            })
            setLoading(false);
            setLogin(true);
            console.log('responseLogin')
            console.log(responseLogin)
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
    <div className="row">

        <div className='col-6'>

        <Card style={{ width: '18rem' }}>            
            <Card.Img variant="top" className='mt-3' style={{ width: '50px', margin: 'auto' }} 
                src='src\assets\img\user_icon.jpg' 
            />
            <Card.Body>
                <Card.Title> Iniciar Sesión</Card.Title>
                <Form onSubmit={ handleSubmit(onSubmit) }>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password",{ required: true })} />
                    </Form.Group>

                    <ButtonLoading variant="primary" type="submit" loading={loading}>
                        Login
                    </ButtonLoading>
                </Form>
            </Card.Body>
        </Card>


        <br></br>
        <AlertNavigation {...alert} />
        </div>
    </div>
  );
}