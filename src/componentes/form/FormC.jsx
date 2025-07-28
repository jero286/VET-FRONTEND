import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router";
import clienteAxios from "../../funciones_auxiliares/configAxios";
import { configHeader } from "../../funciones_auxiliares/configAxios";
import swal from "sweetalert2";

const FormC = ({ idPage }) => {
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  const [registro, setRegistro] = useState({
    nombreUsuario: "",
    email: "",
    contrasenia: "",
    repContrasenia: "",
    terminosYCondiciones: false,
  });
  const [login, setLogin] = useState({
    nombreUsuario: "",
    contrasenia: "",
  });

  const handleClickDelBotonParaRegistro = async (ev) => {
    try {
      ev.preventDefault();
      const erroresFormulario = {};
      const {
        nombreUsuario,
        email,
        contrasenia,
        repContrasenia,
        terminosYCondiciones,
      } = registro;
      if (!nombreUsuario) {
        erroresFormulario.nombreUsuario = "Campo USUARIO está vacío";
      }
      if (!email) {
        erroresFormulario.email = "Campo EMAIL está vacío";
      }
      if (!contrasenia) {
        erroresFormulario.contrasenia = "Campo CONTRASEÑA está vacío";
      }
      if (!repContrasenia) {
        erroresFormulario.repContrasenia =
          "Campo REPETIR CONTRASEÑA está vacío";
      }
      if (!terminosYCondiciones) {
        erroresFormulario.terminosYCondiciones =
          "Acepta los terminos y condiciones";
      }
      setErrores(erroresFormulario);
      if (
        nombreUsuario &&
        email &&
        contrasenia &&
        repContrasenia &&
        terminosYCondiciones
      ) {
        if (contrasenia === repContrasenia) {
          const usuario = clienteAxios.post(
            "/usuarios",
            {
              nombreUsuario,
              email,
              contrasenia,
            },
            configHeader
          );
          swal.fire({
            title: `${(await usuario).data.msg}`,
            text: "¡En breve recibiras un email de confirmación!",
            icon: "success",
          });
          setRegistro({
            nombreUsuario: "",
            email: "",
            contrasenia: "",
            repContrasenia: "",
            terminosYCondiciones: false,
          });
          setTimeout(() => {
            navigate("/iniciarSesion");
          }, 1000);
        } else {
          swal.fire({
            icon: "error",
            title: "Las contraseñas no coinciden",
          });
        }
      }
    } catch (error) {
      if (error) {
        swal.fire({
          icon: "error",
          title: "¡Rellena todos los campos!",
        });
      }
    }
  };

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
