import { useState } from "react";
import "./RecuperarContrasena.css";
import clienteAxios from "../funciones_auxiliares/configAxios";
import { Button, Container, Form } from "react-bootstrap";

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
    <>
      <Container className="my-5 d-flex justify-content-center">
        <div className="form-recuperar">
          <Form>
            <Form.Group className="mb-3" controlId="idEmail">
              <Form.Label>Ingresa tu Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="emailUsuario"
                className="input-recuperar"
                onChange={(ev) => setEmailUsuario(ev.target.value)}
              />
              <Button
                className="mt-3 boton-recuperar"
                onClick={handleClickFormRecuperarContrasenia}
              >
                Enviar Correo
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default RecuperarContraseniaEmail;
