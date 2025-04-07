// DebugTest.jsx
import React, { useEffect } from "react";

const DebugTest = () => {
  useEffect(() => {
    console.log("🧪 DebugTest 컴포넌트 마운트됨");
  }, []);

  return <h1 onClick={() => console.log("👆 텍스트 클릭됨")}>로그 테스트</h1>;
};

export default DebugTest;
