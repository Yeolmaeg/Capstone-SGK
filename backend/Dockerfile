# 빌드
FROM node:18 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


RUN npm run build
COPY . .
# 실행
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./
RUN npm install

# 환경 변수
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]
