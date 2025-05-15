const axios = require("axios");
const apiKey = process.env.PERPLEXITY_API_KEY;

exports.getPlaceInfoFromPerplexity = async (placeName) => {
  console.log("🚀 Perplexity API 호출 준비 중");
  
  const prompt = `다음 장소에 대한 정보를 반드시 JSON 형식으로 알려줘. 정보는 공식 사이트에서 주로 받아와.
장소 이름: ${placeName}
반드시 다음과 같은 키를 포함해서 아래 형식으로 응답해줘:
{
  "title": "장소 이름",
  "location": "정확한 위치 (주소)",
  "latitude": 위도,
  "longitude": 경도,
  "hours": "운영시간"
}
좌표 정보를 반드시 넣어서 줘야 해. 비워두면 안돼`;
try{
  const response = await axios.post('https://api.perplexity.ai/chat/completions', {
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: prompt
        },
      ],
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
    }
  });

  const contentText = response.data.choices?.[0]?.message?.content;
  console.log("📡 Perplexity 응답 상태코드:", response.status);
  console.log("🧾 Perplexity 원시 응답 텍스트:", contentText);

  // 내부 JSON 파싱
  try {
    const jsonStart = contentText.indexOf('{');
    const jsonEnd = contentText.lastIndexOf('}');
    const jsonOnly = contentText.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(jsonOnly);
    console.log("✅ 최종 JSON 파싱 결과:", parsed);
    return parsed;
  } catch (e) {
    console.error("❌ 내부 JSON 파싱 실패:", e);
    throw new Error("Perplexity가 JSON 형식으로 응답하지 않았습니다.");
  }
} catch(err){
  console.error("❌ Perplexity API 요청 실패:", err.message);
  throw new Error("'Perplexity API 호출 실패");
}
};
