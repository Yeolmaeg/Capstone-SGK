const axios = require('axios');

async function extractKeywords(description) {
  const prompt = `다음 장소 설명을 기반으로 사용자의 선호를 대표할 수 있는 키워드 3개를 뽑아줘. 다른 말은 절대 하지 말고 키워드만 텍스트로 보내.
  키워드를 제외한 아무말도 응답하지 마. 대답도 하지 마. 키워드는 반드시 띄어쓰기 없이 한 개의 단어로 이루어져 있어야 해. 쉼표로 구분해서 제공해줘.\n설명: "${description}"`;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    }
  });

  const content = response.data.choices[0].message.content;
  return content.split(',').map(k => k.trim());
}

module.exports = { extractKeywords };