import { Container } from "react-bootstrap";
import FormC from "../componentes/form/FormC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const IniciarSesion = () => {
  cambiarTituloPagina("Iniciar Sesion");
  return (
    <>
      <Container className="d-flex justify-content-center my-4">
        <FormC idPage="inicioSesion" />
      </Container>
    </>
  );
};

export default IniciarSesion;
