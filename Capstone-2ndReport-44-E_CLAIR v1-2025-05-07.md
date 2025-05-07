<!-- Template for PROJECT REPORT of CapstoneDesign 2025-2H, initially written by khyoo -->
<!-- 본 파일은 2025년도 컴공 졸업프로젝트의 <1차보고서> 작성을 위한 기본 양식입니다. -->
<!-- 아래에 "*"..."*" 표시는 italic체로 출력하기 위해서 사용한 것입니다. -->
<!-- "내용"에 해당하는 부분을 지우고, 여러분 과제의 내용을 작성해 주세요. -->

# Team-Info
| (1) 과제명 | 대학생을 위해 가볼 만한 장소를 추천하고, 가고 싶은 장소를 입력하면 효율적으로 일정 배치 및 추가를 도와주는 캘린더 서비스
|:---  |---  |
| (2) 팀 번호 / 팀 이름 | 44-E-CLAIR |
| (3) 팀 구성원 | 손수민 (2176184): 리더, BE, AI, 일정 생성 및 배치 구현,  UI/UX 설계 <br> 궁유진 (2094015): 팀원, BE, AI, 장소 추천 시스템 구현, UI/UX 설계 <br> 구자은 (2176025) : 팀원, FE, UI/UX 설계 및 개발, Figma 디자인			 |
| (4) 팀 지도교수 | 윤명국 교수님 |
| (5) 과제 분류 | 산학과제 |
| (6) 과제 키워드 | GPT-4o, 위치 기반 일정 배치, 웹 정보 기반 장소 추천  |
| (7) 과제 내용 요약 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 대학생 사용자들이 가고 싶은 장소를 입력하면 대학 강의 일정을 비롯한 사용자 일정과 동선을 고려해 방문하기 좋은 시점을 추천해주는 스마트 캘린더 서비스를 설계합니다. 또한 웹 기반 정보 탐색과 사용자의 과거 만족한 추천 장소 데이터를 활용하여, 번거로운 정보 수집 및 비교 절차 없이도 효율적인 일정 배치와 장소 추천을 경험할 수 있도록 지원합니다. |

<br>

