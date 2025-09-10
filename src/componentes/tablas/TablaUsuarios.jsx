import Table from "react-bootstrap/Table";
import dayjs from "dayjs";
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
                <td>
                  {turno.fecha ? dayjs(turno.fecha).format("DD/MM/YYYY") : ""}
                </td>
                <td>{turno.hora ? dayjs(turno.hora).format("HH:mm") : ""}</td>
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
    );
  }


  if (idPage === "carrito") {
    return (
      <>
        <Container className="my-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos && productos.length > 0 ? (
                productos.map((prod, index) => (
                  <tr key={prod.producto._id}>
                    <td>{index + 1}</td>
                    <td>{prod.producto.nombre}</td>
                    <td>${prod.producto.precio}</td>
                    <td>{prod.producto.descripcion}</td>
                    <td>{prod.cantidad}</td>
                    <td>${prod.cantidad * prod.producto.precio}</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        onClick={(ev) =>
                          handleClickDeleteProdCart(ev, prod.producto._id)
                        }
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Carrito vacío
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {productos.length > 0 && (
            <>
              <div className="text-center my-3">
                <Button variant="success" onClick={handleClickPay}>
                  Pagar con MercadoPago
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Wallet
                  initialization={{
                    preferenceId: idPreferencia,
                    redirectMode: "modal",
                  }}
                />
              </div>
            </>
          )}
        </Container>
      </>
    );
  }

  return null;
};

export default TablaUsuarios;
