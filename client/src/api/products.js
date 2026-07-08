import api from "./axiosInstance.js";

export const createProduct = async (data) => {
  try {
    const res = await api.post("/products/", data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const res = await api.get("/products/");
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (data) => {
  const { amount, type, productId } = data;
  try {
    const res = await api.patch(`/products/${productId}/stock`, { amount, type });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
