import Table from "react-bootstrap/Table";
import { Image, Button } from "react-bootstrap";
const TablaCarrito = ({ items = [], onEliminar, formatearARS }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: 60 }}>#</th>
            <th style={{ width: 90 }}>Imagen</th>
            <th>Producto</th>
            <th style={{ width: 140 }}>Precio</th>
            <th style={{ width: 120 }}>Cantidad</th>
            <th style={{ width: 160 }}>Subtotal</th>
            <th style={{ width: 140 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, idx) => {
              const prod = item?.producto ?? {};
              const cantidad = item?.cantidad ?? 0;
              const precio = prod?.precio ?? 0;
              const subtotal = precio * cantidad;

              return (
                <tr key={`${prod?._id}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td className="text-center">
                    {prod?.imagen && prod.imagen !== "url" ? (
                      <Image
                        src={prod.imagen}
                        alt={prod?.nombre}
                        style={{ width: 64, height: 64, objectFit: "cover" }}
                        rounded
                      />
                    ) : (
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          background: "#eee",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: "#888",
                          borderRadius: 8,
                        }}
                      >
                        Sin imagen
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="fw-semibold">{prod?.nombre ?? "—"}</div>
                    <div className="text-muted small">
                      {prod?.descripcion ?? ""}
                    </div>
                  </td>
                  <td>{formatearARS ? formatearARS(precio) : precio}</td>
                  <td>{cantidad}</td>
                  <td>{formatearARS ? formatearARS(subtotal) : subtotal}</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onEliminar?.(prod?._id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                Carrito vacío
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TablaCarrito;
