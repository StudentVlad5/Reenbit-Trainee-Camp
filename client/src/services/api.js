import axios from "axios";

const BASE_URL = "https://reenbit-trainee-camp.vercel.app/api";
// const BASE_URL = "http://localhost:3030/api";

export const getAllUsers = async (user_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/${user_id}`);
    return res;
  } catch (error) {
    return error.message;
  }
};
export const sendMessage = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/messages/create`, data);
    return res;
  } catch (error) {
    return error.message;
  }
};
export const editMessage = async (data) => {
  try {
    const res = await axios.patch(`${BASE_URL}/messages/edit`, data);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const deleteMessage = async (data) => {
  try {
    const res = await axios.delete(`${BASE_URL}/messages/delete/${data}`);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const getMessage = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/messages/get`, data);
    return res;
  } catch (error) {
    return error.message;
  }
};
