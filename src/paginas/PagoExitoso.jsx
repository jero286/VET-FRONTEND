import { CheckCircle } from "react-bootstrap-icons";
import { Container, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const PagoExitoso = () => {
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Card className="text-center p-4 shadow" style={{ maxWidth: "400px" }}>
          <CheckCircle size={64} className="text-success mb-3" />
          <Card.Title>¡Pago Exitoso!</Card.Title>
          <Card.Text>Tu compra fue procesada correctamente. 🎉</Card.Text>
          <NavLink to="/" className="btn btn-success">
            Volver a la tienda
          </NavLink>
        </Card>
      </Container>
    </>
  );
};

export default PagoExitoso;
