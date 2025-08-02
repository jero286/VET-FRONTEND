import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import clienteAxios from '../../funciones_auxiliares/configAxios';
import { Link } from 'react-router';

const TablaC = ({idPagina, array, usuarioLogueado, obtenerTodosLosUsuarios,
  obtenerTodosLosProductos, obtenerTodosLosTurnos
}) => {
    const filtrarArray = idPagina === "usuarios"
    ? array.filter(usuarios => usuarios.rolUsuario !== 'admin')
    : array

    const botonEliminarUsuario = (idUsuario) => {
      if (usuarioLogueado) {
      Swal.fire({
        title: "Estas seguro de que quieres eliminar a este usuario?",
        text: "Si lo borras no lo podras recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
        cancelButtonText: "No!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await clienteAxios.delete(`/usuarios/${idUsuario}`)
          console.log(res)
          if (res.status === 200) {
            Swal.fire({
              title: "Usuario eliminado!",
              icon: "success"
            });
            obtenerTodosLosUsuarios()
          }
        }
      });
    }
  }

  const botonEliminarProducto = (idProducto) => {
  if (usuarioLogueado) {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este producto?",
      text: "¡Si lo borras no lo podrás recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí!",
      cancelButtonText: "¡No!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await clienteAxios.delete(`/productos/${idProducto}`);
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
              title: "¡Producto eliminado!",
              icon: "success"
            });
            obtenerTodosLosProductos()
          }
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al intentar eliminar el producto.",
            icon: "error"
          });
        }
      }
    })
  }
}

const botonEliminarTurno = (idTurno) => {
  if (usuarioLogueado) {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este turno?",
      text: "¡Si lo borras no lo podrás recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí!",
      cancelButtonText: "¡No!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await clienteAxios.delete(`/turnos/${idTurno}`);
          console.log(res);
          if (res.status === 200) {
            Swal.fire({
              title: "¡Turno eliminado!",
              icon: "success"
            });
            obtenerTodosLosTurnos();
          }
        } catch (error) {
          console.error("Error al eliminar el turno:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al intentar eliminar el turno.",
            icon: "error"
          });
        }
      }
    })
  }
}

  return (
    <>
    <Table striped bordered hover>
      <thead>
        {
            idPagina === "usuarios"
            ?
        (<tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th className='w-25'>Email</th>
          <th>Telefono</th>
          <th>Mascota/s</th>
          <th>Acciones</th>
        </tr>)
            : idPagina === "productos" ?
        (<tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripcion</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>)
            : idPagina === "turnos" ?
        (<tr>
          <th>Detalle de cita</th>
          <th>Veterinario</th>
          <th>Mascota</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </tr>) : null
        }
      </thead>
      <tbody>
        {
          filtrarArray.map((usuario, index) => {
            if (idPagina === "usuarios") {
              return(
                <tr key={index}>
                  <td>{usuario.nombreUsuario}</td>
                  <td>{usuario.apellidoUsuario}</td>
                  <td>{usuario.emailUsuario}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.mascotas}</td>
                  <td className='w-25'>
                    <Link className='btn btn-warning mx-3' variant='warning' 
                    to={usuarioLogueado?
                    `/admin/usuarios/crearEditar?id=${usuario._id}` : "#"}>Editar</Link>
                    <Button variant='danger' 
                    onClick={() => botonEliminarUsuario(usuario._id)}>Eliminar</Button>
                  </td>
                </tr>)
            } else if (idPagina === "productos") {
              return(
                <tr key={index}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.descripcion}</td>
                  <td>
                    <img src={producto.imagen} alt={producto.nombre} width="50" />
                  </td>
                  <td className='w-25'>
                    <Link className='btn btn-warning mx-3' variant='warning' 
                    to={usuarioLogueado?
                    `/admin/productos/crearEditar?id=${producto._id}` : "#"}>Editar</Link>
                    <Button variant='danger' 
                    onClick={() => botonEliminarProducto(producto._id)}>Eliminar</Button>
                  </td>
                </tr>)
            } else if (idPagina === "turnos") {
              return(
                <tr key={index}>
                  <td>{item.motivo}</td>
                  <td>{item.veterinario}</td>
                  <td>{item.mascota}</td>
                  <td>{item.fecha}</td>
                  <td>{item.hora}</td>
                  <td className='w-25'>
                    <Link className='btn btn-warning mx-3' variant='warning' 
                    to={usuarioLogueado?
                    `/admin/turnos/crearEditar?id=${turno._id}` : "#"}>Editar</Link>
                    <Button variant='danger' 
                    onClick={() => botonEliminarTurno(turno._id)}>Eliminar</Button>
                  </td>
                </tr>)
            } else {
              return null;
            }
          })
        }      
      </tbody>
    </Table>
    </>
  )
}

export default TablaC