import { Container, Card } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";


const PagoFallido = () => {
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Card className="text-center p-4 shadow" style={{ maxWidth: "400px" }}>
          <XCircle size={64} className="text-danger mb-3" />
          <Card.Title>Pago Fallido</Card.Title>
          <Card.Text>Hubo un problema al procesar tu pago. ❌</Card.Text>
          <NavLink to="/" className="btn btn-danger">
            Volver a la tienda
          </NavLink>
        </Card>
      </Container>
    </>
  );
};

export default PagoFallido;
