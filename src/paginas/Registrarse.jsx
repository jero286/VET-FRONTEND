import { Container } from "react-bootstrap";
import FormC from "../componentes/form/FormC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import "./registrarse.css"

const Registrarse = () => {
  cambiarTituloPagina("Registro");
  return (
    <>
      <Container className=" container-registrarse  my-4">
        <FormC idPage="registro" />
      </Container>
    </>
  );
};

export default Registrarse;
