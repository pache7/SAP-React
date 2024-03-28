import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/template/NavBar';
import { useState } from 'react';

//componentes
import Home from './components/Home';
import  PerfilUsuario from './components/usuarios/Usuario';
import UsuariosRegistrados from './components/usuarios/Usuarios';
import Registro from './components/auth/Registro';
import Login from './components/auth/Login';


function App() {

  const [login,setLogin]=useState(false);
  const [user_name,setUserName]=useState(false);
  const [user_apellido,setUserApellido]=useState(false);
  const [user_email,setUserEmail]=useState(false);
  const [user_telefono,setUserTelefono]=useState(false);
  const [userRol,setUserRol]=useState(false);

  return (
    <>
      <Router>
      <NavBar login={login} setLogin={setLogin} user_name={user_name} setUserName={setUserName} user_apellido={user_apellido} setUserApellido={setUserApellido} />
        <br />
        <div className="container">
        <Routes>

          <Route path='/' element={<Home login={login} setLogin={setLogin} />} />

          {login &&
          <>
            <Route path='/usuario' element={< PerfilUsuario user_name={user_name} user_apellido={user_apellido} user_telefono={user_telefono} user_email={user_email} userRol={userRol}  />} />
            <Route path='/usuarios' element={<UsuariosRegistrados />} />
          </>
          }
          <Route path='/registrar' element={<Registro />} />
          <Route path='/login' element={<Login setLogin={setLogin} setUserName={setUserName} setUserApellido={setUserApellido} setUserTelefono={setUserTelefono} setUserEmail={setUserEmail} setUserRol={setUserRol} />} />

        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
