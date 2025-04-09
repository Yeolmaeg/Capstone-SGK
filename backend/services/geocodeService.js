const axios = require('axios');
require("dotenv").config();

const getGeocode = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  const response = await axios.get(url);
  const data = response.data;
  if (data.status !== "OK" || data.results.length === 0) {
    throw new Error(`Geocoding failed for address: ${address}`);
  }
  const location = data.results[0].geometry.location;
  return { latitude: location.lat, longitude: location.lng };
};

module.exports = { getGeocode };
