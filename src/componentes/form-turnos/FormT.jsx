import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios, {
  configHeader,
} from "../../funciones_auxiliares/configAxios";
import Swal from "sweetalert2";

const FormT = () => {
  const [errores, setErrores] = useState({});
  const [turnos, setTurnos] = useState({
    detalle: "",
    veterinario: "",
    mascota: "",
    fecha: "",
    hora: "",
  });

  const handleOnClickMandarDatosTurno = async (ev) => {
    ev.preventDefault();
    try {
      const erroresTurnos = {};
      const { detalle, veterinario, mascota, fecha, hora } = turnos;
      if (!detalle) {
        erroresTurnos.detalle = "Campo DETALLE vacío";
      }
      if (!veterinario) {
        erroresTurnos.veterinario = "Campo VETERINARIO vacío";
      }
      if (!mascota) {
        erroresTurnos.mascota = "Campo MASCOTA vacío";
      }
      if (!fecha) {
        erroresTurnos.fecha = "Campo FECHA vacío";
      }
      if (!hora) {
        erroresTurnos.hora = "Campo HORA vacío";
      }
      setErrores(erroresTurnos);
      if (detalle && veterinario && mascota && fecha && hora) {
        const crearTruno = await clienteAxios.post(
          "/turnos",
          {
            detalle,
            veterinario,
            mascota,
            fecha,
            hora,
          },
          configHeader
        );
        Swal.fire({
          title: `${crearTruno.data.msg}`,
          text: "¡Turno creado con éxito!",
          icon: "success",
        });
        setTurnos({
          detalle: "",
          veterinario: "",
          mascota: "",
          fecha: "",
          hora: "",
        });
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      swal.fire({
        icon: "error",
        title: "Error al crear turno",
        text:
          error.response?.data?.msg ||
          "Revisá los campos o contactá al administrador.",
      });
    }
  };

  const handleOnChangeDatosFormulario = async (ev) => {
    setTurnos({ ...turnos, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicDetail">
          <Form.Label>Razón del turno</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escriba su inquietud"
            name="detalle"
            onChange={handleOnChangeDatosFormulario}
            value={turnos.detalle}
            className={
              errores.detalle ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDoctor">
          <Form.Label>Veterinario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escriba su veterinario"
            name="veterinario"
            onChange={handleOnChangeDatosFormulario}
            value={turnos.veterinario}
            className={
              errores.veterinario ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPet">
          <Form.Label>Mascota</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de la mascota"
            name="mascota"
            onChange={handleOnChangeDatosFormulario}
            value={turnos.mascota}
            className={
              errores.mascota ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="text"
            placeholder="Seleccione la fecha"
            name="fecha"
            onChange={handleOnChangeDatosFormulario}
            value={turnos.fecha}
            className={
              errores.fecha ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPet">
          <Form.Label>Hora</Form.Label>
          <Form.Control
            type="text"
            placeholder="seleccione la hora"
            name="hora"
            onChange={handleOnChangeDatosFormulario}
            value={turnos.hora}
            className={
              errores.hora ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>
        <Container className="text-center">
          <Button
            variant="primary"
            type="submit"
            onClick={handleOnClickMandarDatosTurno}
          >
            Enviar datos
          </Button>
        </Container>
      </Form>
    </>
  );
};

export default FormT;
