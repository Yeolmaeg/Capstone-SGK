module.exports.parseDuration = (text) => {
  if (!text || typeof text !== "string") return null;

  const match = text.match(/\d+/); // "12분" → 12
  return match ? parseInt(match[0], 10) : null;
};
