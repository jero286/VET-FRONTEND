import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router';
import "./navbar.css"

const NavbarC = () => {
  return (
    <>
    <Navbar expand="lg" className="body-tertiary">
      <Container>
           <NavLink className={"nav-link"} to={"/"}>
            <img src="/logo3.jpeg" alt="Logo" style={{width: '99px'}} />
            </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className={"nav-link"} to="/">Inicio</NavLink>
            <NavLink className={"nav-link"} to="/contacto">Contacto</NavLink>
            <NavLink className={"nav-link"} to="/acercaDeNosotros">Acerca de Nosotros</NavLink>
          </Nav>
          <Nav className="ms-auto">
            <NavLink className={"nav-link"} to="/iniciarSesion">Iniciar Sesion</NavLink>
            <NavLink className={"nav-link"} to="/registrarse">Registrarse</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavbarC