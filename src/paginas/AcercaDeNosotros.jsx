// import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina"


// const AcercaDeNosotros = () => {
//   cambiarTituloPagina("AcercaDeNosotros")
//   return (
//     <div>AcercaDeNosotros</div>
//   )
// }

// export default AcercaDeNosotros

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SobreNosotros = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Sobre Nosotros</h1>

      <Row className="mb-5">

        <Col className="d-flex align-items-center">
          <p>
            <p className="text-center">
              Somos un equipo de estudiantes de programación comprometidos con el aprendizaje, la tecnología y el trabajo en equipo. Desarrollamos proyectos con dedicación, buscando mejorar día a día y aplicar nuestros conocimientos en soluciones reales.
            </p>

          </p>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Nuestro Equipo</h2>

      <Row>
        {[
          {
            nombre: "Jerónimo Cruz",
            rol: "",
            img: "https://img.freepik.com/vector-premium/retrato-estudiante-varon-gafas-traje_684058-1003.jpg?w=360",
            descripcion: "Apasionado por el liderazgo y la innovación."
          },
          {
            nombre: "Tamara Galindo",
            rol: "",
            img: "https://i.pinimg.com/474x/52/9d/45/529d455ca82b11f29f5d1b54a5e975fa.jpg",
            descripcion: "Creativa y enfocada en los detalles visuales."
          },
          {
            nombre: "Jorge Medina",
            rol: "",
            img: "https://img.freepik.com/vector-premium/retrato-nino-cabello-castano-piel-blanca-avatar-hombre-joven-ilustracion-vector-color-estilo-dibujos-animados-caracter-diseno-plano-aislado_257471-371.jpg?w=360",
            descripcion: "Organizado, proactivo y apasionado por aprender cosas nuevas."
          },
          {
            nombre: "Magali Canelo",
            rol: "",
            img: "https://i.pinimg.com/originals/17/d8/3f/17d83f0f0936dc2547667cf40c9e0ecd.png",
            descripcion: "Empática, resolutiva y siempre dispuesta a ayudar."
          }
        ].map((persona, idx) => (
          <Col md={3} sm={6} className="mb-4" key={idx}>
            <Card className="text-center h-100 shadow-sm bg-secondary rounded-4">
              {/* <Card.Img variant="top" src={persona.img} className="mb-0 rounded-top-4" /> */}
              <Card.Img
                variant="top"
                src={persona.img}
                className="rounded-circle mx-auto d-block mt-3 img-fluid "
              />

              {/* Línea separadora */}
              <hr className="my-0" />

              <Card.Body className="bg-info bg-opacity-10 rounded-bottom-4">
                <Card.Title>{persona.nombre}</Card.Title>

                {persona.rol && (
                  <Card.Text className="fw-bold">{persona.rol}</Card.Text>
                )}

                <Card.Text>{persona.descripcion}</Card.Text>
              </Card.Body>
            </Card>


          </Col>
        ))}
      </Row>





    </Container>
  );
};

export default SobreNosotros;
