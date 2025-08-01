import Table from 'react-bootstrap/Table';

const TablaC = ({idPagina, array}) => {
    console.log(array)
    const filtrarArray = idPagina === "usuarios"
    ? array.filter(usuarios => usuarios.rolUsuario !== 'admin')
    : array
  return (
    <>
    <Table striped bordered hover>
      <thead>
        {
            idPagina === "usuarios"
            ?
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th className='w-25'>Email</th>
          <th>Telefono</th>
          <th>Mascota/s</th>
        </tr>
            :
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripcion</th>
          <th>Imagen</th>
        </tr>
        }
      </thead>
      <tbody>
        {
            filtrarArray.map((usuario, index) => (
            idPagina === "usuarios" ? 
        <tr key={index}>
          <td> {usuario.nombreUsuario} </td>
          <td> {usuario.apellidoUsuario} </td>
          <td> {usuario.emailUsuario} </td>
          <td> {usuario.telefono} </td>
          <td> {usuario.mascotas} </td>
        </tr>
            :
        <tr key={index}>
          <td> {producto.id} </td>
          <td> {producto.nombre} </td>
          <td> {producto.precio} </td>
          <td> {producto.descripcion} </td>
          <td> {producto.imagen} </td>
        </tr>    
        )
            )
        }      
      </tbody>
    </Table>
    </>
  )
}

export default TablaC