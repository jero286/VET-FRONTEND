import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

const NavbarC = () => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const usuarioLogueadoRol = JSON.parse(sessionStorage.getItem("rol"));

  const cerrarSesion = (ev) => {
    ev.preventDefault();
    sessionStorage.clear();
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <Navbar expand="lg" className="body-tertiary" collapseOnSelect>
      <Container>
        <NavLink
          className="navbar-brand navbar-brand-logo"
          to={
            token && usuarioLogueadoRol === "usuario"
              ? "/usuario"
              : token && usuarioLogueadoRol === "admin"
              ? "/admin"
              : "/"
          }
        >
          <img src="/logo3.jpeg" alt="Logo" className="logo-img" />
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-main mx-auto">
            {token && usuarioLogueadoRol === "usuario" ? (
              <>
                <NavLink className="nav-link" to="/usuario">
                  Inicio
                </NavLink>
                <NavLink className="nav-link" to="/usuario/carrito">
                  Carrito
                </NavLink>
                <NavLink className="nav-link" to="/usuario/turnos">
                  Turnos
                </NavLink>
              </>
            ) : token && usuarioLogueadoRol === "admin" ? (
              <>
                <NavLink className="nav-link" to="/admin">
                  Inicio
                </NavLink>
                <NavLink className="nav-link" to="/admin/pacientes">
                  Pacientes
                </NavLink>
                <NavLink className="nav-link" to="/admin/productos">
                  Productos
                </NavLink>
                <NavLink className="nav-link" to="/admin/turnos">
                  Turnos
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/">
                  Inicio
                </NavLink>
                <NavLink className="nav-link" to="/contacto">
                  Contacto
                </NavLink>
                <NavLink className="nav-link" to="/acercaDeNosotros">
                  Acerca de Nosotros
                </NavLink>
              </>
            )}
          </Nav>

          <div className="actions-wrapper">
            {token && usuarioLogueadoRol === "usuario" ? (
              <>
                <NavLink to="/usuario/reservarTurnos" className="btn-reservar">
                  Reservar turno
                </NavLink>
                <NavLink
                  className="nav-link action-link"
                  to="#"
                  onClick={cerrarSesion}
                >
                  Cerrar Sesión
                </NavLink>
              </>
            ) : token && usuarioLogueadoRol === "admin" ? (
              <NavLink
                className="nav-link action-link"
                to="#"
                onClick={cerrarSesion}
              >
                Cerrar Sesión
              </NavLink>
            ) : (
              <>
                <NavLink className="btn-outline-custom" to="/iniciarSesion">
                  Iniciar Sesión
                </NavLink>
                <NavLink className="btn-outline-custom" to="/registrarse">
                  Registrarse
                </NavLink>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;
