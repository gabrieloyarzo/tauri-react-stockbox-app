import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/refunds`;

const RefundApi = {
  async getAllRefunds({
    dato = "idr",
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
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener devoluciones:", error);
      throw error;
    }
  },

  async getRefund(refundId) {
    try {
      const response = await axios.get(`${API_URL}/${refundId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener devolucion:", error);
      throw error;
    }
  },

  async createProvider(providerData) {
    try {
      const response = await axios.post(`${API_URL}/create`, providerData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      throw error;
    }
  },

  async updateProvider(providerId, updatedProviderData) {
    try {
      const response = await axios.put(
        `${API_URL}/${providerId}/edit`,
        updatedProviderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      throw error;
    }
  },

  async deleteProvider(providerId) {
    try {
      const response = await axios.delete(`${API_URL}/${providerId}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      throw error;
    }
  },
};

export default RefundApi;
