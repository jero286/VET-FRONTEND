import { useEffect, useState } from "react"
import clienteAxios, { configHeader } from "../funciones_auxiliares/configAxios"
import { Container } from "react-bootstrap"
import { Link } from "react-router"
import TablaProductos from "../componentes/tablas/TablaProductos"
import "./adminProductos.css"

const AdminProductos = () => {
  const [productos, setProductos] = useState([])
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("token")) || null

  const obtenerTodosLosProductos = async () => {
    const productos = await clienteAxios.get("/productos", configHeader)
    setProductos(productos.data.productos)
  }

  useEffect(() => {
    obtenerTodosLosProductos()
  }, [])

  return (
    <div className="admin-productos-bg">
      <Container className="admin-productos-card">
        <div className="text-end mb-4">
          <Link
            className="btn btn-primary"
            to={`/admin/productos/crearEditar`}
          >
            + Añadir Nuevo Producto
          </Link>
        </div>
        <TablaProductos
          array={productos}
          obtenerTodosLosProductos={obtenerTodosLosProductos}
          usuarioLogueado={usuarioLogueado}
        />
      </Container>
    </div>
  )
}

export default AdminProductos
