import api from "./axiosInstance.js";

export const registerUser = async ({ fullName, email, password }) => {
  console.log(fullName, email, password);
  
  try {
    const res = await api.post("/auth/register",
    {
      fullName,
      email,
      password,
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login",
      {
        email,
        password
      });
    sessionStorage.setItem("token", res.data.data.token);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logOutUser = () =>{
  return sessionStorage.removeItem("token")
}