import axios from "axios";

// const BASE_URL = "http://localhost:3030/api";
const BASE_URL = "https://reenbit-trainee-camp.vercel.app/api";
const header = {
  // "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS, HEAD",
  "Access-Control-Expose-Headers": "Content-Range",
};

export const signUp = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, credentials, {
      headers: header,
    });
    return res;
  } catch (error) {
    return error.message;
  }
};

export const signIn = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signin`, credentials, {
      headers: header,
    });
    return res;
  } catch (error) {
    return error.message;
  }
};

export const singOut = async () => {
  const res = await axios.post(`${BASE_URL}/auth/logout`, {
    headers: header,
  });
  return res;
};

export const updateUserData = async (updateData) => {
  const formData = new FormData();
  updateData?.avatar && formData.set("avatar", updateData.avatar);
  updateData?.userName && formData.append("userName", updateData.userName);
  updateData?.email && formData.append("email", updateData.email);
  updateData?.password && formData.append("password", updateData.password);
  updateData?.phone && formData.append("phone", updateData.phone);
  updateData?.birthday && formData.append("birthday", updateData.birthday);
  updateData?.location && formData.append("location", updateData.location);
  updateData?.role && formData.append("role", updateData.role);
  const { data } = await axios.post(
    `${BASE_URL}/auth/${updateData._id}`,
    formData,
    {
      headers: header,
    }
  );
  return data;
};

export const refreshUserToken = async () => {
  const { data } = await axios.post(`${BASE_URL}/auth`, {
    headers: header,
  });
  return data;
};

export async function changePassword(pathParams, body) {
  const formData = new FormData();
  formData.append("password", body);
  return axios.patch(`${BASE_URL}/auth/user/${pathParams}`, formData, {
    headers: header,
  });
}
