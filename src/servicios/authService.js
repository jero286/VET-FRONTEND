import axios from "axios";

const API_URL = "http://localhost:5000/usuarios";

export const solicitarRecuperacion = (email) => {
  return axios.post(`${API_URL}/recuperar`, { email }); // Asegúrate que el backend espera "email"
};

export const cambiarPassword = (token, password) => {
  return axios.post(`${API_URL}/reestablecer/${token}`, { password });
};

