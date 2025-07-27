import FormC from "../componentes/form/FormC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const IniciarSesion = () => {
  cambiarTituloPagina("Iniciar Sesion");
  return (
    <>
      <FormC />
    </>
  );
};

export default IniciarSesion;
