import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { Button } from "react-bootstrap";

const NavbarC = () => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const usuarioLogueadoRol = JSON.parse(sessionStorage.getItem("rol"));

  const cerrarSesion = (ev) => {
    ev.preventDefault();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("idUsuario");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <Navbar expand="lg" className="body-tertiary">
        <Container>
          <NavLink
            className={"nav-link"}
            to={
              token && usuarioLogueadoRol === "usuario"
                ? "/usuario"
                : token && usuarioLogueadoRol === "admin"
                ? "/admin"
                : "/"
            }
          >
            <img src="/logo3.jpeg" alt="Logo" style={{ width: "130px" }} />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {token && usuarioLogueadoRol === "usuario" ? (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="/usuario">
                  Inicio
                </NavLink>
                <NavLink className="nav-link" to="/usuario/carrito">
                  Carrito
                </NavLink>
                <NavLink className="nav-link" to="/usuario/mascotas">
                  Mascotas
                </NavLink>
                <NavLink className="nav-link" to="/usuario/turnos">
                  Turnos
                </NavLink>
              </Nav>
            ) : token && usuarioLogueadoRol === "admin" ? (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="/admin">
                  Inicio
                </NavLink>
                <NavLink className="nav-link" to="/admin/pacientes">
                  Panel de Pacientes
                </NavLink>
                <NavLink className="nav-link" to="/admin/productos">
                  Panel de Productos
                </NavLink>
                <NavLink className="nav-link" to="/admin/turnos">
                  Panel de Turnos
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="/">
                  Inicio
                </NavLink>
                <NavLink className="nav-link" to="/contacto">
                  Contacto
                </NavLink>
                <NavLink className="nav-link" to="/acercaDeNosotros">
                  Acerca de Nosotros
                </NavLink>
              </Nav>
            )}

            {token && usuarioLogueadoRol === "usuario" ? (
              <Nav className="ms-auto d-flex align-items-center gap-3">
                <Button
                  variant="primary"
                  as={NavLink}
                  to="/usuario/reservarTurnos"
                >
                  Reservar turno
                </Button>
                <NavLink className="nav-link" to="#" onClick={cerrarSesion}>
                  Cerrar Sesión
                </NavLink>
              </Nav>
            ) : token && usuarioLogueadoRol === "admin" ? (
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="#" onClick={cerrarSesion}>
                  Cerrar Sesión
                </NavLink>
              </Nav>
            ) : (
              <>
                <Nav className="ms-auto">
                  <NavLink className="nav-link" to="/iniciarSesion">
                    Iniciar Sesión
                  </NavLink>
                  <NavLink className="nav-link" to="/registrarse">
                    Registrarse
                  </NavLink>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
