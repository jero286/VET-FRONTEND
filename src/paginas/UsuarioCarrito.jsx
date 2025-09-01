import { useEffect, useState, useMemo } from "react";
import clienteAxios from "../funciones_auxiliares/configAxios";
import TablaCarrito from "../componentes/tablas/TablaCarrito";
import { Button, Spinner, Alert, Container, Form } from "react-bootstrap";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const UsuarioCarrito = () => {
  cambiarTituloPagina("carrito");
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const formatearAPesosArs = (number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number ?? 0);

  const cargarCarrito = async () => {
    try {
      setCargando(true);
      setError("");
      const idUsuario = sessionStorage.getItem("idUsuario");
      const token = sessionStorage.getItem("token");

      const { data } = await clienteAxios.get("/carrito", {
        headers: { auth: token },
      });
      const productos = data?.productos ?? [];
      setProductosCarrito(productos);
    } catch (err) {
      console.log(err);
      setError("No se pudo obtener el carrito");
    } finally {
      setCargando(false);
    }
  };

  const cargarProductos = async () => {
    try {
      const { data } = await clienteAxios.get("/productos");
      setProductosDisponibles(data?.productos ?? []);
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los productos");
    }
  };

  useEffect(() => {
    cargarCarrito();
    cargarProductos();
  }, []);

  const agregarAlCarrito = async () => {
    if (!productoSeleccionado) return;

    try {
      setCargando(true);
      setError("");
      const idUsuario = sessionStorage.getItem("idUsuario");
      const token = sessionStorage.getItem("token");

      await clienteAxios.post(
        "/carrito/agregar",
        { productoId: productoSeleccionado, cantidad },
        { headers: { auth: token } }
      );
      await cargarCarrito();
      setCantidad(1);
      setProductoSeleccionado("");
    } catch (err) {
      console.log(err);
      setError("No se pudo agregar el producto");
    } finally {
      setCargando(false);
    }
  };

  const total = useMemo(
    () =>
      productosCarrito.reduce((acc, item) => {
        const precio = item?.producto?.precio ?? 0;
        const cant = item?.cantidad ?? 0;
        return acc + precio * cant;
      }, 0),
    [productosCarrito]
  );

  const pagarProducto = async () => {
    try {
      if (productosCarrito.length === 0) {
        setError("El carrito está vacío");
        return;
      }

      setCargando(true);
      setError("");

      console.log("Iniciando proceso de pago...");

      const { data } = await clienteAxios.post(
        "/carrito/pagarProducto",
        {},
        {
          headers: {
            auth: sessionStorage.getItem("token"),
          },
        }
      );

      console.log("Respuesta del backend:", data);

      if (data?.init_point) {
        console.log("Redirigiendo a:", data.init_point);
        window.location.href = data.init_point;
      } else {
        setError(
          "No se pudo iniciar el pago: " + (data?.msg || "Razón desconocida")
        );
      }
    } catch (error) {
      console.error("Error en pagarProducto:", error);
      if (error.response) {
        setError(
          `Error del servidor: ${
            error.response.data?.msg || error.response.status
          }`
        );
      } else {
        setError("Error de conexión al iniciar el pago");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="py-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <Form className="d-flex gap-2 mb-3 align-items-end">
        <Form.Group>
          <Form.Label>Producto</Form.Label>
          <Form.Select
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un producto</option>
            {productosDisponibles.map((prod) => (
              <option key={prod._id} value={prod._id}>
                {prod.nombre} - {formatearAPesosArs(prod.precio)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={agregarAlCarrito}
          disabled={cargando || !productoSeleccionado}
        >
          {cargando ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Agregar al carrito"
          )}
        </Button>
      </Form>

      <TablaCarrito
        items={productosCarrito}
        onEliminar={async (idProducto) => {
          try {
            setCargando(true);
            const token = sessionStorage.getItem("token");
            await clienteAxios.delete(`/carrito/eliminar/${idProducto}`, {
              headers: { auth: token },
            });
            await cargarCarrito();
          } catch (err) {
            console.log(err);
            setError("No se pudo eliminar el producto");
          } finally {
            setCargando(false);
          }
        }}
        formatearARS={formatearAPesosArs}
      />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="fw-bold fs-5">Total: {formatearAPesosArs(total)}</div>
        <Button
          variant="success"
          disabled={productosCarrito.length === 0 || cargando}
          onClick={pagarProducto}
        >
          Pagar con Mercado Pago
        </Button>
      </div>
    </Container>
  );
};

export default UsuarioCarrito;
