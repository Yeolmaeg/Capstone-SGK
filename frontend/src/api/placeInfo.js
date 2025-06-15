// src/api/placeInfo.js
import apiClient from "../api/axios";

const BASE_URL = "http://localhost:5000/api";

export const getPlaceInfo = async (placeName) => {
  const response = await apiClient.post(`${BASE_URL}/placeInfo`, { placeName });
  return response.data;
};
