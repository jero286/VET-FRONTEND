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
    telefono:"",
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
        telefono,
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
      if (!telefono) {
        erroresFormulario.telefono = "Campo TELEFONO está vacío"
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
        telefono&&
        contrasenia &&
        repContrasenia &&
        terminosYCondiciones
      ) {
        if (contrasenia === repContrasenia) {
          const usuarioRegistrado = await clienteAxios.post(
            "/usuarios",
            {
              nombreUsuario,
              email,
              contrasenia,
              telefono
            },
            configHeader
          );
          swal.fire({
            title: `${usuarioRegistrado.data.msg}`,
            text: "¡En breve recibiras un email de confirmación!",
            icon: "success",
          });
          setRegistro({
            nombreUsuario: "",
            email: "",
            telefono:"",
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
      console.log(error.response?.data || error.message);
      swal.fire({
        icon: "error",
        title: "Error al registrar",
        text:
          error.response?.data?.msg ||
          "Revisá los campos o contactá al administrador.",
      });
    }
  };

  const handleChangeDatosRegistro = (ev) => {
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setRegistro({ ...registro, [ev.target.name]: value });
  };

  const handleChangeDatosLogeo = (ev) => {
    setLogin({ ...login, [ev.target.name]: ev.target.value });
  };

  const handleClickBotonLogueo = async (ev) => {
    try {
      ev.preventDefault();
      const erroresLogin = {};
      const { nombreUsuario, contrasenia } = login;
      if (!nombreUsuario) {
        erroresLogin.nombreUsuario = "Campo USUARIO vacío";
      }
      if (!contrasenia) {
        erroresLogin.contrasenia = "Campo CONTRASEÑA vacío";
      }
      setErrores(erroresLogin);
      if (nombreUsuario && contrasenia) {
        const usuarioLogueado = await clienteAxios.post(
          "/login",
          {
            nombreUsuario,
            contrasenia,
          },
          configHeader
        );
        sessionStorage.setItem(
          "token",
          JSON.stringify(usuarioLogueado.data.token)
        );
        sessionStorage.setItem("rol", JSON.stringify(usuarioLogueado.data.rol));
        swal.fire({
          title: `${usuarioLogueado.data.msg}`,
          icon: "success",
        });

        setLogin({
          nombreUsuario: "",
          contrasenia: "",
        });

        if (usuarioLogueado.data.rol === "usuario") {
          setTimeout(() => {
            navigate("/panelUsario");
          }, 1000);
        } else {
          navigate("/panelAdmin");
        }
      } else {
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
            className={
              errores.nombreUsuario ? "form-control is-invalid" : "form-control"
            }
            value={
              idPage === "registro"
                ? registro.nombreUsuario
                : login.nombreUsuario
            }
            onChange={
              idPage === "registro"
                ? handleChangeDatosRegistro
                : handleChangeDatosLogeo
            }
          />
          {errores.nombreUsuario && (
            <p className="text-danger">{errores.nombreUsuario}</p>
          )}
        </Form.Group>
        {idPage === "registro" && (
          <Form.Group className="mb-3" controlId="idEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              name="email"
              className={
                errores.email ? "form-control is-invalid" : "form-control"
              }
              value={registro.email}
              onChange={handleChangeDatosRegistro}
            />
            {errores.email && <p className="text-danger">{errores.email}</p>}
          </Form.Group>
        )}
        {idPage === "registro" && (
          <Form.Group className="mb-3" controlId="idEmail">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su telefono"
              name="telefono"
              className={
                errores.telefono ? "form-control is-invalid" : "form-control"
              }
              value={registro.telefono}
              onChange={handleChangeDatosRegistro}
            />
            {errores.telefono && <p className="text-danger">{errores.telefono}</p>}
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="idContrasenia">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            name="contrasenia"
            className={
              errores.contrasenia ? "form-control is-invalid" : "form-control"
            }
            value={
              idPage === "registro" ? registro.contrasenia : login.contrasenia
            }
            onChange={
              idPage === "registro"
                ? handleChangeDatosRegistro
                : handleChangeDatosLogeo
            }
          />
          {errores.contrasenia && (
            <p className="text-danger">{errores.contrasenia}</p>
          )}
        </Form.Group>
        {idPage === "registro" && (
          <Form.Group className="mb-3" controlId="idRepContrasenia">
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Vuelva a ingresar su contrasenia"
              name="repContrasenia"
              className={
                errores.repContrasenia
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={registro.repContrasenia}
              onChange={handleChangeDatosRegistro}
            />
            {errores.repContrasenia && (
              <p className="text-danger">{errores.repContrasenia}</p>
            )}
          </Form.Group>
        )}
        {idPage === "registro" && (
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Aceptar terminos y condiciones"
              name="terminosYCondiciones"
              onChange={handleChangeDatosRegistro}
              value={registro.terminosYCondiciones}
            />
            {errores.terminosYCondiciones && (
              <p className="text-danger">{errores.terminosYCondiciones}</p>
            )}
          </Form.Group>
        )}
        {idPage === "inicioSesion" && (
          <p>
            Si olvidaste tu contraseña, haz click
            <Link to={"/recuperarContraseña"}>aquí</Link>
          </p>
        )}
        <Container className="text-center">
          <Button
            variant="primary"
            type="submit"
            onClick={
              idPage === "registro"
                ? handleClickDelBotonParaRegistro
                : handleClickBotonLogueo
            }
          >
            {idPage === "registro" ? "Enviar datos" : "Ingresar"}
          </Button>
        </Container>
      </Form>
    </>
  );
};

export default FormC;
