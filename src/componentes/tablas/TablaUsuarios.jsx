import Table from "react-bootstrap/Table";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import clienteAxios from "../../funciones_auxiliares/configAxios";

const TablaUsuarios = ({
  idPage,
  idDelUsuarioLog,
  arrayTurnos,
  refreshTurnos,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleCancelar = async (turnoId) => {
    const confirm = await Swal.fire({
      title: "¿Cancelar turno?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
      confirmButtonColor: "#d33",
      reverseButtons: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      setDeletingId(turnoId);
      await clienteAxios.delete(`/turnos/${turnoId}`);

      await Swal.fire({
        title: "Turno cancelado",
        text: "Tu turno fue eliminado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      if (typeof refreshTurnos === "function") {
        refreshTurnos();
      }
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      await Swal.fire({
        title: "Error",
        text: "No se pudo cancelar el turno.",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Mascota</th>
            <th>Veterinario</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {arrayTurnos && arrayTurnos.length > 0 ? (
            arrayTurnos.map((turno, index) => (
              <tr key={turno._id}>
                <td>{index + 1}</td>
                <td>{turno.mascota}</td>
                <td>{turno.veterinario}</td>
                <td>{turno.detalle}</td>
                <td>{new Date(turno.fecha).toLocaleDateString("es-AR")}</td>
                <td>
                  {new Date(turno.hora).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancelar(turno._id)}
                    disabled={deletingId === turno._id}
                  >
                    {deletingId === turno._id ? "Cancelando..." : "Cancelar"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No hay turnos agendados
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TablaUsuarios;
