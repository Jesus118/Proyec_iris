import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

export const getChatHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log("Token enviado para obtener historial:", token);  // Depuración

    if (!token) {
      console.error("No hay token, no se puede acceder al historial.");
      throw new Error("Token no disponible");
    }

    const response = await axios.get(`${API_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial:', error);
    throw error;
  }
};

export const sendMessage = async (message) => {
  try {
    const token = localStorage.getItem('token');
    console.log("Token enviado para enviar mensaje:", token);  // Depuración

    if (!token) {
      console.error("No hay token, no se puede enviar mensaje.");
      throw new Error("Token no disponible");
    }

    const response = await axios.post(
      `${API_URL}/send`,
      { text: message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    throw error;
  }
};
