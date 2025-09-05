import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import PaginaPrincipal from "../paginas/PaginaPrincipal";

const Admin = () => {
  cambiarTituloPagina("Admin");

  return (
    <>
      <PaginaPrincipal />
    </>
  );
};

export default Admin;
