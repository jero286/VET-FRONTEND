import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clienteAxios from "../../funciones_auxiliares/configAxios";
import Swal from "sweetalert2";

const FormT = () => {
  const horasPermitidas = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  const validarFecha = (fecha) => {
    const fechaForm = new Date(fecha);
    const dia = fechaForm.getDay();
    return dia !== 0 && dia !== 6;
  };
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
      } else if (!validarFecha(fecha)) {
        erroresTurnos.fecha = "Fecha Inválida";
      }
      if (!hora) {
        erroresTurnos.hora = "Campo HORA vacío";
      }
      setErrores(erroresTurnos);
      if (detalle && veterinario && mascota && fecha && hora) {
        const idUsuario = JSON.parse(sessionStorage.getItem("idUsuario"));
        if (!idUsuario) {
          Swal.fire({
            icon: "error",
            title: "Error interno",
            text: "No se encontró el ID del usuario. Iniciá sesión nuevamente.",
          });
          return;
        }
        const fechaHoraSeleccion = new Date(`${turnos.fecha}T${turnos.hora}`);
        const hoy = new Date();
        const esMismoDia = turnos.fecha === hoy.toISOString().split("T")[0];

        if (esMismoDia && fechaHoraSeleccion.getTime() <= hoy.getTime()) {
          Swal.fire({
            icon: "error",
            title: "Hora inválida",
            text: "No podés elegir una hora pasada en el día de hoy.",
          });
          return;
        }
        const crearTruno = await clienteAxios.post("/turnos", {
          detalle,
          veterinario,
          mascota,
          fecha,
          hora,
          idUsuario,
        });
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
      Swal.fire({
        icon: "error",
        title: "Error al crear turno",
        text:
          error.response?.data?.msg ||
          "Revisá los campos o contactá al administrador.",
      });
    }
  };

  const handleOnChangeDatosFormulario = async (ev) => {
    const { name, value } = ev.target;
    if (name === "fecha" && !validarFecha(value)) {
      setErrores({
        ...errores,
        fecha: "Solo se permiten turnos de lunes a viernes",
      });
    } else {
      setErrores({ ...errores, [name]: "" });
    }
    setTurnos({ ...turnos, [name]: value });
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
            type="date"
            placeholder="Solo de lunes a viernes"
            name="fecha"
            onChange={handleOnChangeDatosFormulario}
            value={turnos.fecha}
            className={
              errores.fecha ? "form-control is-invalid" : "form-control"
            }
            min={new Date().toISOString().split("T")[0]}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicHora">
          <Form.Label>Hora</Form.Label>
          <Form.Select
            name="hora"
            onChange={handleOnChangeDatosFormulario}
            value={turnos.hora}
            className={
              errores.hora ? "form-control is-invalid" : "form-control"
            }
          >
            <option value="">Selecciona una hora</option>
            {horasPermitidas.map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))}
          </Form.Select>
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
