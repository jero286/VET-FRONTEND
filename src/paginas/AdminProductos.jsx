import { useEffect, useState } from "react";
import clienteAxios from "../funciones_auxiliares/configAxios";
import { Container } from "react-bootstrap";
import { Link } from "react-router";
import TablaProductos from "../componentes/tablas/TablaProductos";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null;

  const obtenerTodosLosProductos = async () => {
    const productos = await clienteAxios.get("/productos");
    setProductos(productos.data.productos);
  };

  useEffect(() => {
    obtenerTodosLosProductos();
  }, []);
  return (
    <>
      <Container className="text-end my-5">
        <Link className="btn btn-primary" to={`/admin/productos/crearEditar`}>
          + Añadir Nuevo Producto
        </Link>
      </Container>
      <Container fluid className="my-5">
        <div className="table-responsive">
          <TablaProductos
          array={productos}
          obtenerTodosLosProductos={obtenerTodosLosProductos}
          usuarioLogueado={usuarioLogueado}
        />
        </div>
      </Container>
    </>
  );
};

export default AdminProductos;
