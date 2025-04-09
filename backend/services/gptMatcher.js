function getMaxCommonSubstringLength(a, b) {
  // 공백 제거: 예를 들어 "운영 체제" → "운영체제"
  const str1 = a.replace(/\s+/g, "");
  const str2 = b.replace(/\s+/g, "");
  
  let maxLen = 0;
  // 최소 2글자부터 검사
  for (let i = 0; i < str1.length; i++) {
    for (let len = 2; len <= str1.length - i; len++) {
      const substr = str1.substr(i, len);
      if (str2.includes(substr) && len > maxLen) {
        maxLen = len;
      }
    }
  }
  return maxLen;
}

const decideBestMatchByName = async (candidates, ocrText) => {
  let bestCandidate = null;
  let bestScore = 0;
  for (const candidate of candidates) {
    // candidate.name와 ocrText 모두 공백 제거 후 비교합니다.
    const score = getMaxCommonSubstringLength(candidate.name, ocrText);
    if (score >= 2 && score > bestScore) {
      bestScore = score;
      bestCandidate = candidate;
    }
  }
  return bestCandidate;
};

module.exports = { decideBestMatchByName };
