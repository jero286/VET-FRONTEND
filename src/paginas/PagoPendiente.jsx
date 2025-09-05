import { Container, Card, Spinner } from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
const PagoPendiente = () => {
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Card className="text-center p-4 shadow" style={{ maxWidth: "400px" }}>
          <Clock size={64} className="text-warning mb-3" />
          <Card.Title>Pago Pendiente</Card.Title>
          <Card.Text>
            Tu pago está en proceso. ⏳ Por favor espera unos momentos.
          </Card.Text>
          <NavLink to="/" className="btn btn-warning">
            Volver a la tienda
          </NavLink>
        </Card>
      </Container>
    </>
  );
};

export default PagoPendiente;
