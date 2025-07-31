import { useEffect, useState } from "react"
import clienteAxios, { configHeader } from "../funciones_auxiliares/configAxios"
import { Container } from "react-bootstrap"
import TablaC from "../componentes/tablas/TablaC"


const AdminProductos = () => {
  const [productos, setProductos] = useState([])

  const obtenerTodosLosProductos = async () => {
    const productos = await clienteAxios.get("productos", configHeader)
    setProductos(productos.data.productos)}

    useEffect(() => {
      obtenerTodosLosProductos
    }, [])
  return (
    <>
    <Container fluid className="my-5">
      <TablaC idPagina="productos" array={productos}
      obtenerTodosLosProductos={obtenerTodosLosProductos} />
    </Container>
    </>
  )
}

export default AdminProductos