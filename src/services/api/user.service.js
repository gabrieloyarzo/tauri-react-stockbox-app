import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const UserApi = {
  async getAllUsers({
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
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },

  async getUser(userId) {
    try {
	const response = await axios.get(`${API_URL}/${userId}`,{withCredentials : true,});
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
	const response = await axios.post(`${API_URL}/create`, userData,{withCredentials : true,}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  },

  async updateUser(userId, updatedUserData) {
    try {
      const response = await axios.put(
        `${API_URL}/${userId}/edit`,
          updatedUserData, {withCredentials : true,},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
	const response = await axios.delete(`${API_URL}/${userId}/delete`, {withCredentials : true,},{
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  },

  async logUsers(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  },
};

export default UserApi;
