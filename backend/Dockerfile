# 빌드
FROM node:18 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# 실행
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./
RUN npm install --production

# 환경 변수
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]
