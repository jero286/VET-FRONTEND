import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token"));

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACKEND}`,
});

export const configHeader = {
  headers: {
    "content-type": "application/json",
    'auth': `${token}`,
  },
};

export const configHeaderImagen = {
  "content-type": "multipart/form-data",
  'auth': `${token}`,
};

export default clienteAxios