# 📆 E-CLAIR: Dayfull


[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-22.13.1-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-6.2-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-20.10-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT4o-412991?style=flat&logo=openai&logoColor=white)](https://openai.com/)
[![Perplexity](https://img.shields.io/badge/Perplexity-AI-black?style=flat)](https://www.perplexity.ai/)

---

## 📌 프로젝트 개요

> 대학생의 하루를 다채롭게 채워주는 스마트 일정 관리 서비스, **Dayfull**

**Dayfull**은 대학 강의 시간표와 통합된 일정 자동 생성, 가고 싶은 장소 자동 배치, 그리고 개인화된 장소 추천 기능을 제공하는 **스마트 캘린더 플랫폼**입니다.

---

## 👥 팀 정보

**44팀 E-CLAIR**

| 이름 | 역할 |
|------|------|
| 구자은 | 프론트엔드 / UI 디자인 |
| 궁유진 | 백엔드 / AI |
| 손수민 | 백엔드 / AI |

---

## 🔍 주요 기능

### 📅 1. 시간표 OCR 기반 일정 생성
- **에브리타임** 시간표 이미지를 업로드하면, OCR로 강의명/시간/장소 정보를 추출하고 자동 반복 일정을 생성합니다.
- → `Google Vision API`, `PostgreSQL`

### 📍 2. 장소명 입력만으로 자동 일정 배치
- 사용자가 입력한 장소명에 대해 위치, 운영시간, 거리 정보를 탐색한 후 **가장 효율적인 시간대에 일정 자동 배치**
- → `Perplexity API`, `TMAP / Google Maps API`, `Redis`, `PostgreSQL`

### 🌟 3. 개인화 기반 장소 추천
- 타임라인의 빈 시간대를 클릭하면 사용자의 동선, 선호 키워드를 고려해 추천 장소를 제시
- 추천된 장소는 한 줄 소개, 이동 수단별 소요 시간과 함께 제공되고 바로 일정으로 추가 가능
- → `GPT`, `Redis`, `Perplexity API`, `Kakao Local API`, `TMAP API`

---

## 🎨 서비스 플로우 (Figma)

👉 [Figma 링크 보기](https://www.figma.com/design/Fk1fj1MQfqRAMOVf8soijl/Dayfull---1%EC%B0%A8-%EB%B3%B4%EA%B3%A0%EC%84%9C?node-id=0-1)

---

## 🗂️ Source Code

해당 프로젝트는 코드 가독성 향상 및 기능별 유지보수 용이를 위해 `controllers`, `routes`, `services` 구조로 분리하여 구현하였다. 

`controllers`는 클라이언트 요청을 받아 서비스에 전달하고 응답을 반환하는 입구 역할, `routes`는 URL 경로와 HTTP 메서드에 따라 어떤 controller 함수를 호출할지 정의한다. `services`는 실제 비즈니스 로직을 수행하는 핵심 계층이다.


```
/Capstone-SGK(main)
├── backend  # Node.js 기반 백엔드 서버
│   ├── controllers  # 각 기능별로 라우팅 요청을 받아 서비스 호출
│   │   ├── addressController.js  # 사용자 주소 관리 기능
│   │   ├── autoScheduleController.js  # 장소명 기반 일정 생성 기능
│   │   ├── feedbackController.js  # 피드백 저장 및 키워드 추출 기능
│   │   ├── placeController.js  # 장소 CRUD 기능
│   │   ├── placeInfoController.js  # 장소 정보 브라우징 기능
│   │   ├── recommendationController.js  # 추천 관련 기능
│   │   ├── scheduleController.js  # 일정 CRUD 관련 기능
│   │   └── travelTimeController.js  # 이동시간 탐색 기능
│   ├── keys                # Firebase 인증용 키 
│   │   └── dayfull-timetable-e933618fea72.json
│   ├── lib                 # 외부 API, DB, Redis 연결
│   │   ├── db.js
│   │   ├── openai.js
│   │   └── redis.js
│   ├── middleware          # 인증 관련 미들웨어
│   │   └── authMiddleware.js
│   ├── middlewares         # 이미지 업로드 미들웨어
│   │   └── multer.js
│   ├── models              # 시간표 이미지 추출 기능
│   │   └── lectureModel.js
│   ├── routes              # controllers와 연결되는 HTTP endpoint 경로
│   │   ├── addressRoutes.js
│   │   ├── autoScheduleRoutes.js
│   │   ├── classScheduleRoutes.js
│   │   ├── distanceRoutes.js
│   │   ├── feedbackRoutes.js
│   │   ├── lectureScheduleRoutes.js
│   │   ├── placeInfoRoutes.js
│   │   ├── placeRoutes.js
│   │   ├── preferenceRoutes.js
│   │   ├── recommendationRoutes.js
│   │   ├── scheduleRoutes.js
│   │   └── userRoutes.js
│   ├── services            # 핵심 비즈니스 로직 처리
│   │   ├── addressService.js
│   │   └── (...)
│   ├── utils               # 거리 계산, 좌표 격자 변환, 시간 파싱 등 공통 함수 모음
│   │   ├── distance.js
│   │   ├── gridPositions.js
│   │   └── parseDuration.js
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── frontend                # Next.js 기반 프론트엔드 클라이언트
│   ├── public
│   │   ├── timetable.png
│   │   └── vite.svg
│   ├── src
│   │   ├── api             # 백엔드와 통신하는 API 함수
│   │   │   ├── autoschedule.js
│   │   │   └── (...)
│   │   ├── assets          # 프로젝트에서 사용하는 로고/아이콘
│   │   │   ├── react.svg
│   │   ├── components      # 공통 UI 컴포넌트
│   │   │   ├── AddTopBar.jsx
│   │   │   └── (...)
│   │   ├── screens         # 화면별 페이지 구성 
│   │   │   ├── AddAddressScreen.jsx
│   │   │   └── (...)
│   │   ├── styles
│   │   │   └── custom.css
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .dockerignore
│   ├── .env
│   ├── .env.docker
│   ├── .gitignore
│   ├── dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── vite.config.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── init                   # 초기 DB 스키마 설정
│   ├── init.sql
│   ├── lectureSchedules.sql
│   └── lectures.sql
├── postgresql             # PostgreSQL 컨테이너용 커스텀 설정
│   └── Dockerfile
├── redis                  # Redis 컨테이너 설정
│   └── Dockerfile
├── src                    # 스타트 초기 구현 코드(현재는 사용 X)
│   ├── dayfull_timetable.py
│   ├── recomm.py
│   └── redis_connection.py
├── .gitignore
├── README.md
├── Capstone-1stReport-44-E_CLAIR v1-2025-03-28.md
├── Capstone-2ndReport-44-E_CLAIR v1-2025-05-07.md
├── ERD 수정본.png
├── Ground_Rule.MD
├── SW 구조도.png
├── SW구조도수정본 (1).png
├── docker-compose.yml
└── 피그마.png
```

<br>
<br>

---

## 🛠️ How to build & install 

### 🐳 How to Run with Docker

Dayfull Docker 환경에서 쉽게 실행할 수 있도록 구성되어 있습니다.

PostgreSQL, Redis, 백엔드, 프론트엔드까지 한 번에 실행할 수 있어 개발과 테스트가 간편합니다.

### 1️⃣ 레포지토리 클론

```bash
git clone https://github.com/Yeolmaeg/Capstone-SGK.git
cd Capstone-SGK
```

### 2️⃣ 환경 변수 파일 설정

📁 `/backend/.env`

```
DB_HOST=postgresql
DB_PORT=5432
DB_NAME=dayfullpg
DB_USER=postgres
DB_PASSWORD=dayfull
REDIS_HOST=redis
REDIS_PORT=6379

OPENAI_API_KEY=your_openai_key
PERPLEXITY_API_KEY=your_perplexity_key
GOOGLE_APPLICATION_CREDENTIALS=./keys/dayfull-timetable-e933618fea72.json
```

📁 `/frontend/.env.docker`

```
VITE_PORT=5173
DOCKER=true
```

현재 위의 환경변수 파일이 이미 존재합니다. 그리고 도커 환경에서는 이와 같은 설정이  `docker-compose.yml`에 포함되어 있기 때문에, 특정 명령어 실행 없이 PostgreSQL 컨테이너가 자동으로 다음을 수행합니다.

- `dayfullpg` 데이터베이스 생성
- `postgres` 계정과 비밀번호 `dayfull` 자동 설정
- `/init` 디렉토리의 SQL 파일을 실행해 초기 데이터 스키마 생성

---

### 3️⃣ 도커로 전체 애플리케이션 실행

프로젝트 루트 디렉토리에서 아래 명령어를 실행하면 백엔드, 프론트엔드, PostgreSQL, Redis 컨테이너가 실행됩니다.

- `postgresql`, `redis` 먼저 실행됨
- `backend`는 `.env` 설정에 따라 DB/Redis에 연결됨
- `frontend`는 `npm run dev`로 개발 서버를 띄우고 브라우저용 앱 제공
- 프론트에서 API 요청을 보내면 백엔드로 전달되고, DB/Redis와 연결됨

```bash
docker-compose up --build
```

 초기 실행 시 다소 시간이 걸릴 수 있으며, 빌드 후 모든 컨테이너가 자동으로 동일 네트워크에 연결됩니다.

---

<br>
<br>

## 🚧 How to test
Dayfull의 API는 RESTful 방식으로 제공되며, Postman을 활용한 기능 테스트가 가능합니다

---

### 🛠️ 1. Postman 설치 및 실행

1. Postman 공식 사이트 접속 → https://www.postman.com/downloads/
2. 운영체제에 맞는 설치 파일 다운로드 후 설치
3. 실행 후 회원가입
4. 앱 실행 후 **Workspace → New → HTTP Request** 선택

---

### 테스트 계정

```bash
{
  "email": "테스트메일@example.com",
  "password": "12345678",
  "userId": "f49687dd-3a03-4516-a798-3faab06abefc"
}
```

---

### 📬 2. 주요 기능 API 요청 명세 및 응답 예시

### 1.  장소명 기반 일정 생성 기능

- **Method**: `POST`
- **URL**: `https://dayfull.onrender.com/api/auto-schedule`
- **Body (JSON) 예시**

```json
{
  "place_name": "왕십리 힙덱",
  "user_id": "f49687dd-3a03-4516-a798-3faab06abefc"
}
```

- **Response (JSON) 예시**

```json
{
  "message": "✅ 자동 일정 생성 완료",
  "schedule": {
    "id": "20047e29-4626-4aed-98d1-c4e469c8e198",
    "user_id": "f49687dd-3a03-4516-a798-3faab06abefc",
    "place_id": null,
    "recommendation_id": null,
    "title": "왕십리 힙덱",
    "address": "서울특별시 성동구 마조로 33, 04760",
    "opening_hours": null,
    "description": null,
    "latitude": 37.561472,
    "longitude": 127.038721,
    "start_time": "2025-05-21T20:33:00.000Z",
    "end_time": "2025-05-21T21:33:00.000Z",
    "move_type": "driving",
    "move_duration": 33,
    "walk_duration": 71,
    "transit_duration": 33,
    "drive_duration": 33,
    "source": "from_place",
    "is_recurring": false,
    "color": "#d1ebb6",
    "created_at": "2025-06-18T12:39:36.237Z",
    "satisfied": null
  }
}
```

### 2. 장소 추천 기능

- **Method**: `POST`
- **URL**: `https://dayfull.onrender.com/api/recommendation/auto`
- **Body (JSON) 예시**

```json
{
  "user_id": "f49687dd-3a03-4516-a798-3faab06abefc",
  "time": "2025-05-21T21:00:00"
}
```

- **Response (JSON) 예시**

```json
{
  "message": "추천 + 이동시간 + 일정 자동 생성 완료",
  "schedule": {
    "id": "95c15f36-72e2-4ea3-a176-33a1c9183e2a",
    "user_id": "f49687dd-3a03-4516-a798-3faab06abefc",
    "place_id": "44749e2c-f5fc-4f7b-96c1-2dfad986daa4",
    "recommendation_id": null,
    "title": "카페 꼼마 연남",
    "address": "서울특별시 마포구 동교로 247",
    "opening_hours": "월 09:00~23:00, 화~일 08:00~23:00",
    "description": "지하 1층부터 4층까지 넓은 공간과 높은 층고를 자랑하는 노트북 작업과 공부, 독서에 적합한 홍대 대표 카공 카페입니다.",
    "latitude": 37.562837,
    "longitude": 126.925139,
    "start_time": "2025-05-21T21:00:00.000Z",
    "end_time": "2025-05-21T22:00:00.000Z",
    "move_type": "transit",
    "move_duration": 12,
    "walk_duration": 25,
    "transit_duration": 12,
    "drive_duration": 16,
    "source": "recommendation",
    "is_recurring": false,
    "color": "#d1ebb6",
    "created_at": "2025-06-18T12:42:26.137Z",
    "satisfied": null
  },
  "place": {
    "name": "카페 꼼마 연남",
    "address": "서울특별시 마포구 동교로 247",
    "description": "지하 1층부터 4층까지 넓은 공간과 높은 층고를 자랑하는 노트북 작업과 공부, 독서에 적합한 홍대 대표 카공 카페입니다.",
    "category": "카페/스터디카페",
    "why": "대학생",
    "latitude": 37.562837,
    "longitude": 126.925139,
    "hours": "월 09:00~23:00, 화~일 08:00~23:00",
    "placeId": "44749e2c-f5fc-4f7b-96c1-2dfad986daa4"
  },
  "recommendationId": "c5975918-6a1e-45e9-bff4-c2252bd21070",
  "placeId": "44749e2c-f5fc-4f7b-96c1-2dfad986daa4"
}
```

### 3.  피드백 후 한 줄 소개에서 키워드 추출 기능

### 3-(1) 사용자 피드백 저장

- **Method**: `POST`
- **URL**: `https://dayfull.onrender.com/api/feedback`
- **Body (JSON) 예시**

```json
{
  "userId": "f49687dd-3a03-4516-a798-3faab06abefc",
  "scheduleId": "95c15f36-72e2-4ea3-a176-33a1c9183e2a",
  "satisfied": true
}
```

- **Response (JSON) 예시**

```json
{
  "message": "피드백 저장 완료"
}
```

### 3-(2) 저장된 사용자 키워드 조회

- **Method**: `GET`
- **URL**: `https://dayfull.onrender.com/api/preferences/:userId`
- **Response (JSON) 예시**

```json
{
  "userId": "f49687dd-3a03-4516-a798-3faab06abefc",
  "preferences": [
    "대학생",
    "공간",
    "층고",
    "독서"
  ]
}
```

- "대학생"은 초기 사용자 키워드
- 사용된 한줄 소개 `지하 1층부터 4층까지 넓은 공간과 높은 층고를 자랑하는 노트북 작업과 공부, 독서에 적합한 홍대 대표 카공 카페입니다.`
    - 추출된 키워드:  `공간` , `층고`, `독서`




