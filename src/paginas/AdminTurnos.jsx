
import { useEffect, useState } from "react"
import clienteAxios, { configHeader } from "../funciones_auxiliares/configAxios"
import { Container } from "react-bootstrap"
import TablaC from "../componentes/tablas/TablaC"
import "./adminTurnos.css"


const AdminTurnos = () => {
  const [turnos, setTurnos] = useState([])
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null

  const obtenerTodosLosTurnos = async () => {
    const turnos = await clienteAxios.get("/turnos", configHeader)
    console.log(turnos)
    setTurnos(turnos.data.turnos)
  }

  useEffect(() => {
    obtenerTodosLosTurnos()
  }, [])
  return (
    <>  <div className="admin-turnos-bg">
      <Container fluid className="admin-turnos-card my-5">
        <TablaC idPagina="turnos" array={turnos}
          obtenerTodosLosTurnos={obtenerTodosLosTurnos}
          usuarioLogueado={usuarioLogueado} />
      </Container>
      </div>
    </>
  )
}

export default AdminTurnos