<<<<<<< HEAD

import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./admin.css"
=======
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina"

>>>>>>> 499388f25b26ff67626324a2bf3fdae10851c56b

const Admin = () => {
  cambiarTituloPagina("Admin")
  return (
    <Container className="admin-dashboard my-5">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm p-3 text-center">
            <h5>Pacientes</h5>
            <Link to="/admin/pacientes" className="btn btn-primary mt-2">
              Gestionar Pacientes
            </Link>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3 text-center">
            <h5>Productos</h5>
            <Link to="/admin/productos" className="btn btn-primary mt-2">
              Gestionar Productos
            </Link>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3 text-center">
            <h5>Turnos</h5>
            <Link to="/admin/turnos" className="btn btn-primary mt-2">
              Gestionar Turnos
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
