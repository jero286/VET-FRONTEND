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

  const [cargando, setCargando] = useState(true);

  const obtenerUsuarioPorId = async (id) => {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "ID de usuario no válido.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setCargando(true);

    try {
      console.log("🔍 Buscando usuario con ID:", id);
      const res = await clienteAxios.get(`/usuarios/${id}`);
      
      console.log("📦 Respuesta completa del backend:", res.data);
      
      const usuario = res.data.usuario;
      
      if (!usuario) {
        throw new Error("Usuario no encontrado en la respuesta");
      }

      console.log("👤 Datos del usuario:", usuario);

      const datosFormateados = {
        nombreUsuario: usuario.nombreUsuario || "",
        apellidoUsuario: usuario.apellidoUsuario || "",
        emailUsuario: usuario.emailUsuario || "",
        telefono: usuario.telefono || "",
      };

      console.log("✅ Datos formateados para el formulario:", datosFormateados);

      setFormEditarUsuario(datosFormateados);

    } catch (error) {
      console.error("❌ Error completo:", error);
      
      let mensaje = "Error al cargar los datos del usuario.";
      if (error.response?.status === 404) {
        mensaje = "Usuario no encontrado.";
      } else if (error.response?.status === 500) {
        mensaje = "Error interno del servidor.";
      } else if (error.message) {
        mensaje = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error al cargar usuario",
        text: mensaje,
        confirmButtonColor: "#d33",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleChangeForm = (campo, valor) => {
    setFormEditarUsuario(prevState => ({
      ...prevState,
      [campo]: valor
    }));
  };

  const handleClickFormEditarUsuario = async (e) => {
    e.preventDefault();

    const { nombreUsuario, apellidoUsuario, emailUsuario, telefono } = formEditarUsuario;

    if (!nombreUsuario.trim() || !apellidoUsuario.trim() || !emailUsuario.trim() || !telefono.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor completa todos los campos.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUsuario)) {
      Swal.fire({
        icon: "warning",
        title: "Email inválido",
        text: "Por favor ingresa un email válido.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      console.log("📤 Enviando datos actualizados:", formEditarUsuario);

      const datosParaEnviar = {
        nombreUsuario: nombreUsuario.trim(),
        apellidoUsuario: apellidoUsuario.trim(),
        emailUsuario: emailUsuario.trim(),
        telefono: telefono.trim(),
      };

      const res = await clienteAxios.put(`/usuarios/${id}`, datosParaEnviar);

      console.log("✅ Respuesta del servidor:", res.data);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: res.data.msg || "Usuario actualizado con éxito",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/admin/pacientes");
      });

    } catch (error) {
      console.error("❌ Error al actualizar:", error);

      let mensaje = "No se pudo actualizar el usuario";
      if (error.response?.data?.msg) {
        mensaje = error.response.data.msg;
      } else if (error.response?.data?.message) {
        mensaje = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje,
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    if (id) {
      obtenerUsuarioPorId(id);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se proporcionó un ID de usuario válido.",
        confirmButtonColor: "#d33",
      }).then(() => {
        navigate("/admin/pacientes");
      });
    }
  }, [id]);

  if (cargando) {
    return (
      <Container className="w-25 my-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando datos del usuario...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="w-25 my-5">
      <h2 className="text-center mb-4">Editar Usuario</h2>
      
      <Form onSubmit={handleClickFormEditarUsuario}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre"
            value={formEditarUsuario.nombreUsuario}
            onChange={(e) => handleChangeForm('nombreUsuario', e.target.value)}
            required
          />
          {formEditarUsuario.nombreUsuario && (
            <Form.Text className="text-muted">
               Editando: {formEditarUsuario.nombreUsuario}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="apellido">
          <Form.Label>Apellido *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el apellido"
            value={formEditarUsuario.apellidoUsuario}
            onChange={(e) => handleChangeForm('apellidoUsuario', e.target.value)}
            required
          />
          {formEditarUsuario.apellidoUsuario && (
            <Form.Text className="text-muted">
               Editando: {formEditarUsuario.apellidoUsuario}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese el email"
            value={formEditarUsuario.emailUsuario}
            onChange={(e) => handleChangeForm('emailUsuario', e.target.value)}
            required
          />
          {formEditarUsuario.emailUsuario && (
            <Form.Text className="text-muted">
               Editando: {formEditarUsuario.emailUsuario}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el teléfono"
            value={formEditarUsuario.telefono}
            onChange={(e) => handleChangeForm('telefono', e.target.value)}
            required
          />
          {formEditarUsuario.telefono && (
            <Form.Text className="text-muted">
              Editando: {formEditarUsuario.telefono}
            </Form.Text>
          )}
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="me-2">
             Guardar Cambios
          </Button>
          <Button 
            variant="secondary" 
            type="button"
            onClick={() => navigate("/admin/pacientes")}
          >
             Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminEditarUsuarios;