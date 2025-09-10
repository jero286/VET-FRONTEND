import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router";
import clienteAxios from "../funciones_auxiliares/configAxios";
import Swal from "sweetalert2";

const AdminEditarUsuarios = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [formEditarUsuario, setFormEditarUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    emailUsuario: "",
    telefono: "",
  });
  
  // Estado para manejar la carga
  const [loading, setLoading] = useState(false);

  const obtenerUsuarioPorId = async (id) => {
    // Validar que el ID existe
    if (!id) {
      console.error("ID de usuario no proporcionado");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se proporcionó un ID de usuario válido.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log(`Obteniendo usuario con ID: ${id}`); // Para debug
      
      const res = await clienteAxios.get(`/usuarios/${id}`);
      
      console.log("Respuesta completa:", res); // Para debug
      console.log("Datos del usuario:", res.data); // Para debug
      
      // Verificar la estructura de la respuesta
      const usuario = res.data.usuario || res.data;
      
      if (!usuario) {
        throw new Error("Usuario no encontrado en la respuesta");
      }

      setFormEditarUsuario({
        nombreUsuario: usuario.nombreUsuario || "",
        apellidoUsuario: usuario.apellidoUsuario || "",
        emailUsuario: usuario.emailUsuario || "",
        telefono: usuario.telefono || "",
      });
      
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Respuesta del error:", error.response?.data);
      console.error("Status del error:", error.response?.status);
      
      let mensajeError = "Ocurrió un problema al obtener los datos del usuario.";
      
      if (error.response) {
        // El servidor respondió con un código de error
        switch (error.response.status) {
          case 404:
            mensajeError = "Usuario no encontrado.";
            break;
          case 401:
            mensajeError = "No tienes permisos para acceder a este usuario.";
            break;
          case 500:
            mensajeError = "Error interno del servidor.";
            break;
          default:
            mensajeError = error.response.data?.message || mensajeError;
        }
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        mensajeError = "No se pudo conectar con el servidor.";
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar usuario',
        text: mensajeError,
        confirmButtonColor: '#d33',
      }).then(() => {
        // Opcional: redirigir de vuelta a la lista si el usuario no existe
        if (error.response?.status === 404) {
          navigate("/admin/pacientes");
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClickFormEditarUsuario = async (e) => {
    e.preventDefault();
    
    // Validación adicional
    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede actualizar: ID de usuario no válido.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log("Datos a enviar:", formEditarUsuario); // Para debug
      
      const res = await clienteAxios.put(`/usuarios/${id}`, formEditarUsuario);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado con éxito",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/admin/pacientes");
      });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      console.error("Respuesta del error:", error.response?.data);
      
      let mensajeError = "No se pudo actualizar el usuario";
      
      if (error.response?.data?.message) {
        mensajeError = error.response.data.message;
      }
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensajeError,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      obtenerUsuarioPorId(id);
    } else {
      // Si no hay ID, mostrar error y redirigir
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se proporcionó un ID de usuario para editar.',
        confirmButtonColor: '#d33',
      }).then(() => {
        navigate("/admin/pacientes");
      });
    }
  }, [id]);

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <Container className="w-25 my-5 text-center">
        <p>Cargando datos del usuario...</p>
      </Container>
    );
  }

  return (
    <>
      <Container className="w-25 my-5">
        <Form onSubmit={handleClickFormEditarUsuario}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={formEditarUsuario.nombreUsuario}
              onChange={(e) =>
                setFormEditarUsuario({
                  ...formEditarUsuario,
                  nombreUsuario: e.target.value,
                })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              value={formEditarUsuario.apellidoUsuario}
              onChange={(e) =>
                setFormEditarUsuario({
                  ...formEditarUsuario,
                  apellidoUsuario: e.target.value,
                })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={formEditarUsuario.emailUsuario}
              onChange={(e) =>
                setFormEditarUsuario({
                  ...formEditarUsuario,
                  emailUsuario: e.target.value,
                })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefono"
              value={formEditarUsuario.telefono}
              onChange={(e) =>
                setFormEditarUsuario({
                  ...formEditarUsuario,
                  telefono: e.target.value,
                })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <div className="text-center">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Datos"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AdminEditarUsuarios;