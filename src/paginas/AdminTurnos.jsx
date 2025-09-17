import { useEffect, useState } from "react";
import clienteAxios from "../funciones_auxiliares/configAxios";
import { Container } from "react-bootstrap";
import TablaC from "../componentes/tablas/TablaC";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const AdminTurnos = () => {
  cambiarTituloPagina("Turnos");
  const [turnos, setTurnos] = useState([]);
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null;

  const obtenerTodosLosTurnos = async () => {
    const turnos = await clienteAxios.get("/turnos");
    setTurnos(turnos.data.turnos);
  };

  useEffect(() => {
    obtenerTodosLosTurnos();
  }, []);
  return (
    <>
      <Container fluid className="my-5">
        <div className="table-responsive">
          <TablaC
            idPagina="turnos"
            array={turnos}
            obtenerTodosLosTurnos={obtenerTodosLosTurnos}
            usuarioLogueado={usuarioLogueado}
          />
        </div>
      </Container>
    </>
  );
};

export default AdminTurnos;
