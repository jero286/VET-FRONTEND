// src/funciones_auxiliares/configAxios.js
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND, // la URL de tu backend desde .env
});

// Interceptor para agregar el token automáticamente
clienteAxios.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    console.log("[axios interceptor] token:", token);

    if (token) {
      // Elimina comillas sobrantes si quedaron al guardar en sessionStorage
      token = token.replace(/^["']|["']$/g, "");
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si no tiene Content-Type, lo ponemos como JSON
    if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default clienteAxios;