# Project-Summary
| 항목 | 내용 |
|:---  |---  |
| (1) 문제 정의 | **문제 정의** <br/> 본 팀은 대학생들이 일정 중 비어 있는 시간을 보다 효율적으로 활용할 수 있도록, 방문할 장소를 중심으로 계획을 세울 수 있는 캘린더 기반 서비스를 기획하고 있다. 이를 위해 다음과 같은 네 단계에 따라 문제를 정의하고, 이를 해결하기 위한 기능을 도출하였다. <br/><br> **1) Target Customer** <br/> 본 서비스가 주목한 Target Customer는 정규 수업 외에도 비어 있는 시간을 활용해 다양한 장소를 방문하고 싶은 대학생이다. 이들은 반복적인 일상 속에서 새로운 장소를 경험하고자 하는 니즈를 가지며, 특히 직접 장소를 탐색하고 동선을 계획하는 데 어려움을 느끼는 사용자에 해당한다 <br/><br> **2) Target Customer가 겪는 문제점** <br/> 이러한 대학생들은 일정 중 갑작스러운 빈 시간이 생기거나, 미리 계획해둔 장소를 방문하고자 할 때, 직접 장소 정보를 탐색하고 기존 일정과 병행해 계획을 수립하는 데 어려움을 겪는다. 특히 효율적인 동선 설계나 이동 시간 고려, 장소 선택의 다양성 부족으로 인해 만족도 높은 외출이나 방문이 어려워진다. <br/><br> **3) Pain Points** <br/> **Problem 1: 가고 싶은 장소에 대한 정보 탐색의 번거로움**: 장소 이름만 알고 있을 때, 위치, 운영 시간, 소요 시간 등 방문 전 확인해야 할 정보가 많고, 이를 하나하나 직접 검색하고 비교하는 데 인지적·시간적 부담이 발생한다. <br/> **Problem 2: 기존 일정과 연계한 장소 방문 계획 수립의 어려움:** 수업 등 이미 고정된 일정을 고려하여 장소를 방문하기 위해서는 효율적인 시간대 및 동선 설계가 필요하지만, 이를 스스로 계획하기가 어렵다. <br/> **Problem 3: 새로운 장소에 대한 만족도 높은 추천 부재:** 막연히 “비어 있는 시간에 어딘가 가고 싶다”는 욕구가 있어도, 현재 위치, 이동 가능 시간, 과거의 방문 이력 등을 종합적으로 고려한 장소 추천을 받기 어렵다. |
| (2) 기존연구와의 비교 | 앱스토어와 구글 플레이 스토어의 인기 캘린더·일정관리 앱 14개를 조사한 결과 현재 시장에 나온 유사 서비스의 장점과 단점은 다음과 같음.<br/> (조사한 앱: ‘구글 캘린더’, ‘투두메이트(todo mate)’, ‘비지니스 달력2’, ‘Taskito’, ‘할 일 목록, 일정 관리, 작업, 일일 플래너, 달력’, ‘To-Do List’, ‘Todoist’, ‘마이 달력’, ‘TimeTree’, ‘TickTick’, ‘Timeblocks’, ‘심플 캘린더’, ‘minical’, ‘AT’)<br><br/>**[장점]**<br/>1. 사용자 일정에 대해 월간뷰, 주간뷰, 일간뷰, 타임라인뷰와 같이 여러 가지 뷰를 제공함.<br/>2. 일정 외에 작업 목록을 추가할 수 있음.<br/>3. 작업에 대해 우선 순위를 부여할 수 있음.<br/>4. 여러가지 테마 및 색상을 제공함.<br/>5. 일정에 파일을 첨부할 수 있음.<br/>6. 루틴 형성을 돕는 푸시 알림을 제공함. <br><br/>  **[단점]**<br/>1. 전체 기능은 유료 플랜을 구매하거나 광고 시청 시에만 제공되어 사용에 방해가 됨.<br/>2. 일정 탐색 및 계획에 대해서는 전혀 도움을 주지 않기 때문에 해당 부분은 사용자 부담으로 남아있음.<br/> 3. 일정 생성에 대해 사용자가 모든 정보를 수동으로 일일이 기입해야 하므로 사용자 노동이 많이 요구됨.<br/>4. 사용자가 직접 입력한 일정에 대해 카테고리 분류, 뷰 제공, 푸시 알림 제공 등 소극적인 지원만 제공하고 새로운 일정 추천이나 효율적인 일정 배치 제안처럼 적극적인 기능 부재.<br/>5. 날짜와 시간에 따른 일정을 제공할 뿐, 사용자의 위치 및 동선 정보를 포함하지 않음.<br/><br>본 과제에서 제공할 서비스 Dayfull은 기존 서비스와 달리 일정만 관리할 뿐, 작업 추가, 파일 첨부, 그리고 루틴 형성 기능은 제공하지 않음. 대신 월간, 3일 간의 타임라인 뷰를 제공하며 다음과 같은 기능을 제공함<br><br/>1. Dayfull은 사용자의 비어있는 시간, 장소 위치, 운영 시간, 이동 거리, 이동 수단을 사용자 대신 탐색 및 비교해 최단 이동 거리를 요구하는 시간대에 일정을 제안함.<br/>2. 기존 일정 관리 서비스에서는 일정 추가 시 시간과 장소를 직접 입력해야 하지만 Dayfull은 사용자가 장소명만 입력하면 대신 장소 정보를 수집해 일정을 생성 및 배치함. <br/>  3. 대학 강의 시간표 이미지를 업로드하면 한 학기 일정을 대신 생성함.<br/>4. 사용자가 비어 있는 시간을 클릭할 경우, Dayfull은 전후 일정의 위치 정보를 반영해 적합한 장소를 추천함. 이동 수단에 따른 총 일정 진행 시간을 조절함.|
| (3) 제안 내용 | 1. 가고 싶은 장소 이름을 입력하면 Dayfull이 일정 계획을 위해 필요한 정보를 대신 검색하고 파악함.<br/>2. 해당 장소의 위치 정보를 바탕으로, 해당일로부터 7일 내에 사용자의 기존 일정을 고려하여 사용자는 가장 짧은 이동 거리가 요구되는 시간대를 제공 받음.<br/>3. 시간대 선택 후 사용자가 원하는 이동 수단에 따라 총 일정 진행 시간 조절 가능.<br/>4. 사용자 일정, 여유 시간, 위치를 종합적으로 고려하면서, 사용자가 만족했던 추천 방문 장소를 바탕으로 새로운 장소를 추천.  |
| (4) 기대효과 및 의의 | 이 서비스를 통해 사용자는 일정과 동선을 고려하여 원하는 장소를 방문하는 일정을 생성 및 배치할 수 있고, 기존 일정에 맞춰 방문하기 적합한 장소를 추천 받을 수 있다. 이를 통해 일정 관리의 번거로움을 줄이고, 비는 시간을 효율적으로 활용할 수 있다. |
| (5) 주요 기능 리스트 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 1. 가고 싶은 장소 탐색: Perplexity 웹 검색을 통해 사용자가 가고 싶은 장소의 정보를 수집<br/>2. 대학 강의 시간표에 따른 한 학기 일정 생성: 시간표 이미지 OCR 처리 후 강의 일정 생성 <br/> 3. 이동 거리 및 수단 별 소요 시간 안내: GPT-4o를 통해 해당 장소로의 이동 거리, 이동 수단과 소요 시간 파악<br/> 4. 효율적인 일정 배치: GPT-4o로 수집한 정보를 바탕으로 사용자의 전후 일정과의 동선을 고려해 효율적으로 일정을 배치<br/>5. 타임라인 메인 UI: React를 사용하여 시간대별 일정을 한눈에 파악할 수 있는 화면 구성<br/> 6. 가볼 만한 장소 추천: 사용자가 빈 시간을 클릭하면 사용자의 전후 일정 장소, 공백 시간 길이를 반영해서 Perplexity 모델 기반 적합한 일정을 탐색. 그리고 Kakao API로 2차 검증하여 정확도 향상. 해당 장소 소개 및 할 수 있는 활동을 요약해서 함께 제공<br/>7. 추천 결과 개선: 사용자가 만족한 추천 장소의 특성을 GPT-4o를 사용하여 벡터화하여 추출하고 다음 추천에 반영|

