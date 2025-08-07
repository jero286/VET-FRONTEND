import { useState } from "react";
import axios from "axios";
import './RecuperarContrasena.css';


const RecuperarContrasena = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email a enviar:", email);
        try {
            await axios.post("http://localhost:5000/usuarios/recoveryPassEmail", {
  emailUsuario: email
});


            setMensaje("📧 Revisá tu correo para continuar con el cambio de contraseña.");
        } catch (error) {
            setMensaje("⚠️ Hubo un error. ¿El email es correcto?");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl px-10 py-12 w-full max-w-sm text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Recuperar contraseña
                </h2>
                <p className="text-gray-600 mb-8">
                    Ingresá tu correo electrónico y te enviaremos las instrucciones.
                </p>
                <form onSubmit={handleSubmit} className="form-recuperar">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-recuperar"
                    />
                    <button
                        type="submit"
                        className="boton-recuperar"
                    >
                        Enviar instrucciones
                    </button>
                </form>
                {mensaje && (
                    <p className="mt-6 text-sm text-gray-700">{mensaje}</p>
                )}
            </div>
        </div>
    );
};

export default RecuperarContrasena;



