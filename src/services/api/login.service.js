import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;
const LoginApi = {
  async logUsers(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      throw error;
    }
  },
};

export default LoginApi;
