import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router';
import clienteAxios, { configHeader } from '../funciones_auxiliares/configAxios';
import Swal from 'sweetalert2';

const AdminEditarUsuarios = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const id = new URLSearchParams(location.search).get("id")

  const [formEditarUsuario, setFormEditarUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    telefono: ""
  })

  const obtenerUsuarioPorId = async (id) => {
    try {
      const res = await clienteAxios.get(`/usuarios/${id}`, configHeader);
      const usuario = res.json()

      setFormEditarUsuario({
        nombreUsuario: usuario.nombreUsuario,
        apellidoUsuario: usuario.apellidoUsuario,
        emailUsuario: usuario.emailUsuario,
        telefono: usuario.telefono
      });
    } catch (error) {
      console.error("Error al obtener usuario por ID", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar usuario',
        text: 'Ocurrió un problema al obtener los datos del usuario.',
        confirmButtonColor: '#d33',
      })
    }
  };

  const handleClickFormEditarUsuario = async (e) => {
    e.preventDefault()
    try {
      const res = await clienteAxios.put(`/usuarios/${id}`, formEditarUsuario)

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario actualizado con éxito',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate("/admin/pacientes")
      });
    } catch (error) {
      console.error("Error al actualizar el usuario", error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el usuario',
        confirmButtonColor: '#d33',
      });
    }
  };

  useEffect(() => {
    if (id) {
      obtenerUsuarioPorId()
    }
  }, [id])
  return (
    <>
      <Container className='w-25 my-5'>
        <Form onSubmit={handleClickFormEditarUsuario}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={formEditarUsuario.nombreUsuario}
              onChange={(e) =>
                setFormEditarUsuario({ ...formEditarUsuario, nombreUsuario: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              value={formEditarUsuario.apellidoUsuario}
              onChange={(e) =>
                setFormEditarUsuario({ ...formEditarUsuario, apellidoUsuario: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={formEditarUsuario.emailUsuario}
              onChange={(e) =>
                setFormEditarUsuario({ ...formEditarUsuario, emailUsuario: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefono"
              value={formEditarUsuario.telefono}
              onChange={(e) =>
                setFormEditarUsuario({ ...formEditarUsuario, telefono: e.target.value })}
            />
          </Form.Group>

          <div className='text-center'>
            <Button variant="primary" type="submit">
              Guardar Datos
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default AdminEditarUsuarios