import { useEffect, useState } from "react";
import clienteAxios from "../funciones_auxiliares/configAxios";
import { Container } from "react-bootstrap";
import { Link } from "react-router";

const UsuarioMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null;

  const obtenerTodasMisMascotas = async () => {
    const mascotas = await clienteAxios.get("/mascotas");
    setMascotas(mascotas.data.mascotas);
  };

  useEffect(() => {
    obtenerTodasMisMascotas;
  }, []);
  return (
    <>
      <Container className="text-end my-5">
        <Link
          className="btn btn-primary"
          to={`/usuario/mascotas/crearEditarMascota`}
        >
          + Añadir Mascota
        </Link>
      </Container>
    </>
  );
};

export default UsuarioMascotas;
