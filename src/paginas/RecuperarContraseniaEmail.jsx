import { useState } from "react";
import Swal from "sweetalert2";
import "./RecuperarContrasena.css";
import clienteAxios from "../funciones_auxiliares/configAxios";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";

const RecuperarContraseniaEmail = () => {
  const [emailUsuario, setEmailUsuario] = useState("");
  const [error, setError] = useState(false);

  const handleClickFormRecuperarContrasenia = async (ev) => {
    ev.preventDefault();

    if (!emailUsuario) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const res = await clienteAxios.post("/usuarios/recoveryPassEmail", {
        emailUsuario,
      });

      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: res.data.msg,
        confirmButtonColor: "#3085d6",
      });

      setEmailUsuario("");
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar el correo. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <div className="formc-container form-recuperar">
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>
        <Form>
          <Form.Group className="mb-3" controlId="idEmail">
            <Form.Label className="formc-label">Ingresa tu Email</Form.Label>
            <InputGroup>
              <InputGroup.Text className="icon-input">
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="emailUsuario"
                className={`form-control ${error ? "input-error" : ""}`}
                value={emailUsuario}
                onChange={(ev) => setEmailUsuario(ev.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Button
            className="mt-3 btn-success formc-btn"
            onClick={handleClickFormRecuperarContrasenia}
          >
            Enviar Correo
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RecuperarContraseniaEmail;
