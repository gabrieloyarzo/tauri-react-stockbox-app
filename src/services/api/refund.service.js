import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/refunds`;

const RefundApi = {
  async getAllRefunds(query) {
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          ...query,
        },
      });
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
      console.error("Error al obtener devolución:", error);
      throw error;
    }
  },

  async createRefund(refundData) {
    try {
      const response = await axios.post(`${API_URL}/create`, refundData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear devolución:", error);
      throw error;
    }
  },

  async updateRefund(refundId, updatedRefundData) {
    try {
      const response = await axios.put(
        `${API_URL}/${refundId}/edit`,
        updatedRefundData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar devolución:", error);
      throw error;
    }
  },

  async deleteRefund(refundId) {
    try {
      const response = await axios.delete(`${API_URL}/${refundId}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar devolución:", error);
      throw error;
    }
  },
};

export default RefundApi;
