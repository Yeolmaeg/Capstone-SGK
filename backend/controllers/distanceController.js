const axios = require("axios");

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.getDistanceInfo = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "from과 to 주소를 모두 제공해야 합니다." });
  }

  try {
    // 1️. 직선 거리 계산 (geocoding → haversine formula)
    const [fromRes, toRes] = await Promise.all([
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: { address: from, key: GOOGLE_MAPS_API_KEY },
      }),
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: { address: to, key: GOOGLE_MAPS_API_KEY },
      }),
    ]);

    const fromLoc = fromRes.data.results[0]?.geometry.location;
    const toLoc = toRes.data.results[0]?.geometry.location;

    if (!fromLoc || !toLoc) {
      return res.status(400).json({ error: "주소를 찾을 수 없습니다." });
    }

    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius (km)
    const dLat = toRad(toLoc.lat - fromLoc.lat);
    const dLon = toRad(toLoc.lng - fromLoc.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(fromLoc.lat)) *
        Math.cos(toRad(toLoc.lat)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightDistanceKm = R * c;

    // 2️. 실제 이동 경로 및 시간 (도보, 대중교통, 자차)
    const modes = ["walking", "transit", "driving"];
    const travelResults = {};

    for (const mode of modes) {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/directions/json",
        {
          params: {
            origin: from,
            destination: to,
            mode,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      const route = response.data.routes[0];
      if (route) {
        const leg = route.legs[0];
        travelResults[mode] = {
          duration: leg.duration.text,
          distance: leg.distance.text,
          summary: route.summary,
          steps:
            mode === "transit"
              ? leg.steps
                  .filter((step) => step.travel_mode === "TRANSIT")
                  .map((step) => ({
                    line: step.transit_details?.line?.short_name,
                    vehicle: step.transit_details?.line?.vehicle?.type,
                    departure_stop: step.transit_details?.departure_stop?.name,
                    arrival_stop: step.transit_details?.arrival_stop?.name,
                  }))
              : [],
        };
      }
    }

    return res.json({
      from,
      to,
      straightDistanceKm: straightDistanceKm.toFixed(2),
      travelModes: travelResults,
    });
  } catch (err) {
    console.error("거리 계산 오류:", err.message);
    return res.status(500).json({ error: "거리 계산 중 오류 발생" });
  }
};
