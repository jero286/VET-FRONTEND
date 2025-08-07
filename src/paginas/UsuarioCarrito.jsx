import TablaUsuarios from "../componentes/tablas/TablaUsuarios";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import clienteAxios, {
  configHeader,
} from "../funciones_auxiliares/configAxios";

const UsuarioCarrito = () => {
  cambiarTituloPagina("carrito");
  const idUsuarioLog = JSON.parse(sessionStorage.getItem("idUsuario"));
  const [productos, setProductos] = useState([]);

  const obtenerProductosDeCarrito = async () => {
    try {
      const res = await clienteAxios.get("/carrito", configHeader);
      setProductos(res.data.productos);
    } catch (error) {
      console.error("Error al obtener productos del carrito:", error);
    }
  };

  useEffect(() => {
    obtenerProductosDeCarrito();
  }, []);

  return (
    <>
      <TablaUsuarios
        idPage="carrito"
        idDelUsuarioLog={idUsuarioLog}
        arrayProductos={productos}
      />
    </>
  );
};

export default UsuarioCarrito;
