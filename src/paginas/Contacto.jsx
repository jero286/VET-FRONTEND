import { useState } from "react";
import axios from "axios";
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
      await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/contacto`, formData);
      setEnviado(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (err) {
      setError("Hubo un error al enviar el mensaje.");
    }
  };
  return (
    <div  style={{
      backgroundImage:
        "url('https://i.pinimg.com/1200x/d7/2d/23/d72d236e94f257af28b37f792e71a177.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "3rem",
      color: "white",
      position: "relative",}}
     >
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">💌 Contáctanos</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
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
                  <label htmlFor="email" className="form-label fw-semibold">Email</label>
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
                  <label htmlFor="mensaje" className="form-label fw-semibold">Mensaje</label>
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
                <div className="alert alert-success mt-3 text-center" role="alert">
                  ¡Mensaje enviado con éxito! 💕
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3 text-center" role="alert">
                  {error}
                </div>
              )}
              <hr className="mt-5" />
              <div className="text-center small text-muted">
                <p><strong>📍 Dirección:</strong> General Paz 576, Tucumán</p>
                <p><strong>📞 Teléfono:</strong> +54 381 123 4567</p>
                <p><strong>📧 Email:</strong> contacto@vetcare.com</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
  );
}