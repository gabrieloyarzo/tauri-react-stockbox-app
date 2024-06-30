import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/purchases`;

const PurchaseApi = {
  async getAllPurchases({
    dato = "idpu",
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
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener compras:", error);
      throw error;
    }
  },

  async getPurchase(purchaseId) {
    try {
      const response = await axios.get(`${API_URL}/${purchaseId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener compra:", error);
      throw error;
    }
  },

  async createPurchase(purchaseData) {
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        purchaseData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear compra:", error);
      throw error;
    }
  },

  async updatePurchase(purchaseId, updatedPurchaseData) {
    try {
      const response = await axios.put(
        `${API_URL}/${purchaseId}/edit`,
        updatedPurchaseData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar compra:", error);
      throw error;
    }
  },

  async deletePurchase(purchaseId) {
    try {
      const response = await axios.delete(
        `${API_URL}/${purchaseId}/delete`,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar compra:", error);
      throw error;
    }
  },
};

export default PurchaseApi;
