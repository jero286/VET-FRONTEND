import { Container } from "react-bootstrap";
import FormC from "../componentes/form/FormC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const Registrarse = () => {
  cambiarTituloPagina("Registrarse");
  return (
    <>
      <Container className="d-flex justify-content-center my-4">
        <FormC idPage="registro" />
      </Container>
    </>
  );
};

export default Registrarse;
