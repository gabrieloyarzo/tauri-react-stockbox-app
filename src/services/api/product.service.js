import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

const ProductApi = {
  async getAllProducts() {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  async getProduct(productId) {
    try {
      const response = await axios.get(`${API_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      throw error;
    }
  },

  async createProduct(productData) {
    console.log("Data:", productData)
  
    try {
      const response = await axios.post(`${API_URL}/create`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  },

  async updateProduct(productId, updatedProductData) {


    try {
      const response = await axios.put(
        `${API_URL}/${productId}/edit`,
        updatedProductData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  },

  async deleteProduct(productId) {
    try {
      const response = await axios.delete(`${API_URL}/${productId}/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  },
};

export default ProductApi;