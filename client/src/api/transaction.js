import api from "./axiosInstance.js";


export const transactions = async(data) =>{
  try {
    const { page, limit } = data;
    
    const res = await api.get(`/transactions?page=${page}&limit=${limit}`)
    return res;

  } catch (error) {
    console.error(error);
    throw error;
  }
}