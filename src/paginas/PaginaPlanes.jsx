import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PaginaPlanes.css";


const planes = [
  {
    nombre: "🐶 Primeros Pasos",
    edad: "0 a 5 años",
    precio: "$80.000 / mes",
    descripcion: [
      "✔️ Controles veterinarios regulares",
      "✔️ Vacunación completa",
      "✔️ Desparasitación interna y externa",
      "✔️ Identificación con microchip",
      "✔️ Regalo de bienvenida",
      "✔️ Asesoramiento nutricional",
      "✔️ Consejos de crianza y comportamiento"
    ]
  },
  {
    nombre: "🐕 Madurando",
    edad: "5 a 10 años",
    precio: "$100.000 / mes",
    descripcion: [
      "✔️ Chequeo general semestral",
      "✔️ Limpieza dental anual",
      "✔️ Evaluación ortopédica básica",
      "✔️ Control de peso y alimentación",
      "✔️ Examen de sangre preventivo",
      "✔️ Actividad física recomendada",
      "✔️ 10% de descuento en farmacia"
    ]
  },
  {
    nombre: "🐾 Adultos",
    edad: "10+ años",
    precio: "$125.000 / mes",
    descripcion: [
      "✔️ Monitoreo cardiovascular",
      "✔️ Análisis clínicos regulares",
      "✔️ Revisión de visión y audición",
      "✔️ Evaluación articular y dolor",
      "✔️ Nutrición adaptada",
      "✔️ Examen de próstata o mama",
      "✔️ Atención preferencial sin turno"
    ]
  }
];

const Planes = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-5 planes-container">
      <h2 className="text-center mb-4">Nuestros Planes de Salud</h2>
      <Row>
        {planes.map((plan, idx) => (
          <Col md={4} key={idx}>
            <Card className={`plan-card plan-${idx}`}>
              <Card.Body>
                <Card.Title>{plan.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{plan.edad}</Card.Subtitle>
                <Card.Text>
                  <ul className="lista-plan">
                    {plan.descripcion.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Card.Text>
                <h5 className="text-primary">{plan.precio}</h5>
                <Button
                  variant="success"
                  onClick={() => navigate(`/planes/${plan.nombre}`)}
                >
                  Más detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
    
  );
};

export default Planes;

