import { Container } from "react-bootstrap"
import TablaC from "../componentes/tablas/TablaC"
import { useEffect, useState } from "react"
import clienteAxios, { configHeader } from "../funciones_auxiliares/configAxios"
import { Link } from "react-router"

const AdminPacientes = () => {
  const [usuarios, setUsuarios] = useState([])
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null

  const obtenerTodosLosUsuarios = async () => {
    const usuarios = await clienteAxios.get("usuarios", configHeader)
    setUsuarios(usuarios.data.usuarios)
  }

  useEffect(() => {
    obtenerTodosLosUsuarios()
  }, [])
  return (
    <>
      {
        usuarioLogueado &&
        <>
          <Container className='text-end my-5'>
            <Link className="btn btn-primary"
              to={`/registrarse`}>+ Añadir Nuevo Usuario</Link>
          </Container>
          <Container fluid className="my-5">
            <TablaC idPagina="usuarios" array={usuarios}
              obtenerTodosLosUsuarios={obtenerTodosLosUsuarios}
              usuarioLogueado={usuarioLogueado} />
          </Container>
        </>
      }
    </>
  )
}

export default AdminPacientes