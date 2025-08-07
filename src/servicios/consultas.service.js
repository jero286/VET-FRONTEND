// consultas.service.js

export const enviarConsulta = async (datos) => {
  try {
    const respuesta = await fetch("http://localhost:5000/api/consultas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo enviar la consulta");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error en enviarConsulta:", error);
    throw error;
  }
};

 export const obtenerConsultas = async () => {
  const res = await fetch("http://localhost:5000/api/consultas");
  return res.json();
};
