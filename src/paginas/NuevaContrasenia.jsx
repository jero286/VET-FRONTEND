import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import clienteAxios from "../funciones_auxiliares/configAxios";

const NuevaContrasenia = () => {
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [confirmarNuevaContrasenia, setConfirmarNuevaContrasenia] =
    useState("");
  const { token } = new URLSearchParams(location.search).get("token");

  const handleClickFormNuevaContrasenia = async (ev) => {
    ev.preventDefault();
    try {
      if (nuevaContrasenia === confirmarNuevaContrasenia) {
        const res = await clienteAxios.post(
          `/usuarios/changeNewPassUser?token=${token}`,
          { contrasenia: nuevaContrasenia }
        );
      } else {
        alert("Las contraseñas no coinciden");
      }
    } catch (error) {
      setMensaje("❌ El enlace expiró o es inválido.");
    }
  };

  return (
    <>
      <Container className="my-5 w-25">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={(ev) => setNuevaContrasenia(ev.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Repetir Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={(ev) => setConfirmarNuevaContrasenia(ev.target.value)}
            />
          </Form.Group>
          <Container className="text-center">
            <Button
              variant="primary"
              type="submit"
              onClick={handleClickFormNuevaContrasenia}
            >
              Restablecer Contraseña
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default NuevaContrasenia;
