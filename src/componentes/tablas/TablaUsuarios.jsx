import Table from "react-bootstrap/Table";
const TablaUsuarios = ({ idPage, idDelUsuarioLog, arrayTurnos }) => {
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
                <td>{new Date(turno.fecha).toLocaleDateString()}</td>
                <td>
                  {new Date(turno.hora).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
