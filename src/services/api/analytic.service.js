import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/analytics`;
const API_URL1 = `${import.meta.env.VITE_API_URL}/products`;
const API_URL2 = `${import.meta.env.VITE_API_URL}/purchases`;
const API_URL3 = `${import.meta.env.VITE_API_URL}/sales`;
const API_URL4 = `${import.meta.env.VITE_API_URL}/notifications`;

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

    async getProductsCount() {
        try {
        const response = await axios.get(`${API_URL1}`);
        return response.data.largo;
        } catch (error) {
        console.error("Error al obtener productos y conteo:", error);
        throw error;
        }
    },

    async getPurchasesCount() {
        try {
          const response = await axios.get(`${API_URL2}`);
          return response.data.largo;
        } catch (error) {
          console.error("Error al obtener compras y conteo:", error);
          throw error;
        }
      },

    async getSalesCount() {
        try {
          const response = await axios.get(`${API_URL3}`);
          return response.data.largo;
        } catch (error) {
          console.error("Error al obtener ventas y conteo:", error);
          throw error;
        }
      },

    async getNotificationCount() {
        try {
          const response = await axios.get(`${API_URL4}`);
          return response.data.largo;
        } catch (error) {
          console.error("Error al obtener notificaciones y conteo:", error);
          throw error;
        }
      },
};

export default AnalyticApi;
