const vision = require("@google-cloud/vision");

// Google Vision API 클라이언트 생성 (환경변수 또는 서비스 계정 키 필요)
const client = new vision.ImageAnnotatorClient(
  {
  keyFilename: "/app/keys/dayfull-timetable-e933618fea72.json", // 명시적 경로 지정
  }
);

const performOCR = async (imageBuffer, block) => {
  // 실전에서는 block 좌표에 따라 이미지를 크롭한 후 OCR을 호출하겠지만,
  // 여기선 단순화를 위해 전체 이미지를 대상으로 OCR을 수행합니다.
  const [result] = await client.textDetection({
  image: {
    content: imageBuffer.toString("base64"),
  },
});
  const detections = result.textAnnotations;
  return detections && detections[0] ? detections[0].description : "";
};

module.exports = { performOCR };
