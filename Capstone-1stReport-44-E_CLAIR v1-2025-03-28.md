<!-- Template for PROJECT REPORT of CapstoneDesign 2025-2H, initially written by khyoo -->
<!-- 본 파일은 2025년도 컴공 졸업프로젝트의 <1차보고서> 작성을 위한 기본 양식입니다. -->
<!-- 아래에 "*"..."*" 표시는 italic체로 출력하기 위해서 사용한 것입니다. -->
<!-- "내용"에 해당하는 부분을 지우고, 여러분 과제의 내용을 작성해 주세요. -->

# Team-Info
| (1) 과제명 | 대학생을 위해 가볼 만한 장소를 추천하고, 가고 싶은 장소를 입력하면 효율적으로 일정 배치 및 추가를 도와주는 캘린더 서비스
|:---  |---  |
| (2) 팀 번호 / 팀 이름 | 44-E_CLAIR |
| (3) 팀 구성원 | 손수민 (2176184): 리더, BE, AI, 일정 생성 및 배치 구현,  UI/UX 설계 <br> 궁유진 (2094015): 팀원, BE, AI, 장소 추천 시스템 구현, UI/UX 설계 <br> 구자 (2176025) : 팀원, FE, UI/UX 설계 및 개발, Figma 디자인			 |
| (4) 팀 지도교수 | 윤명국 교수님 |
| (5) 과제 분류 | 산학과제 |
| (6) 과제 키워드 | GPT-4o, 위치 기반 일정 배치, 웹 정보 기반 장소 추천  |
| (7) 과제 내용 요약 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 대학생 사용자들이 가고 싶은 장소를 입력하면 대학 강의 일정을 비롯한 사용자 일정과 동선을 고려해 방문하기 좋은 시점을 추천해주는 스마트 캘린더 서비스를 설계합니다. 또한 웹 기반 정보 탐색과 사용자의 과거 만족한 추천 장소 데이터를 활용하여, 번거로운 정보 수집 및 비교 절차 없이도 효율적인 일정 배치와 장소 추천을 경험할 수 있도록 지원합니다. |

<br>

