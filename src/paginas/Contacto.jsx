import { useState } from "react";
import clienteAxios from "../funciones_auxiliares/configAxios";
import { cambiarTituloPagina } from "../funciones_auxiliares/cambiarTituloPagina";

export default function Contacto() {
  cambiarTituloPagina("Contacto");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await clienteAxios.post("/api/consultas", formData);
      setEnviado(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (err) {
      setError("Hubo un error al enviar el mensaje.");
    }
  };

  return (
    <div className="position-relative d-flex flex-column min-vh-100">
      <div
        id="carouselFondo"
        className="carousel slide position-absolute top-0 start-0 w-100 h-100 z-n1"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner h-100">
          <div className="carousel-item active h-100">
            <img
              src="https://escuelafarmacia.com/wp-content/uploads/cl%C3%ADnica-veterinaria.jpg"
              className="d-block w-100 h-100 object-fit-cover"
              alt="fondo1"
            />
          </div>
          <div className="carousel-item h-100">
            <img
              src="https://hospitalveterinario.cr/wp-content/uploads/2020/04/Que-es-un-Medico-Veterinario-blog-1.jpg"
              className="d-block w-100 h-100 object-fit-cover"
              alt="fondo2"
            />
          </div>
          <div className="carousel-item h-100">
            <img
              src="https://facultades.unab.cl/cienciasdelavida/wp-content/uploads/2022/02/AdobeStock_107432576-scaled.jpeg"
              className="d-block w-100 h-100 object-fit-cover"
              alt="fondo3"
            />
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4 text-primary fw-bold">
                  💌 Contáctanos
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label fw-semibold">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tuemail@ejemplo.com"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label fw-semibold">
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      className="form-control"
                      rows="5"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribinos tu consulta"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Enviar mensaje
                  </button>
                </form>

                {enviado && (
                  <div
                    className="alert alert-success mt-3 text-center"
                    role="alert"
                  >
                    ¡Mensaje enviado con éxito! 💕
                  </div>
                )}
                {error && (
                  <div
                    className="alert alert-danger mt-3 text-center"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <hr className="mt-5" />
                <div className="text-center small text-muted">
                  <p>
                    <strong>📍 Dirección:</strong> General Paz 576, Tucumán
                  </p>
                  <p>
                    <strong>📞 Teléfono:</strong> +54 381 123 4567
                  </p>
                  <p>
                    <strong>📧 Email:</strong> contacto@vetcare.com
                  </p>
                  <p>
                    <strong>🌐 Instagram:</strong>{" "}
                    <a
                      href="https://instagram.com/vetcare"
                      className="text-decoration-none"
                    >
                      {" "}
                      @vetapp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
