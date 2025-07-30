

import { useParams } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import "./DetallePlan.css";


const DetallePlan = () => {

  const { nombrePlan } = useParams();


  return (
    <div className="mt-5 detalle-plan-container">
      <h2>Detalle del Plan: {decodeURIComponent(nombrePlan)}</h2>

      <p>Gracias por tu interés. Completá el siguiente formulario para que podamos ayudarte mejor.</p>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresá tu nombre" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingresá tu email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Consulta/Comentario</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Dejanos tu mensaje..." />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar consulta
        </Button>
      </Form>
    </div>

  );
};

export default DetallePlan;