# Project-Summary
| 항목 | 내용 |
|:---  |---  |
| (1) 문제 정의 | **문제 정의** 본 팀은 대학생들이 일정 중 비어 있는 시간을 보다 효율적으로 활용할 수 있도록, 방문할 장소를 중심으로 계획을 세울 수 있는 캘린더 기반 서비스를 기획하고 있다. 이를 위해 다음과 같은 네 단계에 따라 문제를 정의하고, 이를 해결하기 위한 기능을 도출하였다. <br/> **1) Target Customer** < br/> 본 서비스가 주목한 Target Customer는 정규 수업 외에도 비어 있는 시간을 활용해 다양한 장소를 방문하고 싶은 대학생이다. 이들은 반복적인 일상 속에서 새로운 장소를 경험하고자 하는 니즈를 가지며, 특히 직접 장소를 탐색하고 동선을 계획하는 데 어려움을 느끼는 사용자에 해당한다 <br/> **2) Target Customer가 겪는 문제점** <br/> 이러한 대학생들은 일정 중 갑작스러운 빈 시간이 생기거나, 미리 계획해둔 장소를 방문하고자 할 때, 직접 장소 정보를 탐색하고 기존 일정과 병행해 계획을 수립하는 데 어려움을 겪는다. 특히 효율적인 동선 설계나 이동 시간 고려, 장소 선택의 다양성 부족으로 인해 만족도 높은 외출이나 방문이 어려워진다. <br/> **3) Pain Points** <br/> **Problem 1: 가고 싶은 장소에 대한 정보 탐색의 번거로움**: 장소 이름만 알고 있을 때, 위치, 운영 시간, 소요 시간 등 방문 전 확인해야 할 정보가 많고, 이를 하나하나 직접 검색하고 비교하는 데 인지적·시간적 부담이 발생한다. <br/> **Problem 2: 기존 일정과 연계한 장소 방문 계획 수립의 어려움:** 수업 등 이미 고정된 일정을 고려하여 장소를 방문하기 위해서는 효율적인 시간대 및 동선 설계가 필요하지만, 이를 스스로 계획하기가 어렵다. <br/> **Problem 3: 새로운 장소에 대한 만족도 높은 추천 부재:** 막연히 “비어 있는 시간에 어딘가 가고 싶다”는 욕구가 있어도, 현재 위치, 이동 가능 시간, 과거의 방문 이력 등을 종합적으로 고려한 장소 추천을 받기 어렵다. |
| (2) 기존연구와의 비교 | 앱스토어와 구글 플레이 스토어의 인기 캘린더·일정관리 앱 14개를 조사한 결과 현재 시장에 나온 유사 서비스의 장점과 단점은 다음과 같음.<br/> (조사한 앱: ‘구글 캘린더’, ‘투두메이트(todo mate)’, ‘비지니스 달력2’, ‘Taskito’, ‘할 일 목록, 일정 관리, 작업, 일일 플래너, 달력’, ‘To-Do List’, ‘Todoist’, ‘마이 달력’, ‘TimeTree’, ‘TickTick’, ‘Timeblocks’, ‘심플 캘린더’, ‘minical’, ‘AT’)<br/>**[장점]**<br/>1. 사용자 일정에 대해 월간뷰, 주간뷰, 일간뷰, 타임라인뷰와 같이 여러 가지 뷰를 제공함.<br/>2. 일정 외에 작업 목록을 추가할 수 있음.<br/>3. 작업에 대해 우선 순위를 부여할 수 있음.<br/>4. 여러가지 테마 및 색상을 제공함.<br/>5. 일정에 파일을 첨부할 수 있음.<br/>6. 루틴 형성을 돕는 푸시 알림을 제공함. <br/>  **[단점]**<br/>1. 전체 기능은 유료 플랜을 구매하거나 광고 시청 시에만 제공되어 사용에 방해가 됨.<br/>2. 일정 탐색 및 계획에 대해서는 전혀 도움을 주지 않기 때문에 해당 부분은 사용자 부담으로 남아있음.<br/> 3. 일정 생성에 대해 사용자가 모든 정보를 수동으로 일일이 기입해야 하므로 사용자 노동이 많이 요구됨.<br/>4. 사용자가 직접 입력한 일정에 대해 카테고리 분류, 뷰 제공, 푸시 알림 제공 등 소극적인 지원만 제공하고 새로운 일정 추천이나 효율적인 일정 배치 제안처럼 적극적인 기능 부재.<br/>5. 날짜와 시간에 따른 일정을 제공할 뿐, 사용자의 위치 및 동선 정보를 포함하지 않음.<br/>본 과제에서 제공할 서비스 Dayfull은 기존 서비스와 달리 일정만 관리할 뿐, 작업 추가, 파일 첨부, 그리고 루틴 형성 기능은 제공하지 않음. 대신 월간, 3일 간의 타임라인 뷰를 제공하며 다음과 같은 기능을 제공함<br/>1. Dayfull은 사용자의 비어있는 시간, 장소 위치, 운영 시간, 이동 거리, 이동 수단을 사용자 대신 탐색 및 비교해 최단 이동 거리를 요구하는 시간대에 일정을 제안함.<br/>2. 기존 일정 관리 서비스에서는 일정 추가 시 시간과 장소를 직접 입력해야 하지만 Dayfull은 사용자가 장소명만 입력하면 대신 장소 정보를 수집해 일정을 생성 및 배치함.   3. 대학 강의 시간표 이미지를 업로드하면 한 학기 일정을 대신 생성함.<br/>4. 사용자가 비어 있는 시간을 클릭할 경우, Dayfull은 전후 일정의 위치 정보를 반영해 적합한 장소를 추천함. 이동 수단에 따른 총 일정 진행 시간을 조절함.|
| (3) 제안 내용 | 1. 가고 싶은 장소 이름을 입력하면 Dayfull이 일정 계획을 위해 필요한 정보를 대신 검색하고 파악함.<br/>2. 해당 장소의 위치 정보를 바탕으로, 해당일로부터 7일 내에 사용자의 기존 일정을 고려하여 사용자는 가장 짧은 이동 거리가 요구되는 시간대를 제공 받음.<br/>3. 시간대 선택 후 사용자가 원하는 이동 수단에 따라 총 일정 진행 시간 조절 가능.<br/>4. 사용자 일정, 여유 시간, 위치를 종합적으로 고려하면서, 사용자가 만족했던 추천 방문 장소를 바탕으로 새로운 장소를 추천.  |
| (4) 기대효과 및 의의 | 이 서비스를 통해 사용자는 일정과 동선을 고려하여 원하는 장소를 방문하는 일정을 생성 및 배치할 수 있고, 기존 일정에 맞춰 방문하기 적합한 장소를 추천 받을 수 있다. 이를 통해 일정 관리의 번거로움을 줄이고, 비는 시간을 효율적으로 활용할 수 있다. |
| (5) 주요 기능 리스트 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 1. 가고 싶은 장소 탐색: Perplexity 웹 검색을 통해 사용자가 가고 싶은 장소의 정보를 수집<br/>2. 대학 강의 시간표에 따른 한 학기 일정 생성: 시간표 이미지 OCR 처리 후 강의 일정 생성 <br/> 3. 이동 거리 및 수단 별 소요 시간 안내: GPT-4o를 통해 해당 장소로의 이동 거리, 이동 수단과 소요 시간 파악<br/> 4. 효율적인 일정 배치: GPT-4o로 수집한 정보를 바탕으로 사용자의 전후 일정과의 동선을 고려해 효율적으로 일정을 배치<br/>5. 타임라인 메인 UI: React를 사용하여 시간대별 일정을 한눈에 파악할 수 있는 화면 구성<br/> 6. 가볼 만한 장소 추천: 사용자가 빈 시간을 클릭하면 사용자의 전후 일정 장소, 공백 시간 길이를 반영해서 Perplexity 모델 기반 적합한 일정을 탐색. 그리고 Kakao API로 2차 검증하여 정확도 향상. 해당 장소 소개 및 할 수 있는 활동을 요약해서 함께 제공<br/>7. 추천 결과 개선: 사용자가 만족한 추천 장소의 특성을 GPT-4o를 사용하여 벡터화하여 추출하고 다음 추천에 반영|

