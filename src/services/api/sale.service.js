import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/sales`;

const SaleApi = {
  async getAllSales({
    dato = "cod",
    orden = "asc",
    offset = 0,
    limit = 10,
    desde = "",
    hasta = "",
    texto = "",
  } = {}) {
    try {
      const response = await axios.get(
        `${API_URL}?dato=${dato}&orden=${orden}&offset=${offset}&limit=${limit}&desde=${desde}&hasta=${hasta}&texto=${texto}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      throw error;
    }
  },

  async getSale(saleId) {
    try {
      const response = await axios.get(`${API_URL}/${saleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener venta:", error);
      throw error;
    }
  },

  async createSale(saleData) {
    try {
      const response = await axios.post(`${API_URL}/create`, saleData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      const response = await axios.delete(`${API_URL}/${saleId}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar venta:", error);
      throw error;
    }
  },
};

export default SaleApi;
