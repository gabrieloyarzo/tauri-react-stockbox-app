import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/clients`;

export const ClientApi = {
  async getAllProducts() {
    try {
      const response = await axios.get(`${API_URL}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      throw error;
    }
  },

  async getClient(clientId) {
    try {
      const response = await axios.get(`${API_URL}/${clientId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener cliente:", error);
      throw error;
    }
  },

  async createClient(clientData) {
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        clientData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear cliente:", error);
      throw error;
    }
  },

  async updateClient(clientId, updatedClientData) {
    try {
      const response = await axios.put(
        `${API_URL}/${productId}/edit`,
        updatedClientData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      throw error;
    }
  },

  async deleteClient(clientId) {
    try {
      const response = await axios.delete(
        `${API_URL}/${clientId}/delete`,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      throw error;
    }
  },
};

export default ClientApi;
