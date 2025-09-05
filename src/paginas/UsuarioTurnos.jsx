import { useEffect, useState } from "react";
import TablaUsuarios from "../componentes/tablas/TablaUsuarios";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";
import clienteAxios from "../funciones_auxiliares/configAxios";
cambiarTituloPagina("turnosUsuario");

const UsuarioTurnos = () => {
  const idUsuarioLog = JSON.parse(sessionStorage.getItem("idUsuario"));
  const [turnos, setTurnos] = useState([]);
  const obtenerTurnosDeUsuario = async () => {
    const turnosDeUsuario = await clienteAxios.get(
      `/turnos/usuarios/${idUsuarioLog}`
    );
    setTurnos(turnosDeUsuario.data.turnos);
  };

  useEffect(() => {
    obtenerTurnosDeUsuario();
  }, []);
  return (
    <>
      <div className="table-responsive">
        <TablaUsuarios
        idPage="turnosUsuarios"
        idDelUsuarioLog={idUsuarioLog}
        arrayTurnos={turnos}
      />
      </div>
    </>
  );
};

export default UsuarioTurnos;
