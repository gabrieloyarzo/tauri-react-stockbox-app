import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/refunds`;

const RefundApi = {
  async getAllRefunds() {
    try {
      const response = await axios.get(`${API_URL}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error al obtener devoluciones:", error);
      throw error;
    }
  },

  async getRefund(refundId) {
    try {
      const response = await axios.get(`${API_URL}/${refundId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener devolucion:", error);
      throw error;
    }
  },

  async createProvider(providerData) {
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        providerData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
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
      const response = await axios.delete(
        `${API_URL}/${providerId}/delete`,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      throw error;
    }
  },
};

export default RefundApi;
