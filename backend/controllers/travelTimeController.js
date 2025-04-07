const travelTimeService = require("../services/travelTimeService");

exports.getTravelInfo = async (req, res) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ error: "출발지와 도착지를 모두 입력해주세요." });
    }

    const result = await travelTimeService.getTravelInfo(from, to);
    res.json(result);
  } catch (error) {
    console.error("이동 시간 계산 오류:", error);
    res.status(500).json({ error: "이동 정보를 가져오는 도중 오류가 발생했습니다." });
  }
};
