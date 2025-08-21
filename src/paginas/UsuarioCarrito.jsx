import { useEffect, useState, useMemo } from "react";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import clienteAxios, {
  configHeader,
} from "../funciones_auxiliares/configAxios";
import TablaCarrito from "../componentes/tablas/TablaCarrito";
import { Button, Spinner, Alert, Container } from "react-bootstrap";

cambiarTituloPagina("carrito");
const UsuarioCarrito = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const formatearAPesosArs = (number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number ?? 0);
  };

  const cargarCarrito = async () => {
    try {
      setCargando(true);
      setError("");
      const { data } = await clienteAxios.get("/carrito", configHeader);
      const productos = data?.productos ?? data?.carrito?.productos ?? [];
      setProductos(productos);
    } catch (error) {
      setError("No se pudo obtener el carrito");
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = async (productoId) => {
    try {
      setCargando(true);
      await clienteAxios.delete(
        `/carrito/eliminar/${productoId}`,
        configHeader
      );
      await cargarCarrito();
    } catch (error) {
      setError("No se pudo eliminar el producto");
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const total = useMemo(() => {
    return productos.reduce((acc, item) => {
      const precio = item?.producto?.precio ?? 0;
      const cantidad = item?.cantidad ?? 0;
      return acc + precio * cantidad;
    }, 0);
  }, [productos]);

  const pagarProducto = async () => {
    try {
      if (productos.length === 0) return;
      setCargando(true);
      setError("");
      const { data } = await clienteAxios.post(
        `/carrito/pagarProducto`,
        {},
        configHeader
      );
      if (data?.init_point) {
        window.location.href = data.init_point;
      } else {
        setError("No se pudo iniciar el pago (init point no recibido)");
      }
    } catch (error) {
      setError("Error al iniciar el pago");
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  return (
    <>
      <Container className="py-4">
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        <TablaCarrito
          items={productos}
          onEliminar={eliminarProducto}
          formatearARS={formatearAPesosArs}
        />
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="fw-bold fs-5">Total: {formatearAPesosArs(total)}</div>
          <Button
            variant="success"
            disabled={items.length === 0 || cargando}
            onClick={pagarProducto}
          >
            {cargando ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Pagar con Mercado Pago"
            )}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default UsuarioCarrito;