<br>
 
# Project-Design & Implementation
| 항목 | 내용 |
|:---|---|
| (1) 요구사항 정의 | [요구사항 명세서](#요구사항-명세서) <br> <br> [ER 다이어그램] ![](https://github.com/Yeolmaeg/Capstone-SGK/blob/develop/ER%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8.png)<br><br>테이블 별 설명<br>1. users: 사용자 계정 정보<br>&nbsp;&nbsp;&nbsp;&nbsp;id: 사용자 고유 식별자<br>&nbsp;&nbsp;&nbsp;&nbsp;email: 사용자 이메일<br>&nbsp;&nbsp;&nbsp;&nbsp;school: 학교<br>&nbsp;&nbsp;&nbsp;&nbsp;school_id: 학번<br>&nbsp;&nbsp;&nbsp;&nbsp;name: 사용자 이름<br>&nbsp;&nbsp;&nbsp;&nbsp;created_at: 계정 생성 시각<br><br>2. schedules: 사용자 일정 정보<br>&nbsp;&nbsp;&nbsp;&nbsp;id: 일정 고유 식별자<br>&nbsp;&nbsp;&nbsp;&nbsp;user_id: 일정의 소유자<br>&nbsp;&nbsp;&nbsp;&nbsp;title: 일정 제목<br>&nbsp;&nbsp;&nbsp;&nbsp;address: 주소<br>&nbsp;&nbsp;&nbsp;&nbsp;latitude: 위도<br>&nbsp;&nbsp;&nbsp;&nbsp;longitude: 경도<br>&nbsp;&nbsp;&nbsp;&nbsp;start_time: 일정 시작 시각<br>&nbsp;&nbsp;&nbsp;&nbsp;end_time: 일정 종료 시각<br>&nbsp;&nbsp;&nbsp;&nbsp;created_at: 일정 생성 시각<br><br>3. places: 사용자가 검색한 장소 또는 추천받은 장소 정보<br>&nbsp;&nbsp;&nbsp;&nbsp;id: 장소 고유 ID<br>&nbsp;&nbsp;&nbsp;&nbsp;name: 장소 이름<br>&nbsp;&nbsp;&nbsp;&nbsp;address: 주소<br>&nbsp;&nbsp;&nbsp;&nbsp;latitude: 위도<br>&nbsp;&nbsp;&nbsp;&nbsp;longitude: 경도<br>&nbsp;&nbsp;&nbsp;&nbsp;category: 장소 유형<br>&nbsp;&nbsp;&nbsp;&nbsp;start_time: 일정 시작 시각<br>&nbsp;&nbsp;&nbsp;&nbsp;end_time: 일정 종료 시각<br>&nbsp;&nbsp;&nbsp;&nbsp;walk_duration: 도보 이동 시간<br>&nbsp;&nbsp;&nbsp;&nbsp;transit_duration: 대중교통 이동 시간<br>&nbsp;&nbsp;&nbsp;&nbsp;drive_duration: 자차 이동 시간<br>&nbsp;&nbsp;&nbsp;&nbsp;source: 출처(사용자 직접 입력/추천받은 장소)<br>&nbsp;&nbsp;&nbsp;&nbsp;satisfied: 추천 만족 여부 (만족/불만족)<br>&nbsp;&nbsp;&nbsp;&nbsp;created_at: 장소 데이터 등록 시각<br><br>4. recommendations: 사용자가 추천 받은 장소<br>&nbsp;&nbsp;&nbsp;&nbsp;id: 추천 ID<br>&nbsp;&nbsp;&nbsp;&nbsp;user_id: 추천 대상 사용자<br>&nbsp;&nbsp;&nbsp;&nbsp;place_id: 추천된 장소 ID<br>&nbsp;&nbsp;&nbsp;&nbsp;discription: 추천 설명 한줄 소개<br>&nbsp;&nbsp;&nbsp;&nbsp;created_at: 추천 생성 시각<br><br>5. user_address: 사용자 주소<br>&nbsp;&nbsp;&nbsp;&nbsp;id: 사용자 주소 아이디<br>&nbsp;&nbsp;&nbsp;&nbsp;name: 주소 이름<br>&nbsp;&nbsp;&nbsp;&nbsp;address: 주소<br>&nbsp;&nbsp;&nbsp;&nbsp;location: 장소 좌표<br>&nbsp;&nbsp;&nbsp;&nbsp;created_at: 주소 생성 시각 <br> <br>[UI 분석/설계 모델] ![](https://github.com/Yeolmaeg/Capstone-SGK/blob/develop/%ED%94%BC%EA%B7%B8%EB%A7%88.png)<br>피그마 링크: https://www.figma.com/design/Fk1fj1MQfqRAMOVf8soijl/Dayfull---1%EC%B0%A8-%EB%B3%B4%EA%B3%A0%EC%84%9C?node-id=0-1&t=0W0l1DUyFWHsQBV4-1 |
| (2) 전체 시스템 구성 | Front-End:<br>React 18.2.0 (https://ko.legacy.reactjs.org/)<br><br>Back-End:<br>Node.js 22.13.1 (https://nodejs.org/ko)<br><br>DB:<br>Redis 6.2 (https://redis.io/)<br>PostgreSQL 17 (https://www.postgresql.org/)<br><br>CI/CD:<br>Docker 20.10 (https://www.docker.com/)<br><br>API:<br>Kakao Local API (https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-category)<br><br>AI:<br>Perplexity (https://www.perplexity.ai/), llama-3.1-sonar-small-128k-online<br>OpenAI 1.57.4  (https://openai.com/), GPT-4<br><br>[시스템 아키텍처]![](https://github.com/Yeolmaeg/Capstone-SGK/blob/develop/SW%20%EA%B5%AC%EC%A1%B0%EB%8F%84.png)<br><br>[사용한 스택]<br>프론트엔드<br>React: 전체 UI, 타임라인 인터페이스, 사용자 입력 처리<br><br>백엔드<br>Node.js + Express: 모든 API 처리, 비즈니스 로직, 인증<br><br>데이터베이스<br>PostgreSQL: 사용자 정보, 일정, 장소, 추천, 피드백 정보 저장<br>Redis: 사용자가 만족한 장소 특성 키워드 저장<br><br>외부 API<br>Perplexity(llama-3.1-sonar-small-128k-online) API: 장소 정보 및 여가 추천 데이터 제공<br>Kakao local API:  요청 받은 좌표 및 운영 시간 정보 조회(2차 검증)<br>OpenAI(GPT-4) API: 사용자 동선 분석, 사용자 성향 분석 및 추천 키워드 자동 추출<br><br>CD/CI<br>Docker / docker-compose: 프론트/백/DB/Redis 통합 실행 및 배포 환경 구성 |
| (3) 주요엔진 및 기능 설계 | **1. OCR 모듈**<br><br>OCR 모듈은 사용자가 업로드한 시간표 이미지를 인식하고, 이를 기반으로 한 학기 강의 일정을 자동으로 생성하는 기능을 수행한다. 이 모듈은 이미지 내에서 과목명, 요일, 시간, 강의실 위치를 추출하고, 이를 반복 일정 형태로 변환하여 DB에 저장한다.<br><br>구현 목적<br><br>수동 입력 없이 이미지 업로드만으로 학기 전체 강의 일정을 자동 생성함으로써, 사용자 일정 초기 설정의 번거로움을 줄이고 사용자의 편의성을 향상시키기 위함.<br><br>연계된 서비스 구성 요소 및 역할<br><br>- `timetableOCRService`: Google Vision API를 사용하여 시간표 이미지에서 텍스트를 추출함<br>- `scheduleGenerator`: 추출된 강의 정보를 반복 일정 형태로 변환하여 DB에 삽입<br>- `geocodeService`: 강의실 주소를 위도/경도로 변환<br>- `timetableController`: OCR 처리 전체 흐름 제어<br><br>내부 흐름 및 구조<br><br>1. 사용자 시간표 이미지 업로드 (`POST /timetable/upload`)<br>2. Vision API로 텍스트 추출<br>3. 과목명, 요일, 시간, 강의실 주소 파싱<br>4. 반복 일정 생성 후 DB에 저장<br>5. 위도/경도 변환하여 장소 기반 기능 연계<br><br>기술 스택<br><br>- Google Vision API<br>- Kakao Local API<br>- PostgreSQL<br>- Node.js + Express<br>- Axios <br><br><br> **2. 일정 생성 및 배치** <br><br>일정 생성 및 배치 모듈은 사용자의 강의 시간표 데이터 또는 사용자가 입력한 장소명을 자동으로 일정을 생성하고 배치하는 기능을 수행한다. 이 모듈은 사용자의 시간 흐름, 동선, 반복성 등을 고려하여 사용자의 시간 흐름과 이동 동선을 반영한 자연스러운 일정 구성을 구현하는 것을 목표로 하며, 다음과 같은 구조와 방식으로 구성되었다.<br><br>구현 목적<br><br>사용자 입력 없이도 강의 시간표 및 장소 기반 일정을 자동으로 생성하여 입력 부담을 줄이고, 일정 간의 시간 간격과 장소 간 이동 동선을 반영한 현실적인 일정 구성을 지원하기 위함<br><br>연계된 서비스 구성 요소 및 역할<br><br>- `geocodeService`: 강의 주소를 위도/경도로 변환하는 기능을 수행함 (Google Maps API)<br>- `scheduleGenerator`: OCR 처리된 강의 시간표 데이터를 기반으로 학기 전체 반복 일정을 생성하고 DB에 삽입하는 모듈을 새롭게 구현함<br>- `scheduleService`: 기존에 구현된 모듈로, 일정 저장/조회/중복 체크 기능을 도입함<br>- `travelTimeService`: 기존에 구현된 모듈로, 출발지와 도착지 간 이동 시간을 계산하는 기능을 도입함<br>- `placeInfoService`: Perplexity API를 호출하고 JSON 기반으로 장소 정보를 파싱하는 기능을 새롭게 구현함<br>- `autoScheduleController`: 사용자의 장소명 요청을 기반으로 일정을 자동으로 생성하고 응답을 반환하는 흐름을 제어하는 컨트롤러로 새롭게 구현함<br><br>내부 흐름 및 구조<br><br>1. 시간표 기반 일정 생성<br>   - 사용자가 제공한 강의 시간표를 OCR로 처리한 후, `scheduleGenerator`가 각 강의의 요일, 시간, 주소 정보를 기반으로 학기 전체 반복 일정 생성<br>   - 생성된 일정을 `lecture_schedules` 테이블에 삽입<br>   - 강의 주소는 `geocodeService`를 이용해 위도/경도로 변환한 뒤 저장<br><br>2. 장소 기반 일정 생성<br>   - 사용자가 장소명을 `POST /auto-schedule` 엔드포인트로 제출함<br>   - `autoScheduleController`에서 Perplexity API를 호출하여 장소명에 해당하는 정보를 수집함 (`placeInfoService`)<br>   - 사용자의 가장 최근 일정 종료 시점을 기준으로 출발지를 설정하고, 이동 시간 계산을 위해 `travelTimeService`를 호출함<br>   - 가장 짧은 소요 시간을 기준으로 이동 수단을 선택하고, 일정 시작/종료 시간을 자동 계산함<br>   - `scheduleService.createAutoSchedule()`을 통해 최종 일정을 DB에 삽입함<br><br>기술 스택<br><br>- Perplexity API: 장소명 기반 정보 수집<br>- Google Maps Geocoding API: 주소 → 위도/경도 변환<br>- PostgreSQL: 일정 및 반복 일정 저장<br>- Axios: 외부 API 호출<br>- Express.js / Node.js: 라우팅, 서비스 계층 구성 및 서버 구현 <br><br><br> **3. 장소 탐색 모듈**<br><br>장소 탐색 모듈은 사용자가 직접 입력한 장소명을 기반으로, 외부 검색 엔진(Perplexity)을 통해 해당 장소의 정확한 정보를 수집하고 데이터베이스에 저장하는 기능을 수행한다. 이 모듈을 통해 추후 일정 자동 생성과 장소 추천 기능에서 참조할 수 있는 기초 데이터를 확보한다.<br><br>구현 목적<br><br>사용자가 직접 입력한 장소에 대해 추가적인 정보(정확한 주소, 위도/경도, 운영 시간)를 수집하고, 이를 자동 일정 생성 및 추천 시스템에서 활용할 수 있도록 통합 DB에 구조화된 형태로 저장<br><br>연계된 서비스 구성 요소 및 역할<br><br>- `placeInfoService`: Perplexity API를 호출하고, JSON 형식으로 반환된 장소 정보를 파싱하여 장소명, 위치, 위도/경도, 운영시간 등의 정보를 정제하는 기능을 수행함<br>- `places` 테이블: 수집된 장소 데이터를 PostgreSQL에 저장하는 스키마. 추후 추천, 일정 자동 생성 기능에서도 참조됨<br>- `autoScheduleService`: 사용자가 입력한 장소를 기반으로 자동 일정을 생성할 경우, 탐색된 장소 정보를 활용함<br>- `travelTimeService`: 탐색된 장소로의 이동 소요 시간 계산 시 활용됨 (도보/대중교통/자차)<br><br>내부 흐름 및 구조<br><br>1. 사용자가 프론트엔드 UI에서 장소명을 입력<br>2. 백엔드의 `placeInfoController`가 해당 요청을 수신하고, `placeInfoService`를 호출<br>3. Perplexity API에 아래와 같은 프롬프트 스크립트 전달:<br>   “다음 장소에 대한 정보를 공식 웹사이트 또는 신뢰 가능한 출처를 기반으로 제공해주세요. 장소명: ${placeName}”<br>4. 응답된 JSON 데이터를 파싱하여 필요한 장소 정보를 추출<br>5. `places` 테이블에 장소 데이터를 저장<br><br>기술 스택<br><br>- Perplexity API: 장소 정보 수집 (운영 시간, 주소, 좌표 등)<br>- PostgreSQL: 장소 정보 저장 (places 테이블)<br>- Axios: 외부 API 요청 수행<br>- Express.js / Node.js: RESTful API 서버 구성, 라우터 및 서비스 계층 구성<br><br><br>**4. 장소 추천 모듈**<br><br>장소 추천 모듈은 사용자의 빈 시간대, 이전 일정 장소, 선호 키워드를 고려해 Perplexity API를 통해 적절한 장소를 추천하고, 추천 결과를 이동 시간 정보와 함께 사용자에게 전달하는 기능을 수행한다. 추천된 장소는 사용자가 선택할 경우 일정으로 자동 생성된다.<br><br>구현 목적<br><br>사용자 일정의 공백 시간과 맥락에 맞는 장소를 추천하여 여가 계획을 자동화하고, 이동시간 및 개인 선호도 기반의 맞춤형 일정 추천 기능을 구현하기 위함<br><br>연계된 서비스 구성 요소 및 역할<br><br>- `recommendationService`: 사용자 위치, 선호 키워드, 전후 일정 정보를 종합하여 Perplexity API에 추천 요청을 전송하고, 결과를 DB에 저장<br>- `gptService`: 추천 결과에 대해 이동 수단별 소요 시간을 GPT-4o를 통해 계산<br>- `redisService`: 사용자 선호 키워드를 Redis에 저장 및 불러오는 기능을 제공<br>- `recommendation` 테이블: 추천 기록을 저장하여 피드백 추적 및 분석에 활용<br>- `places` 테이블: 추천된 장소 정보를 저장하고 중복 여부를 판단<br>- `travelTimeService`: 출발지와 추천 장소 간의 이동 시간 계산에 사용<br>- `scheduleService`: 사용자가 추천을 수락한 경우 해당 장소를 일정으로 생성<br><br>내부 흐름 및 구조<br><br>1. 사용자가 타임라인에서 빈 시간대를 클릭<br>2. 프론트에서 사용자 ID, 빈 시간, 전후 일정 정보 등을 포함하여 추천 요청을 백엔드로 전송<br>3. `recommendationService`에서 사용자 Redis 키워드를 조회하고, 아래와 같은 프롬프트로 Perplexity API에 요청 전송:<br>   “(위도: ${lat}, 경도: ${lon}) 반경 500m 이내에서 키워드(${keywords}) 중 하나에 해당하는 장소를 추천해주세요”<br>4. 응답된 장소 정보는 `places`와 `recommendation` 테이블에 각각 저장<br>5. `gptService`에서 GPT-4o를 통해 해당 장소까지의 도보/대중교통/자차 이동 시간 계산<br>6. 프론트엔드에 추천 장소, 이동 수단별 소요 시간, 가장 적합한 이동 수단을 함께 전달<br>7. 사용자가 추천을 수락하면 `scheduleService`를 통해 일정으로 저장<br><br>기술 스택<br><br>- Perplexity API: 추천 장소 도출<br>- GPT-4o (OpenAI API): 이동 수단별 소요 시간 계산<br>- Redis: 사용자 선호 키워드 관리<br>- PostgreSQL: 추천 및 장소 정보 저장 (recommendations, places 테이블)<br>- Axios: 외부 API 요청 수행<br>- Express.js / Node.js: 백엔드 API 서버 구성, 서비스-컨트롤러 계층 분리 구현<br><br><br>**5. 거리 및 소요 시간 분석 모듈**<br><br>거리 및 소요 시간 분석 모듈은 일정 간 이동 시간과 거리 정보를 바탕으로 현실적인 일정 배치와 추천을 지원한다. Kakao Mobility Directions API를 사용해 실제 이동 경로, 거리, 소요 시간을 확보하고, 응답 데이터를 GPT-4o를 통해 요약 정제하여 사용자에게 제공한다.<br><br>구현 목적<br><br>동선 기반 일정 추천의 정확도를 높이고, 사용자에게 직관적인 이동 정보 제공<br><br>연계된 서비스 구성 요소 및 역할<br><br>- `travelTimeService`: Kakao Mobility Directions API 호출 (도보/자차/대중교통)<br>- `gptService`: 응답 데이터를 요약 정제<br>- `autoScheduleController`: 이동 시간 기반 일정 시간 설정<br>- `recommendationService`: 이동 시간 기반 추천 후보 필터링<br><br>내부 흐름 및 구조<br><br>1. 사용자 일정 생성 또는 추천 요청<br>2. 출발지-도착지 위도/경도 확보<br>3. Kakao API 호출 → 거리/소요 시간/경로 수집<br>4. GPT-4o가 자연어 요약<br>5. 최종 일정 시간 계산 후 DB 저장<br><br>기술 스택<br><br>- Kakao Mobility Directions API<br>- Kakao Local API<br>- OpenAI GPT-4o<br>- PostgreSQL<br>- Node.js + Express<br>- Axios<br><br><br> **6. 개인화 모듈**<br><br>개인화 모듈은 추천 시스템의 정밀도를 높이기 위해 사용자 피드백 데이터를 처리하고, 그 결과를 기반으로 선호 키워드를 도출하여 차후 추천에 반영하는 역할을 한다. 이 모듈은 다음과 같은 구조와 방식으로 구현되었다.<br><br>구현 목적<br><br>추천 결과에 대한 사용자의 만족도를 반영해, 이후 추천의 정확도 및 개인화를 강화하기 위함<br><br>연계된 서비스 구성 요소 및 역할<br><br>- `recommendationService`: 기존에 구현된 모듈로, 추천 ID로 장소 ID를 조회하는 기능을 도입함<br>- `placeService`: 기존에 구현된 모듈로, 장소 설명을 DB에서 조회하는 기능을 도입함<br>- `gptService`: 사용자가 만족한 장소의 설명에서 GPT를 호출하여 의미 기반 키워드를 추출하는 기능을 새롭게 구현함<br>- `redisService`: 추출된 키워드를 Redis에 저장하고 관리하는 기능을 새롭게 구현함<br><br>내부 흐름 및 구조<br><br>1. 사용자가 추천 장소에 대해 '만족' 피드백을 보냄<br>2. `feedbackController`가 해당 요청을 수신하고 PostgreSQL에 피드백 저장<br>3. `feedbackService`가 실행되어 추천 ID를 기반으로 장소 설명 조회<br>4. `gptService`를 통해 키워드 3개 추출 (쉼표 구분된 단어)<br>5. Redis에 `user:{userId}:preferences` 형태로 키워드 저장<br><br>기술 스택<br><br>- GPT-4o (OpenAI API): 키워드 추출<br>- Axios: 외부 API 호출<br>- Redis: 비관계형 선호 키워드 저장소<br>- PostgreSQL: 피드백 및 장소 정보 저장<br>- Express.js / Node.js: 서버 구조 및 API 구성  |
| (4) 주요 기능의 구현 |**1. 가고 싶은 장소 탐색**<br>가고 싶은 장소 탐색 기능은 사용자가 직접 입력한 장소명을 기반으로 Perplexity API를 활용하여 해당 장소의 위치, 운영시간, 좌표 등의 정보를 수집하는 기능이다. 사용자가 입력한 텍스트를 기반으로 외부 API를 호출해 장소 데이터를 수집 및 저장한다.<br><br>기능 흐름 설명:<br>1. 사용자가 프론트엔드에서 장소명을 입력하여 POST `/place-info` 요청 전송<br>2. 서버의 `placeInfoController`가 요청을 수신하고 `placeInfoService`를 호출<br>3. Perplexity API에 장소명 기반 정보 요청 프롬프트 전송<br>4. 장소명, 위치, 위도/경도, 운영시간 등을 포함한 JSON 응답 수신<br>5. 응답을 파싱하여 places 테이블에 저장<br>
6. 저장된 장소는 자동 일정 생성 또는 추천 요청 시 참조됨<br><br>사용 기술:<br>- Perplexity API: 장소명 기반 정보 수집<br>
- Express + PostgreSQL: REST API 구현 및 장소 정보 저장<br>
- Axios: 외부 API 통신<br><br>

결과 반영 방식: 수집된 장소 정보는 서버 DB에 구조화된 형태로 저장되며, 이후 일정 자동 배치 기능에서 사용되거나, 장소 추천 기능과 연계되어 재활용된다. 동일 장소 중복 저장을 방지하기 위해 위도/경도 기준 중복 체크 로직을 포함한다.

<br>**2. 대학 강의 시간표에 따른 한 학기 일정 생성**<br>
사용자가 시간표 이미지를 업로드하면, OCR을 통해 강의명/요일/시간/장소 정보를 추출하고, 학기 전체 반복 일정을 자동으로 생성한다.<br><br>

기능 흐름:<br>
1. 시간표 이미지 업로드<br>
2. OCR 텍스트 추출 (Google Vision)<br>
3. 과목명/시간/장소 추출<br>
4. 반복 일정 생성 및 좌표 변환<br>
5. PostgreSQL에 저장 → 타임라인 UI 반영<br><br>

기술 스택:<br>
- Google Vision API<br>
- Kakao Local API<br>
- Node.js + Express<br>
- PostgreSQL<br>
- Axios

<br>**3. 이동 거리 및 수단 별 소요 시간 안내**<br>
일정 생성 또는 장소 추천 시,이전 일정 장소 기준으로 도보/자차/대중교통 이동 시간 정보를 안내하는 기능이다.<br><br>

기능 흐름:<br>
1. 일정 생성/추천 요청 수신<br>
2. 출발지-도착지 좌표 확보<br>
3. Kakao Directions API 호출<br>
4. 응답 데이터를 GPT-4o가 요약 정리<br>
5. 이동 수단별 소요 시간 반환<br><br>

기술 스택:<br>
- Kakao Directions API<br>
- OpenAI GPT-4o<br>
- Node.js + Express<br>
- PostgreSQL<br>
- Axios

<br>**4. 효율적인 일정 자동 배치**<br>
효율적인 일정 자동 배치 기능은 사용자의 기존 일정 사이 공백 시간에 새로운 장소 일정을 자동으로 생성하고 배치하는 기능이다. 이 기능은 Perplexity API와 GPT-4o를 함께 활용하여, 전후 일정과의 이동 거리 및 시간까지 고려한 일정 자동화를 지원한다.<br><br>

기능 흐름 설명:<br>
1. 사용자가 일정 등록 없이 빈 시간 블록 클릭<br>
2. `autoScheduleController`에서 추천 장소 또는 입력 장소 정보를 수신<br>
3. 출발지를 이전 일정의 장소로 설정하고,<br>
  도착지를 추천 장소 또는 입력 장소로 설정<br>
4. `travelTimeService`를 통해 이동 수단별 소요 시간 계산 (GPT-4o 기반)<br>
5. 가장 짧은 이동 시간을 기준으로 시작/종료 시간을 설정<br>
6. `scheduleService.createAutoSchedule()` 호출 → DB에 일정 삽입<br><br>

사용 기술:<br>
- GPT-4o: 도보/차량/대중교통 이동시간 분석<br>
- Express + PostgreSQL: 자동 일정 생성 API 및 DB 저장<br>
- Axios: 외부 API 요청 (GPT 및 Perplexity)<br><br>

결과 반영 방식: 장소 탐색 또는 추천으로 확보된 장소 정보를 기반으로 사용자의 일정 흐름을 고려한 일정이 자동으로 생성된다. 사용자는 수동 입력 없이 일정이 생성되며, 자동 생성 일정은 시각적으로 동일한 방식으로 UI에 반영된다.

<br>**5. 타임라인 메인 UI**<br>
타임라인 메인 UI는 사용자의 일정을 시간순으로 시각화하여 하루 일과를 직관적으로 확인할 수 있도록 구성한 기능이다. 이 기능의 구현을 위하여, 기존에 구현되어 있던 `scheduleService`와 자동 일정 생성을 담당하는 `autoScheduleController` 모듈을 도입하였고, 클라이언트 측에서는 React 기반으로 시간대 별 일정을 시각적으로 표현하는 UI를 직접 구현하였다.<br><br>

기능 흐름 설명:<br>
1. 사용자가 페이지에 접속하면 클라이언트가 서버에 일정 목록을 요청<br>
2. 서버는 `scheduleService.getSchedules()`를 통해 해당 사용자의 일정들을 시작 시간 기준으로 정렬하여 반환<br>
3. 클라이언트는 받은 일정을 시간 블록 단위로 타임라인에 시각적으로 렌더링<br>
4. 일정에 따라 색상을 다르게 표현하며, 자동 생성 일정도 동일한 방식으로 표시됨<br>
5. 사용자는 일정 블록을 클릭하여 수정, 삭제 또는 상세 정보 확인 가능<br><br>

사용 기술:<br>
- React: 시간 블록 기반 UI 구성<br>
- Axios: 서버 API 호출 및 일정 데이터 수신<br>
- Express + PostgreSQL: 일정 조회 및 관리 API<br><br>

결과 반영 방식: 클라이언트가 요청한 일정 데이터는 백엔드에서 실시간으로 조회되어, 사용자에게 시간순 정렬된 일정 타임라인 형태로 시각화되며, 자동 생성 일정도 동일하게 UI에 반영되어 사용자 편의성과 시인성을 높임 | 
| (5) 기타 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| |

<br>
<br>

## 요구사항 명세서

| 요구사항 ID | 요구사항명             | 기능 ID           | 기능명               | 상세설명                                                                 | 필수 데이터                                                    | 선택 데이터                                                 | 데이터베이스(테이블명:필드명)                         |
|-------------|------------------------|--------------------|----------------------|-------------------------------------------------------------------------|----------------------------------------------------------------|-------------------------------------------------------------|--------------------------------------------------------|
| TIME        | 타임라인 화면           | TIME01-VIEW01      | 타임라인 메인 UI      | 시간대별 일정을 한눈에 보여주고, 빈 칸 클릭 시 장소 추천 연결                                  | schedules: start_time, end_time, location                      | recommendations: walk_duration, transit_duration, drive_duration | recommendations: recommended_start_time, recommended_end_time |
|             | 일정 기반 일정 추천      | TIME02-RECO01      | 효율적인 일정 배치     | 이동 거리와 수단을 고려해 일정 추천 및 시간대 조정                                      | recommendations: walk_duration, transit_duration, drive_duration |                                                             |                                                        |
|             | 이동 정보 제공          | TIME03-DIST01      | 이동 거리 및 수단별 소요 시간 안내 | GPT를 통해 이동 거리 및 이동 수단(도보/대중교통/자차)에 따른 소요 시간 안내                 | recommendations: walk_duration, transit_duration, drive_duration |                                                             |                                                        |
| SCHEDULE    | 학기 일정 자동 생성      | SCHED01-OCR01      | 대학 강의 시간표 기반 일정 생성   | 시간표 이미지를 OCR로 인식해 자동으로 학기 일정을 생성                              | schedules: title, address, location, start_time, end_time     |                                                             |                                                        |
| PLACE       | 장소 정보 탐색          | PLACE01-SEARCH01   | 가고 싶은 장소 정보 탐색   | Perplexity를 통해 장소 위치, 운영시간, 이동 거리 등 정보 제공                      | places: title                                                 | places: location, open_hours, category                    |                                                        |
|             | 장소 추천               | PLACE02-RECO01     | 가볼 만한 장소 추천      | 빈 일정 클릭 시, 전후 일정과 위치 고려해 Perplexity 및 Kakao API로 장소 추천      | schedules: start_time, end_time, location                     | places: title, location                                    | recommendations: place_id, recommended_start_time, description |
|             | 추천 개선       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        | PLACE03-IMPROVE01 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 추천 결과 개선       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   | 피드백 기반 GPT 키워드 추출 및 누적 키워드 분석을 통한 개인화 추천     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;              | feedbacks: recommendation_id, satisfied                       | recommendations: description                              | user_table: preference_keywords                        |

<br>
