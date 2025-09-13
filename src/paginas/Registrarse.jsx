import { Container } from "react-bootstrap";
import FormC from "../componentes/form/FormC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const Registrarse = () => {
  cambiarTituloPagina("Registro");
  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/d7/2d/23/d72d236e94f257af28b37f792e71a177.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <Container className="d-flex justify-content-center">
        <FormC idPage="registro" />
      </Container>
    </div>
  );
};

export default Registrarse;
