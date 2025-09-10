import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import clienteAxios from "../../funciones_auxiliares/configAxios";
import { Link } from "react-router";

const TablaC = ({
  idPagina,
  array,
  usuarioLogueado,
  obtenerTodosLosUsuarios,
  obtenerTodosLosTurnos,
}) => {
  const filtrarArray =
    idPagina === "usuarios"
      ? array.filter((usuario) => usuario.rolUsuario !== "admin")
      : array;

  const botonEliminarUsuario = (idUsuario) => {
    if (usuarioLogueado) {
      Swal.fire({
        title: "¿Estás seguro de que quieres eliminar a este usuario?",
        text: "Si lo borras no lo podrás recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí!",
        cancelButtonText: "No!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await clienteAxios.delete(`/usuarios/${idUsuario}`);
          if (res.status === 200) {
            Swal.fire({
              title: "Usuario eliminado!",
              icon: "success",
            });
            obtenerTodosLosUsuarios();
          }
        }
      });
    }
  };

  const botonEliminarTurno = (idTurno) => {
    if (usuarioLogueado) {
      Swal.fire({
        title: "¿Estás seguro de que quieres eliminar este turno?",
        text: "¡Si lo borras no lo podrás recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí!",
        cancelButtonText: "¡No!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await clienteAxios.delete(`/turnos/${idTurno}`);
            if (res.status === 200 || res.status === 204) {
              Swal.fire({
                title: "¡Turno eliminado!",
                icon: "success",
              });
              obtenerTodosLosTurnos();
            }
          } catch (error) {
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al intentar eliminar el turno.",
              icon: "error",
            });
          }
        }
      });
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        {idPagina === "usuarios" ? (
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th className="w-25">Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        ) : idPagina === "turnos" ? (
          <tr>
            <th>Detalle de cita</th>
            <th>Veterinario</th>
            <th>Mascota</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        ) : null}
      </thead>
      <tbody>
        {filtrarArray.map((item, index) => {
          if (idPagina === "usuarios") {
            return (
              <tr key={index}>
                <td>{item.nombreUsuario}</td>
                <td>{item.apellidoUsuario}</td>
                <td>{item.emailUsuario}</td>
                <td>{item.telefono}</td>
                <td className="w-25">
                  <Link
                    className="btn btn-warning mx-3"
                    to={
                      usuarioLogueado
                        ? `/admin/usuarios/Editar?id=${item._id}`
                        : "#"
                    }
                  >
                    Editar
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => botonEliminarUsuario(item._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          }

          if (idPagina === "turnos") {
            const fechaObj = new Date(item.fecha);
            const fechaFormateada = fechaObj.toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const horaFormateada = fechaObj.toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <tr key={index}>
                <td>{item.detalle}</td>
                <td>{item.veterinario}</td>
                <td>{item.mascota}</td>
                <td>{fechaFormateada}</td>
                <td>{horaFormateada}</td>
                <td className="w-25">
                  <Link
                    className="btn btn-warning mx-3"
                    to={
                      usuarioLogueado ? `/admin/turnos/editar/${item._id}` : "#"
                    }
                  >
                    Editar
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => botonEliminarTurno(item._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          }

          return null;
        })}
      </tbody>
    </Table>
  );
};

export default TablaC;
