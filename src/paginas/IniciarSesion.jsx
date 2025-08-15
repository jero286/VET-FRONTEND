import { Container } from "react-bootstrap";
import FormC from "../componentes/form/FormC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import "./IniciarSesion.css"

const IniciarSesion = () => {
  cambiarTituloPagina("Iniciar Sesion");
  return (
    <>
      <Container className="container-iniciar-sesion ">
        <FormC idPage="inicioSesion" className="form-c " />
      </Container>
    </>
  );
};

export default IniciarSesion;
