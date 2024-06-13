import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/providers`;

const ProviderApi = {
  async getAllProviders() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      throw error;
    }
  },

  async getProvider(providerId) {
    try {
      const response = await axios.get(`${API_URL}/${providerId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener proveedor:", error);
      throw error;
    }
  },

  async createProvider(providerData) {
    try {
      const response = await axios.post(`${API_URL}/create`, providerData, {
        headers: {
          "Content-Type": "application/json",
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
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      throw error;
    }
  },
};

export default ProviderApi;
