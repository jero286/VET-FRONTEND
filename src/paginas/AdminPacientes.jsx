import { Container } from "react-bootstrap"
import TablaC from "../componentes/tablas/TablaC"
import { useEffect, useState } from "react"
import clienteAxios, { configHeader } from "../funciones_auxiliares/configAxios"


const AdminPacientes = () => {
  const [usuarios, setUsuarios] = useState([])

  const obtenerTodosLosUsuarios = async () => {
    const usuarios = await clienteAxios.get("usuarios", configHeader)
    setUsuarios(usuarios.data.usuarios)}

    useEffect(() => {
      obtenerTodosLosUsuarios()
    },[])
  return (
    <>
    <Container fluid className="my-5">
      <TablaC idPagina="usuarios" array={usuarios}
       obtenerTodosLosUsuarios={obtenerTodosLosUsuarios} />
    </Container>
    </>
  )
}

export default AdminPacientes