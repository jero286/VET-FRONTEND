import { Container } from "react-bootstrap";
import FormT from "../componentes/form-turnos/FormT";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const ReservarTurno = () => {
  cambiarTituloPagina("reservarTurno");
  return (
    <>
      <Container className="d-flex justify-content-center my-4">
        <FormT />
      </Container>
    </>
  );
};

export default ReservarTurno;