<br>
 
# Project-Design & Implementation
| 항목 | 내용 |
|:---  |---  |
| (1) 요구사항 정의 | **[ER 다이어그램]** <br/> <br/> - 테이블 별 설명 <br/>
1. users: 사용자 계정 정보 <br/>
&nbsp;&nbsp;id: 사용자 고유 식별자<br/>
&nbsp;&nbsp;email: 사용자 이메일<br/>
&nbsp;&nbsp;school: 학교<br/>
&nbsp;&nbsp;school_id: 학번<br/>
&nbsp;&nbsp;name: 사용자 이름<br/>
&nbsp;&nbsp;created_at: 계정 생성 시각<br/>

2. schedules: 사용자 일정 정보 <br/>
&nbsp;&nbsp;id: 일정 고유 식별자<br/>
&nbsp;&nbsp;user_id: 일정의 소유자<br/>
&nbsp;&nbsp;title: 일정 제목<br/>
&nbsp;&nbsp;address: 주소<br/>
&nbsp;&nbsp;latitude: 위도<br/>
&nbsp;&nbsp;longitude: 경도<br/>
&nbsp;&nbsp;start_time: 일정 시작 시각<br/>
&nbsp;&nbsp;end_time: 일정 종료 시각<br/>
&nbsp;&nbsp;created_at: 일정 생성 시각<br/>

3. places: 사용자가 검색한 장소 또는 추천받은 장소 정보<br/>
&nbsp;&nbsp;id: 장소 고유 ID<br/>
&nbsp;&nbsp;name: 장소 이름<br/>
&nbsp;&nbsp;address: 주소<br/>
&nbsp;&nbsp;latitude: 위도<br/>
&nbsp;&nbsp;longitude: 경도<br/>
&nbsp;&nbsp;category: 장소 유형<br/>
&nbsp;&nbsp;start_time: 일정 시작 시각<br/>
&nbsp;&nbsp;end_time: 일정 종료 시각<br/>
&nbsp;&nbsp;walk_duration: 도보 이동 시간<br/>
&nbsp;&nbsp;transit_duration: 대중교통 이동 시간<br/>
&nbsp;&nbsp;drive_duration: 자차 이동 시간<br/>
&nbsp;&nbsp;source: 출처 (사용자 직접 입력/추천받은 장소)<br/>
&nbsp;&nbsp;satisfied: 추천 만족 여부 (만족/불만족)<br/>
&nbsp;&nbsp;created_at: 장소 데이터 등록 시각<br/>

