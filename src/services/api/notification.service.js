import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/notifications`;

const NotificationApi = {
  async getAllNotifications() {
    try {
      const response = await axios.get(`${API_URL}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
      throw error;
    }
  },

  async getNotification(notificationId) {
    try {
      const response = await axios.get(`${API_URL}/${notificationId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener notificacion:", error);
      throw error;
    }
  },

  async createNotification(notificationData) {
    try {
      const response = await axios.post(
        `${API_URL}/create`,
        notificationData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear notificacion:", error);
      throw error;
    }
  },

  async updateNotification(notificationId, updatedNotificationData) {
    try {
      const response = await axios.put(
        `${API_URL}/${notificationId}/edit`,
        updatedNotificationData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar notificacion:", error);
      throw error;
    }
  },

  async deleteNotification(notificationId) {
    try {
      const response = await axios.delete(
        `${API_URL}/${notificationId}/delete`,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar notificacion:", error);
      throw error;
    }
  },
};

export default NotificationApi;
