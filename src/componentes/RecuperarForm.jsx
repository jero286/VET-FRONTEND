
import { useState } from "react";
import { solicitarRecuperacion } from "../servicios/authService"; 

const RecuperarForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await solicitarRecuperacion(email); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Recuperar contraseña</button>
    </form>
  );
};

export default RecuperarForm;
