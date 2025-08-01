import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import PaginaPrincipal from "./PaginaPrincipal";

const PaginaUsuario = () => {
  cambiarTituloPagina("panelUsuario")
  return (
    <>
      <PaginaPrincipal />
    </>
  );
};

export default PaginaUsuario;
