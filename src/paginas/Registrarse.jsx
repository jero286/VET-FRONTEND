import FormC from "../componentes/form/FormC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const Registrarse = () => {
  cambiarTituloPagina("Registrarse");
  return (
    <>
      <FormC />
    </>
  );
};

export default Registrarse;
