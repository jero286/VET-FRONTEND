import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router";
import swal from "sweetalert2";

const FormC = ({ idPage }) => {
  const [errores, setErrores] = useState({});
  const [registro, setRegistro] = useState({});
  const [login, setLogin] = useState({});

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="idUsuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre de usuario"
            name="nombreUsuario"
          />
        </Form.Group>
        {idPage === "registro" && (
          <Form.Group className="mb-3" controlId="idEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              name="email"
            />
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="idContrasenia">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            name="contrasenia"
          />
        </Form.Group>
        {idPage === "registro" && (
          <Form.Group className="mb-3" controlId="idRepContrasenia">
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Vuelva a ingresar su contrasenia"
              name="repContrasenia"
            />
          </Form.Group>
        )}
        {idPage === "registro" && (
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Aceptar terminos y condiciones"
              name="terminosYCondiciones"
            />
          </Form.Group>
        )}
        {idPage === "inicioSesion" && (
          <p>
            Si olvidaste tu contraseña, haz click
            <Link to={"/recuperarContraseña"}>aquí</Link>
          </p>
        )}
        <Container className="text-center">
          <Button variant="primary" type="submit">
            {idPage === "registro" ? "Enviar datos" : "Ingresar"}
          </Button>
        </Container>
      </Form>
    </>
  );
};

export default FormC;
