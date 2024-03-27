import { Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import './assets/css/App.css'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './components/template/NavBar'
import { useState } from 'react'

import Home from './components/Home'
import Productos from './components/usuarios/Usuarios'
import ShowProducto from './components/usuarios/MostrarUsuarios'
import Registro from './components/auth/Registro'
import Login from './components/auth/Login'


function App() {

  const [login,setLogin]=useState(false);
  const [user_name,setUserName]=useState(false);

  return (
    <>
      <Router>
        <NavBar login={login} setLogin={setLogin} user_name={user_name} setUserName={setUserName} />
        <br />
        <div className="container">
        <Routes>

          <Route path='/' element={<Home login={login} setLogin={setLogin} />} />

          {login &&
          <>
            <Route path='/productos' element={<Productos />} />
            <Route path='/productos/:id_producto' element={<ShowProducto />} />
          </>
          }
          <Route path='/registrar' element={<Registro />} />
          <Route path='/login' element={<Login setLogin={setLogin} setUserName={setUserName} />} />

        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
