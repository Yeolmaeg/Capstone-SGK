const http = require("http");

// 서버가 실행될 포트 번호
const PORT = process.env.PORT || 5000;

// 서버 생성
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Backend server is running without Express!");
});

// 서버 실행
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
