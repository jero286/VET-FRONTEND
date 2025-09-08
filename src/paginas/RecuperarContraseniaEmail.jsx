import { useState } from "react";
import "./RecuperarContrasena.css";
import clienteAxios from "../funciones_auxiliares/configAxios";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";

const RecuperarContraseniaEmail = () => {
  const [emailUsuario, setEmailUsuario] = useState("");

  const handleClickFormRecuperarContrasenia = async (ev) => {
    ev.preventDefault();
    try {
      const res = await clienteAxios.post("/usuarios/recoveryPassEmail", {
        emailUsuario,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
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
                className="form-control"
                onChange={(ev) => setEmailUsuario(ev.target.value)}
              />
            </InputGroup>
            <Button
              className="mt-3 btn-success formc-btn"
              onClick={handleClickFormRecuperarContrasenia}
            >
              Enviar Correo
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default RecuperarContraseniaEmail;
