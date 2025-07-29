import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light text-center p-4">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Perrito triste"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <h1 className="display-4 fw-bold text-danger">404</h1>
        <h2 className="mb-3 fw-semibold">¡Ups! Página no encontrada</h2>
        <p className="mb-4 text-muted">
          Lo sentimos, la página que estás buscando no existe o fue movida. 🐾
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}