import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("Token en el interceptor:", token);  // depurar

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("Token no encontrado"); // Si el token no se encuentra
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default api;

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (data) => api.post('/auth/register', data);
export const getEmocionesByUser = (userId) => api.get(`/emociones?usuario_id=${userId}`);
// Funciones para el chat (importantes para que funcionen los mensajes)
export const sendMessage = (message) => api.post('/chat/send', { message });
export const getChatHistory = () => api.get('/chat/history');

