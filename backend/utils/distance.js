const haversine = require("haversine-distance");

exports.findNearestSchedule = (schedules, place) => {
  let minDistance = Infinity;
  let nearest = null;

  for (const sched of schedules) {
    if (!sched.latitude || !sched.longitude) continue;

    const from = { latitude: sched.latitude, longitude: sched.longitude };
    const to = { latitude: place.latitude, longitude: place.longitude };
    const dist = haversine(from, to);

    if (dist < minDistance) {
      minDistance = dist;
      nearest = sched;
    }
  }

  return nearest;
};
