// Perplexity로 장소 정보 얻어오는 기능 (프론트에서 사용자 id, 장소명 받음)
// perplexity API 연동 완료 (api 키는 일단 빼놓을게요)
// Perplexity prompt 조정 
//   1. 파싱 작업 중 text 구조 조정 해서 각 항목에 저장 잘 되게 (완)
//   2. 되도록 공신력 있는 문서에서 검색하도록 (완)
// .env 파일 반영 확인 -> 에러 나서 그냥 직접 키 입력

console.log("서버 실행 준비 중");

const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

const apiKey = "pplx";

console.log("🚀 서버 실행 준비 중"); // express.json()은 request body를 JSON으로 읽을 수 있게 해줌줌
console.log("📦 API KEY 로드됨:", apiKey);


// Perplexity로 장소 정보 가져옴
async function getPlaceInfoFromPerplexity(placeName) {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: `다음 장소에 대한 정보를 반드시 JSON 형식으로 알려줘. 정보는 공식 사이트에서 주로 받아와.
장소 이름: ${placeName}
반드시 다음과 같은 키를 포함해서 아래 형식으로 응답해줘:
{
  "name": "장소 이름",
  "location": "정확한 위치 (주소)",
  "hours": "운영시간",
  "description": "이 장소를 설명하는 한 문장"
}`,
        },
      ],
    }),
  });

  const text = await response.text();
  console.log("📩 원시 응답 내용:", text); // 이 줄이 이미 있으니까 그대로 두면 돼

  console.log(`📡 퍼플렉시티 응답 상태: ${response.status}`);

  if (!response.ok) {
    console.error(`❌ Perplexity API Error: ${response.status}`, text);
    throw new Error('Perplexity API 호출 실패');
  }

  let contentText;
  try {
    const outer = JSON.parse(text); // 1차 파싱
    contentText = outer.choices?.[0]?.message?.content;
    console.log("🧾 Perplexity content 부분:", contentText);
  } catch (e) {
    console.error("❌ 1차 JSON 파싱 실패:", e);
    throw new Error("Perplexity 응답 구조가 예상과 다릅니다.");
  }

  let parsed;
try {
  // JSON 형태만 추출
  const jsonStart = contentText.indexOf('{');
  const jsonEnd = contentText.lastIndexOf('}');
  const jsonOnly = contentText.slice(jsonStart, jsonEnd + 1);

  parsed = JSON.parse(jsonOnly);
  console.log("✅ 내부 JSON 파싱 결과:", parsed);
} catch (e) {
  console.error("❌ 내부 JSON 파싱 실패:", e);
  throw new Error("Perplexity가 JSON 형식으로 응답하지 않았습니다.");
}
return parsed;
}


// 실제 API 경로 만들기기
router.post("/place-info", async (req, res) => { // /api/place-info라는 주소로 POST 요청이 오면 실행
  const { placeName } = req.body; // 사용자가 입력한 장소 이름 받아옴 

  if (!placeName) { // 장소 요청 없으면 에러 보냄냄
    return res.status(400).json({ error: 'placeName is required' });
  }

  try { // 퍼플렉시티에서 정보 잘 받으면 그대로 보내줌
    const info = await getPlaceInfoFromPerplexity(placeName);
    res.json(info);
  } catch (err) {
    console.error('Perplexity API Error:', err);
    res.status(500).json({ error: '장소 정보 수집 실패' });
  }
});

module.exports = router;
