import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import clienteAxios from "../funciones_auxiliares/configAxios";
import Swal from "sweetalert2";

const AdminEditarTurnos = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const dia = new Date(fecha).getDay();
    return dia !== 0 && dia !== 6;
  };

  const veterinariosPermitidos = ["Dr. Pérez", "Dra. Gómez"];

  const [errores, setErrores] = useState({});
  const [turnos, setTurnos] = useState({
    detalle: "",
    veterinario: "",
    mascota: "",
    fecha: "",
    hora: "",
  });

  useEffect(() => {
    const obtenerTurno = async () => {
      try {
        const respuesta = await clienteAxios.get(`/turnos/${id}`);
        console.log(respuesta.data);
        const turno = respuesta.data.msg;

        const fechaString = new Date(turno.fecha).toISOString().split("T")[0];

        const horaLocal = new Date(turno.hora);
        const horaString = horaLocal
          .toLocaleTimeString("es-AR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
          .slice(0, 5);

        setTurnos({
          detalle: turno.detalle,
          veterinario: turno.veterinario,
          mascota: turno.mascota,
          fecha: fechaString,
          hora: horaString,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el turno.",
        });
      }
    };

    obtenerTurno();
  }, [id]);

  const handleOnChangeDatosFormulario = (ev) => {
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

  const handleActualizarTurno = async (ev) => {
    ev.preventDefault();
    const { detalle, veterinario, mascota, fecha, hora } = turnos;
    const erroresTurnos = {};

    if (!detalle) erroresTurnos.detalle = "Campo DETALLE vacío";
    if (!veterinario) erroresTurnos.veterinario = "Campo VETERINARIO vacío";
    else if (!veterinariosPermitidos.includes(veterinario))
      erroresTurnos.veterinario = "Veterinario no válido";
    if (!mascota) erroresTurnos.mascota = "Campo MASCOTA vacío";
    if (!fecha) erroresTurnos.fecha = "Campo FECHA vacío";
    else if (!validarFecha(fecha)) erroresTurnos.fecha = "Fecha inválida";
    if (!hora) erroresTurnos.hora = "Campo HORA vacío";

    setErrores(erroresTurnos);

    if (Object.keys(erroresTurnos).length === 0) {
      try {
        const datos = {
          detalle,
          veterinario,
          mascota,
          fecha,
          hora,
        };

        console.log("Enviando datos actualización:", datos);

        await clienteAxios.put(`/turnos/${id}`, datos);

        Swal.fire({
          icon: "success",
          title: "Turno actualizado",
          text: "El turno fue actualizado correctamente",
        });
        navigate("/admin/turnos");
      } catch (error) {
        console.error("Error al actualizar turno:", error);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: error.response?.data?.msg || "Ocurrió un error inesperado",
        });
      }
    }
  };

  return (
    <Container className="w-25 my-5">
      <Form onSubmit={handleActualizarTurno}>
        <Form.Group className="mb-3">
          <Form.Label>Razón del turno</Form.Label>
          <Form.Control
            type="text"
            name="detalle"
            value={turnos.detalle}
            onChange={handleOnChangeDatosFormulario}
            className={
              errores.detalle ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Veterinario</Form.Label>
          <Form.Select
            name="veterinario"
            value={turnos.veterinario}
            onChange={handleOnChangeDatosFormulario}
            className={
              errores.veterinario ? "form-control is-invalid" : "form-control"
            }
          >
            <option value="">Selecciona un veterinario</option>
            {veterinariosPermitidos.map((vet) => (
              <option key={vet} value={vet}>
                {vet}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mascota</Form.Label>
          <Form.Control
            type="text"
            name="mascota"
            value={turnos.mascota}
            onChange={handleOnChangeDatosFormulario}
            className={
              errores.mascota ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            name="fecha"
            value={turnos.fecha}
            onChange={handleOnChangeDatosFormulario}
            min={new Date().toISOString().split("T")[0]}
            className={
              errores.fecha ? "form-control is-invalid" : "form-control"
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hora</Form.Label>
          <Form.Select
            name="hora"
            value={turnos.hora || ""}
            onChange={handleOnChangeDatosFormulario}
            className={
              errores.hora ? "form-control is-invalid" : "form-control"
            }
          >
            <option value="">Selecciona una hora</option>
            {horasPermitidas.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Container className="text-center">
          <Button variant="warning" type="submit">
            Actualizar turno
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default AdminEditarTurnos;
