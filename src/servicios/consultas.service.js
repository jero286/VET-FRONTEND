
// src/servicios/consultas.service.js

const API_URL = "http://localhost:5000/api/consultas";

/**
 * Envía una nueva consulta al backend
 * @param {Object} datos - Objeto con nombre, email, mensaje y plan
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export const enviarConsulta = async (datos) => {
  try {
    const respuesta = await fetch(API_URL, {
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

/**
 * Obtiene todas las consultas desde el backend
 * @returns {Promise<Array>} - Lista de consultas
 */
export const obtenerConsultas = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
      throw new Error("No se pudieron obtener las consultas");
    }
    return await respuesta.json();
  } catch (error) {
    console.error("Error en obtenerConsultas:", error);
    throw error;
  }
};

// export const enviarConsulta = async (datos) => {
//   try {
//     const respuesta = await fetch("http://localhost:5000/api/consultas", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(datos),
//     });

//     if (!respuesta.ok) {
//       throw new Error("No se pudo enviar la consulta");
//     }

//     return await respuesta.json();
//   } catch (error) {
//     console.error("Error en enviarConsulta:", error);
//     throw error;
//   }
// };

//  export const obtenerConsultas = async () => {
//   const res = await fetch("http://localhost:5000/api/consultas");
//   return res.json();
// };
