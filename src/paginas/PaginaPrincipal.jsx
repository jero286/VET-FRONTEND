
import "./PaginaPrincipal.css";
import { Container, Button, Carousel, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";


const productos = [
  {
    id: "prod1",
    nombre: "Alimento para Perros Premium",
    descripcion: "Bolsa de 10kg con vitaminas.",
    precio: 50000,
    imagen:
      "https://i5.walmartimages.com/asr/1691761b-715b-49ef-9e56-814324ffa345.963d8e4a5673f3f3b0aca9fe87a023f2.png?odnHeight=186&odnWidth=186&odnBg=FFFFFF",
  },
  {
    id: "prod2",
    nombre: "Rascador para Gatos",
    descripcion: "Con base firme y juguete colgante.",
    precio: 39000,
    imagen: "/rascadorparagatos.jpg",
  },
  {
    id: "prod3",
    nombre: "Shampoo Antipulgas",
    descripcion: "250ml – apto para perros y gatos.",
    precio: 9000,
    imagen: "/shampoo-antipulgas.webp",
  },
];

const comprarProducto = async (producto) => {
  try {
    const res = await fetch("http://localhost:3000/api/crear-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    const data = await res.json();
    window.location.href = data.init_point;
  } catch (error) {
    console.error("Error al comprar:", error);
  }
};

const PaginaPrincipal = () => {
  cambiarTituloPagina("Pagina Principal");
  const navigate = useNavigate();

  const planes = [
    {
      nombre: "Primeros Pasos",
      edad: "0 a 5 años",
      descripcion: "Cuidados y prevención para cachorros.",
    },
    {
      nombre: "Madurando",
      edad: "5 a 10 años",
      descripcion: "Salud activa para mascotas adultas.",
    },
    {
      nombre: "Adultos",
      edad: "Más de 10 años",
      descripcion: "Bienestar y control geriátrico.",
    },
  ];

  return (
    <div className="fondo-principal">
      <Container className="text-center">
        <h1>Bienvenido a VetCare</h1>
        <p>
          Tu mascota, nuestra prioridad. Descubrí nuestros planes de salud
          pensados para cada etapa de su vida.
        </p>

        {/* Tabla de planes */}
        <h2 className="mt-5">Planes para cada etapa</h2>
        <div className="tabla-planes mt-3 mb-4">
          <table className="table table-striped table-bordered table-hover text-white">
            <thead>
              <tr>
                <th>Nombre del Plan</th>
                <th>Edad</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {planes.map((plan, idx) => (
                <tr key={idx}>
                  <td>{plan.nombre}</td>
                  <td>{plan.edad}</td>
                  <td>{plan.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button variant="primary" onClick={() => navigate("/planes")} className="mb-5">
          Más información 
        </Button>

        {/* Carrusel de productos */}
        <h2 className="mt-5">Productos destacados</h2>
        <Carousel className="mt-4" indicators={false} controls={true}>
          {productos.map((producto) => (
            <Carousel.Item key={producto.id}>
              <Card className="mx-auto" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>{producto.descripcion}</Card.Text>
                  <Card.Text>
                    <strong>${producto.precio}</strong>
                  </Card.Text>
                  {/* <Button
                    variant="primary"
                    onClick={() => comprarProducto(producto)}
                  >
                    Comprar
                  </Button> */}
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
        
      </Container>
    </div>
  );
};

export default PaginaPrincipal;
