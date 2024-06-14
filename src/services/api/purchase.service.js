import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/purchases`;

const PurchaseApi = {
  async getAllPurchases() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener compras:", error);
      throw error;
    }
  },

  async getPurchase(purchaseId) {
    try {
      const response = await axios.get(`${API_URL}/${purchaseId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener compra:", error);
      throw error;
    }
  },

  async createPurchase(purchaseData) {
    try {
      const response = await axios.post(`${API_URL}/create`, purchaseData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      const response = await axios.delete(`${API_URL}/${purchaseId}/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar compra:", error);
      throw error;
    }
  },
};

export default PurchaseApi;
