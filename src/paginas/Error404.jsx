import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 text-center p-4"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/b8/94/6b/b8946b5fdf7c0be0c0cd3b2fc708788e.jpg')",
        
      }}
    >
    <div className="d-flex align-items-center justify-content-center text-center p-4">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Perrito triste"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <h1 className="display-4 fw-bold text-primary">404</h1>
        <div className="d-flex- flex-colum justify-content-center bg-white text-center p-4">
        <h2 className="mb-3 fw-semibold">¡Ups! Página no encontrada</h2>
        <p className="mb-4 text-muted">
          Lo sentimos, la página que estás buscando no existe o fue movida. 🐾
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
        </div>
      </div>
    </div>
    </div>
  );
}