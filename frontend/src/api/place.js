// src/api/place.js
import apiClient from "./axios";

export const getPlaceInfo = async (placeName) => {
  const response = await apiClient.post("/placeInfo", { placeName });
  return response.data;
};
