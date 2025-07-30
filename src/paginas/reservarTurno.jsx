import { Container } from "react-bootstrap"
import FormT from "../componentes/form-turnos/FormT"
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

export const reservarTurno = () => {
  cambiarTituloPagina("ReservarTurno");
  return (
    <>
      <Container className="d-flex justify-content-center my-4">
        <FormT />
      </Container>
    </>
  );
}
