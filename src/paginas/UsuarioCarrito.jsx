import { useEffect, useState } from "react";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import clienteAxios, {
  configHeader,
} from "../funciones_auxiliares/configAxios";
import TablaCarrito from "../componentes/tablas/TablaCarrito";

cambiarTituloPagina("carrito");
const UsuarioCarrito = () => {
  const idUsuarioLog = JSON.parse(sessionStorage.getItem("idUsuario"));
  const [productos, setProductos] = useState([]);
  const obtenerProductosDelCarrito = async () => {
    const productosCarrito = await clienteAxios.get(`/carrito`, configHeader);
    setProductos(productosCarrito.data.productos);
  };
  useEffect(() => {
    obtenerProductosDelCarrito();
  }, []);
  return (
    <>
      <TablaCarrito />
    </>
  );
};

export default UsuarioCarrito;
