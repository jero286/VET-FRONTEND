import { useState } from "react";
import { useParams } from "react-router-dom";
import { cambiarPassword } from "../servicios/authService";

const NuevaContrasena = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cambiarPassword(token, password);
      setMensaje("✅ ¡Contraseña actualizada correctamente!");
    } catch (error) {
      setMensaje("❌ El enlace expiró o es inválido.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Escribí tu nueva contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-6 border rounded-xl"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Cambiar contraseña
          </button>
        </form>
        {mensaje && <p className={`mt-6 ${mensaje.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default NuevaContrasena;
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";


// const NuevaContrasena = () => {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");
//   const [mensaje, setMensaje] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://localhost:5000/api/usuarios/reestablecer/${token}`, { password });
//       setMensaje("¡Contraseña actualizada correctamente!");
//     } catch (error) {
//       setMensaje("El enlace expiró o es inválido.");
//     }
//   };

//   return (
//     <div>
//       <h2>Escribí tu nueva contraseña</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="Nueva contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Cambiar contraseña</button>
//       </form>
//       {mensaje && <p>{mensaje}</p>}
//     </div>
//   );
// };

// export default NuevaContrasena;
