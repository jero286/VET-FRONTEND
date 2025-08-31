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
    precio: 0,
    descripcion: "",
  });

  const [imagen, setImagen] = useState(null);

  const obtenerProductoPorId = async () => {
    try {
      const res = await clienteAxios.get(`/productos/${id}`);
      const producto = res.data.producto;
      setFormCrearProducto({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
      });
      setImagen(producto.imagen);
    } catch (error) {
      console.log("error al obtener producto", error);
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

  const handleClickFormCrearProducto = async (ev) => {
    ev.preventDefault();

    const { nombre, precio, descripcion } = formCrearProducto;

    if (nombre && precio && descripcion && imagen) {
      try {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("descripcion", descripcion);
        formData.append("imagen", imagen);

        const res = await clienteAxios.post("/productos", formData);

        if (res.status === 201) {
          Swal.fire({
            title: "Producto creado!",
            text: "En breve serás redirigido a la página de productos!",
            icon: "success",
          });

          setFormCrearProducto({
            nombre: "",
            precio: 0,
            descripcion: "",
          });
          setImagen(null);

          setTimeout(() => {
            navigate("/admin/productos");
          }, 1000);
        }
      } catch (error) {
        console.error("Error al crear producto:", error);
        Swal.fire("Error", "No se pudo crear el producto", "error");
      }
    } else {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor completa todos los campos",
        icon: "error",
      });
    }
  };

  const handleClickFormEditarProducto = async (ev) => {
    ev.preventDefault();

    const { nombre, precio, descripcion } = formCrearProducto;

    if (nombre && precio && descripcion) {
      try {
        const res = await clienteAxios.put(`/productos/${id}`, {
          nombre,
          precio,
          descripcion,
        });

        Swal.fire({
          title: "Producto editado!",
          text: "En breve serás redirigido a la página de productos!",
          icon: "success",
        });

        setTimeout(() => navigate("/admin/productos"), 1000);
      } catch (error) {
        console.error("Error al editar el producto", error);
        Swal.fire("Error", "No se pudo editar el producto", "error");
      }
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
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formCrearProducto.nombre}
              onChange={handleChangeFormCrearProducto}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formCrearProducto.precio}
              onChange={handleChangeFormCrearProducto}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={formCrearProducto.descripcion}
              onChange={handleChangeFormCrearProducto}
            />
          </Form.Group>
          {!id && (
            <Form.Group className="mb-3" controlId="imagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                onChange={handleChangeFormCrearProducto}
              />
            </Form.Group>
          )}

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
              {id ? "Guardar Datos" : "Crear Nuevo Producto"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AdminCrearEditarProductos;