4. recommendations: 사용자가 추천 받은 장소<br/>
&nbsp;&nbsp;id: 추천 ID<br/>
&nbsp;&nbsp;user_id: 추천 대상 사용자<br/>
&nbsp;&nbsp;place_id: 추천된 장소 ID<br/>
&nbsp;&nbsp;discription: 추천 설명 한줄 소개<br/>
&nbsp;&nbsp;created_at: 추천 생성 시각<br/>

5. user_address: 사용자 주소<br/>
&nbsp;&nbsp;id: 사용자 주소 아이디<br/>
&nbsp;&nbsp;name: 주소 이름<br/>
&nbsp;&nbsp;address: 주소<br/>
&nbsp;&nbsp;location: 장소 좌표<br/>
&nbsp;&nbsp;created_at: 주소 생성 시각<br/>

 |
| (2) 전체 시스템 구성 | 
1. Front-End: <br/>
&nbsp;&nbsp;React 18.2.0 (https://ko.legacy.reactjs.org/)<br/>

2. Back-End: <br/>
&nbsp;&nbsp;Node.js 22.13.1 (https://nodejs.org/ko)<br/>

3. DB: <br/>
&nbsp;&nbsp;Redis 6.2 (https://redis.io/)<br/>
&nbsp;&nbsp;PostgreSQL 17 (https://www.postgresql.org/)<br/>

4. CI/CD: <br/>
&nbsp;&nbsp;Docker 20.10 (https://www.docker.com/)<br/>

5. API: <br/>
&nbsp;&nbsp;Kakao Local API (https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-category)<br/>

6. AI: <br/>
&nbsp;&nbsp;Perplexity (https://www.perplexity.ai/), llama-3.1-sonar-small-128k-online<br/>
&nbsp;&nbsp;OpenAI 1.57.4 (https://openai.com/), GPT-4<br/>
<br/> **[시스템 아키텍처]**<br/>
**[사용한 스택]**<br/>
**프론트엔드**<br/>
&nbsp;&nbsp;React: 전체 UI, 타임라인 인터페이스, 사용자 입력 처리<br/>

**백엔드**<br/>
&nbsp;&nbsp;Node.js + Express: 모든 API 처리, 비즈니스 로직, 인증<br/>

**데이터베이스**<br/>
&nbsp;&nbsp;PostgreSQL: 사용자 정보, 일정, 장소, 추천, 피드백 정보 저장<br/>
&nbsp;&nbsp;Redis: 사용자가 만족한 장소 특성 키워드 저장<br/>

**외부 API**<br/>
&nbsp;&nbsp;Perplexity (llama-3.1-sonar-small-128k-online) API: 장소 정보 및 여가 추천 데이터 제공<br/>
&nbsp;&nbsp;Kakao local API: 요청 받은 좌표 및 운영 시간 정보 조회 (2차 검증)<br/>
&nbsp;&nbsp;OpenAI (GPT-4) API: 사용자 동선 분석, 사용자 성향 분석 및 추천 키워드 자동 추출<br/>

**CI/CD**<br/>
&nbsp;&nbsp;Docker / docker-compose: 프론트/백/DB/Redis 통합 실행 및 배포 환경 구성<br/>

|
| (3) 주요엔진 및 기능 설계 | *프로젝트의 주요 기능 혹은 모듈의 설계내용에 대하여 기술한다 <br> SW 구조 그림에 있는 각 Module의 상세 구현내용을 자세히 기술한다.* |
| (4) 주요 기능의 구현 | *<주요기능리스트>에 정의된 기능 중 최소 2개 이상에 대한 상세 구현내용을 기술한다.* |
| (5) 기타 | *기타 사항을 기술*  |

<br>
