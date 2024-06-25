import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/providers`;

const ProviderApi = {
  async getAllProviders({
    dato = "rutp",
    orden = "asc",
    offset = 0,
    limit = 10,
  } = {}) {
    try {
      const response = await axios.get(
          `${API_URL}?dato=${dato}&orden=${orden}&offset=${offset}&limit=${limit}`, {withCredentials : true,}
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      throw error;
    }
  },

  async getProvider(providerId) {
    try {
      const response = await axios.get(`${API_URL}/${providerId}`, {withCredentials : true,});
      return response.data;
    } catch (error) {
      console.error("Error al obtener proveedor:", error);
      throw error;
    }
  },

  async createProvider(providerData) {
    try {
	const response = await axios.post(`${API_URL}/create`, providerData, {withCredentials : true,},{
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
          updatedProviderData,{withCredentials : true,},
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
	const response = await axios.delete(`${API_URL}/${providerId}/delete`, {withCredentials : true,},{
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
