import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/analytics`;

const AnalyticApi = {
  async getAnalyticData() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos analíticos:", error);
      throw error;
    }
  },
};

export default AnalyticApi;
