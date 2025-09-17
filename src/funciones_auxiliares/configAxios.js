import axios from "axios";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
});

clienteAxios.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");

    if (token) {
      token = token.replace(/^["']|["']$/g, "");
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default clienteAxios;
