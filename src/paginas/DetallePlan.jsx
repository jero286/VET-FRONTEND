
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";

import "./DetallePlan.css";
import { enviarConsulta } from "../servicios/consultas.service";

const DetallePlan = () => {
  const { nombrePlan } = useParams();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");   
  const [exito, setExito] = useState(false);     

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      setError("Por favor, completá todos los campos.");
      setExito(false);
      return;
    }

    try {
      await enviarConsulta({ nombre, email, mensaje, plan: nombrePlan });
      setExito(true);
      setError("");
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch (err) {
      setError("Hubo un problema al enviar tu consulta. Intentá de nuevo.");
      setExito(false);
      console.error(err);
    }
  };

  return (
    <div className="mt-5 detalle-plan-container">
      <h2>Detalle del Plan: {decodeURIComponent(nombrePlan)}</h2>
      <p>Gracias por tu interés. Completá el siguiente formulario para que podamos ayudarte mejor.</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {exito && <Alert variant="success">¡Consulta enviada correctamente!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresá tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresá tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Consulta/Comentario</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Dejanos tu mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar consulta
        </Button>
      </Form>
    </div>
  );
};

export default DetallePlan;



