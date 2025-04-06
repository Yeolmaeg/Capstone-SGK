// services/travelTimeService.js (업데이트 버전)
const axios = require("axios");
const haversine = require("haversine-distance");

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getCoordinates = async (address) => {
  const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      address,
      key: GOOGLE_MAPS_API_KEY,
    },
  });

  const location = response.data.results[0]?.geometry?.location;
  if (!location) throw new Error("주소를 좌표로 변환할 수 없습니다.");
  return location; // { lat: ..., lng: ... }
};

const formatTransitStepKorean = (step) => {
  const vehicleTypeKor = {
    BUS: "버스",
    SUBWAY: "지하철",
    TRAIN: "기차",
  };

  return {
    line: step.transit_details.line.short_name,
    vehicle: vehicleTypeKor[step.transit_details.line.vehicle.type] || step.transit_details.line.vehicle.type,
    departure_stop: step.transit_details.departure_stop.name,
    arrival_stop: step.transit_details.arrival_stop.name,
  };
};

exports.getTravelInfo = async (from, to) => {
  const [origin, destination] = await Promise.all([
    getCoordinates(from),
    getCoordinates(to),
  ]);

  // 직선거리 계산 (미터 → km)
  const distanceMeters = haversine(origin, destination);
  const straightDistance = (distanceMeters / 1000).toFixed(2) + " km";

  const modes = ["walking", "driving", "transit"];
  const travelTimes = {};

  for (const mode of modes) {
    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
        params: {
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`,
          mode,
          key: GOOGLE_MAPS_API_KEY,
          language: "ko", // 한국어 반환
        },
      });

      const route = response.data.routes[0];
      if (!route) {
        travelTimes[mode] = "정보 없음";
        continue;
      }

      const duration = route.legs[0].duration.text; // 한국어
      if (mode === "transit") {
        travelTimes.transit = duration;
        travelTimes.transit_details = route.legs[0].steps
          .filter((step) => step.travel_mode === "TRANSIT")
          .map(formatTransitStepKorean);
      } else {
        travelTimes[mode] = duration; // 예: "17분"
      }
    } catch (err) {
      console.error(`${mode} 모드 오류:`, err.message);
      travelTimes[mode] = "정보 없음";
    }
  }

  return {
    straightDistance,
    travelTimes,
  };
};
