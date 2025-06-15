import apiClient from "../api/axios";

export const getUserInfo = async (userId) => {
  const res = await apiClient.get(`/user/${userId}`);
  return res.data;
};

export const updateUserInfo = async (userId, data) => {
  const res = await apiClient.patch(`/user/${userId}`, data);
  return res.data;
};