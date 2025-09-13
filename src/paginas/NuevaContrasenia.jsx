import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import clienteAxios from "../funciones_auxiliares/configAxios";
import "./nuevaContrasenia.css";

const NuevaContrasenia = () => {
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [confirmarNuevaContrasenia, setConfirmarNuevaContrasenia] =
    useState("");
  const [error, setError] = useState(false);
  const token = new URLSearchParams(window.location.search)
    .get("token")
    ?.trim();

  const handleClickFormNuevaContrasenia = async (ev) => {
    ev.preventDefault();

    if (!nuevaContrasenia || !confirmarNuevaContrasenia) {
      setError(true);
      return;
    }

    if (nuevaContrasenia !== confirmarNuevaContrasenia) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setError(false);

    try {
      const res = await clienteAxios.post(
        `/usuarios/changeNewPassUser?token=${token}`,
        { contrasenia: nuevaContrasenia }
      );

      Swal.fire({
        icon: "success",
        title: "Contraseña restablecida",
        text: res.data.msg || "La contraseña se cambió exitosamente",
        confirmButtonColor: "#3085d6",
      });

      setNuevaContrasenia("");
      setConfirmarNuevaContrasenia("");
    } catch (error) {
      const serverMessage =
        error.response?.data?.error || error.response?.data?.msg;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "❌ El enlace expiró o es inválido.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/d7/2d/23/d72d236e94f257af28b37f792e71a177.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Container className="my-5 d-flex justify-content-center">
        <div className="formc-container form-recuperar">
          <h2 className="text-center mb-4">Restablecer Contraseña</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nueva Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Ingrese nueva contraseña"
                  className={`form-control input-recuperar ${
                    error ? "input-error" : ""
                  }`}
                  value={nuevaContrasenia}
                  onChange={(ev) => setNuevaContrasenia(ev.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Repetir Nueva Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Confirme su contraseña"
                  className={`form-control input-recuperar ${
                    error ? "input-error" : ""
                  }`}
                  value={confirmarNuevaContrasenia}
                  onChange={(ev) =>
                    setConfirmarNuevaContrasenia(ev.target.value)
                  }
                />
              </InputGroup>
            </Form.Group>

            <Container className="text-center">
              <Button
                className="mt-3 btn-success formc-btn"
                onClick={handleClickFormNuevaContrasenia}
              >
                Restablecer Contraseña
              </Button>
            </Container>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default NuevaContrasenia;
