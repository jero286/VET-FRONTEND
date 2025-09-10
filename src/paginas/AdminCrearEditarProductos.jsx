import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import clienteAxios from "../funciones_auxiliares/configAxios";
import Swal from "sweetalert2";
import { Button, Container, Form } from "react-bootstrap";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

const AdminCrearEditarProductos = () => {
  cambiarTituloPagina("Productos");
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [formCrearProducto, setFormCrearProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
  });

  const [imagen, setImagen] = useState(null);
  const [imagenExistente, setImagenExistente] = useState(null);

  const obtenerProductoPorId = async () => {
    try {
      const res = await clienteAxios.get(`/productos/${id}`);
      const producto = res.data.producto;
      setFormCrearProducto({
        nombre: producto.nombre,
        precio: producto.precio.toString(), // Convertir a string para el input
        descripcion: producto.descripcion,
      });
      setImagenExistente(producto.imagen);
    } catch (error) {
      console.log("error al obtener producto", error);
      Swal.fire("Error", "No se pudo cargar el producto", "error");
    }
  };

  const handleChangeFormCrearProducto = (ev) => {
    const { name, value, files, type } = ev.target;
    if (type === "file") {
      setImagen(files[0]);
    } else {
      setFormCrearProducto({ ...formCrearProducto, [name]: value });
    }
  };

  const validarFormulario = () => {
    const { nombre, precio, descripcion } = formCrearProducto;
    
    if (!nombre.trim()) {
      Swal.fire("Error", "El nombre es requerido", "error");
      return false;
    }
    
    if (!precio || parseFloat(precio) <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a 0", "error");
      return false;
    }
    
    if (!descripcion.trim()) {
      Swal.fire("Error", "La descripción es requerida", "error");
      return false;
    }
    
    // Solo validar imagen si estamos creando un producto nuevo
    if (!id && !imagen) {
      Swal.fire("Error", "La imagen es requerida", "error");
      return false;
    }
    
    return true;
  };

  const handleClickFormCrearProducto = async (ev) => {
    ev.preventDefault();

    if (!validarFormulario()) return;

    const { nombre, precio, descripcion } = formCrearProducto;

    try {
      const formData = new FormData();
      formData.append("nombre", nombre.trim());
      formData.append("precio", parseFloat(precio));
      formData.append("descripcion", descripcion.trim());
      formData.append("imagen", imagen);

      const res = await clienteAxios.post("/productos", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        Swal.fire({
          title: "¡Producto creado!",
          text: "En breve serás redirigido a la página de productos",
          icon: "success",
          timer: 2000
        });

        // Limpiar formulario
        setFormCrearProducto({
          nombre: "",
          precio: "",
          descripcion: "",
        });
        setImagen(null);

        setTimeout(() => {
          navigate("/admin/productos");
        }, 2000);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      
      // Mostrar error más específico
      const mensaje = error.response?.data?.message || "No se pudo crear el producto";
      Swal.fire("Error", mensaje, "error");
    }
  };

  const handleClickFormEditarProducto = async (ev) => {
    ev.preventDefault();

    if (!validarFormulario()) return;

    const { nombre, precio, descripcion } = formCrearProducto;

    try {
      // Si hay nueva imagen, usar FormData, sino enviar JSON normal
      let res;
      
      if (imagen) {
        const formData = new FormData();
        formData.append("nombre", nombre.trim());
        formData.append("precio", parseFloat(precio));
        formData.append("descripcion", descripcion.trim());
        formData.append("imagen", imagen);
        
        res = await clienteAxios.put(`/productos/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        res = await clienteAxios.put(`/productos/${id}`, {
          nombre: nombre.trim(),
          precio: parseFloat(precio),
          descripcion: descripcion.trim(),
        });
      }

      Swal.fire({
        title: "¡Producto editado!",
        text: "En breve serás redirigido a la página de productos",
        icon: "success",
        timer: 2000
      });

      setTimeout(() => navigate("/admin/productos"), 2000);
    } catch (error) {
      console.error("Error al editar el producto", error);
      
      const mensaje = error.response?.data?.message || "No se pudo editar el producto";
      Swal.fire("Error", mensaje, "error");
    }
  };

  useEffect(() => {
    if (id) {
      obtenerProductoPorId();
    }
  }, [id]);

  return (
    <>
      <h2 className="my-3 text-center">
        {id ? "Editar Producto" : "Crear Nuevo Producto"}
      </h2>
      <hr />
      <Container className="d-flex justify-content-center my-5">
        <Form className="w-25">
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formCrearProducto.nombre}
              onChange={handleChangeFormCrearProducto}
              placeholder="Ingrese el nombre del producto"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio *</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formCrearProducto.precio}
              onChange={handleChangeFormCrearProducto}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formCrearProducto.descripcion}
              onChange={handleChangeFormCrearProducto}
              placeholder="Ingrese la descripción del producto"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>Imagen {!id && "*"}</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChangeFormCrearProducto}
            />
            {id && imagenExistente && (
              <Form.Text className="text-muted">
                Imagen actual: {imagenExistente}
              </Form.Text>
            )}
            {!id && (
              <Form.Text className="text-muted">
                Seleccione una imagen para el producto
              </Form.Text>
            )}
          </Form.Group>

          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              onClick={
                id
                  ? handleClickFormEditarProducto
                  : handleClickFormCrearProducto
              }
            >
              {id ? "Guardar Cambios" : "Crear Producto"}
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => navigate("/admin/productos")}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AdminCrearEditarProductos;