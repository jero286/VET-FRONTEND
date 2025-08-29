import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import clienteAxios from "../funciones_auxiliares/configAxios";
import Swal from "sweetalert2";

const UsuarioCrearEditarMascota = () => {
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  const [formMascota, setFormMascota] = useState({
    nombre: "",
    edad: "",
    especie: "",
    raza: "",
    sexo: "",
  });

  const handleChangeMascota = (ev) => {
    const { name, value } = ev.target;
    setFormMascota({ ...formMascota, [name]: value });
  };

  const handleClickMascota = async (ev) => {
    try {
      ev.preventDefault();
      const erroresForm = {};
      const { nombre, edad, especie, raza, sexo } = formMascota;
      if (!nombre) {
        erroresForm.nombre = "Campo Nombre esta vacio";
      }
      if (!edad) {
        erroresForm.edad = "Campo Edad esta vacio";
      }
      if (!especie) {
        erroresForm.especie = "Campo Especie esta vacio";
      }
      if (!raza) {
        erroresForm.raza = "Campo Raza esta vacio";
      }
      if (!sexo) {
        erroresForm.sexo = "Sexo de mascota no seleccionado";
      }
      setErrores(erroresForm);
      if (Object.keys(erroresForm).length > 0) return;
      const idUsuario = JSON.parse(sessionStorage.getItem("idUsuario"));
      await clienteAxios.post("/mascotas", {
        nombre,
        edad,
        especie,
        raza,
        sexo,
        idUsuario,
      });
      Swal.fire({
        title: "Mascota registrada",
        icon: "success",
      });
      setFormMascota({
        nombre: "",
        edad: "",
        especie: "",
        raza: "",
        sexo: "",
      });
      navigate("/usuario/mascotas");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al registrar la mascota",
        text: "Revisá los campos o contactá al administrador.",
      });
    }
  };
  return (
    <>
      <Container className="w-25 my-5">
        <Form>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formMascota.nombre}
              onChange={handleChangeMascota}
              isInvalid={!!errores.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errores.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="edad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              name="edad"
              value={formMascota.edad}
              onChange={handleChangeMascota}
              isInvalid={!!errores.edad}
            />
            <Form.Control.Feedback type="invalid">
              {errores.edad}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="especie">
            <Form.Label>Especie</Form.Label>
            <Form.Control
              type="text"
              name="especie"
              value={formMascota.especie}
              onChange={handleChangeMascota}
              isInvalid={!!errores.especie}
            />
            <Form.Control.Feedback type="invalid">
              {errores.especie}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="raza">
            <Form.Label>Raza</Form.Label>
            <Form.Control
              type="text"
              name="raza"
              value={formMascota.raza}
              onChange={handleChangeMascota}
              isInvalid={!!errores.raza}
            />
            <Form.Control.Feedback type="invalid">
              {errores.raza}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="sexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Select
              name="sexo"
              value={formMascota.sexo}
              onChange={handleChangeMascota}
              isInvalid={!!errores.sexo}
            >
              <option value="">Seleccione una opción</option>
              <option value="macho">macho</option>
              <option value="hembra">hembra</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errores.sexo}
            </Form.Control.Feedback>
          </Form.Group>
          <Container className="text-center">
            <Button
              variant="primary"
              type="submit"
              onClick={handleClickMascota}
            >
              Enviar Datos
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default UsuarioCrearEditarMascota;
