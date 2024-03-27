import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from "react-router-dom"

export default function Nav_2({login, setLogin, user_name, setUserName }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        
        <Navbar.Brand>Menu Principal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link as={Link} to="/"> Inicio </Nav.Link>
            {login &&
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            }
            
            <NavDropdown title="Usuarios" id="basic-nav-dropdown">
              {!login &&
              <>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/registrar">Registrarse</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </NavDropdown.Item>
              </>
              }
              
              {login &&
              <NavDropdown.Item>
                <Nav.Link onClick={()=>{
                    setLogin(false)
                    setUserName('')
                  }}>Cerrar sesión
                </Nav.Link>
                
              </NavDropdown.Item>
              }
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        {login &&
          <>
            <i className="bi bi-person-circle"></i><h5>{user_name}</h5>
          </>          
        }
      </Container>
    </Navbar>
  );
}

