const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "/app/keys/dayfull-timetable-e933618fea72.json",
});

/**
 * 이미지 URL로 OCR 수행
 * @param {string} imageUrl - 공개된 S3 이미지 URL
 * @param {object} block - OCR 그리드 블록 정보 (디버깅용)
 */
const performOCR = async (imageUrl, block) => {
  const [result] = await client.textDetection({
    image: {
      source: {
        imageUri: imageUrl, // ✅ URL 사용
      },
    },
  });
  const detections = result.textAnnotations;
  return detections && detections[0] ? detections[0].description : "";
};

module.exports = { performOCR };
