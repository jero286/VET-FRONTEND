import TablaUsuarios from "../componentes/tablas/TablaUsuarios";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
cambiarTituloPagina("turnosUsuario")

const UsuarioTurnos = () => {
  return (
    <>
      <TablaUsuarios />
    </>
  );
};

export default UsuarioTurnos;
