import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/sales`;

const SaleApi = {
  async getAllSales() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      throw error;
    }
  },

  async getSale(saleId) {
    try {
      const response = await axios.get(`${API_URL}/${saleId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener venta:", error);
      throw error;
    }
  },

  async createSale(saleData) {
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        saleData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear venta:", error);
      throw error;
    }
  },

  async updateSale(saleId, updatedSaleData) {
    try {
      const response = await axios.put(
        `${API_URL}/${saleId}/edit`,
        updatedSaleData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar venta:", error);
      throw error;
    }
  },

  async deleteSale(saleId) {
    try {
      const response = await axios.delete(
        `${API_URL}/${saleId}/delete`,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar venta:", error);
      throw error;
    }
  },
};

export default SaleApi;
