# E-CLAIR - Dayfull: Context-Based Schedule Recommendation Service  

## Introduction
Dayfull은 사용자 맥락 정보를 기반으로 **일정 추천**을 제공하는 서비스입니다.  
GPT-4 기반 챗봇과 Perplexity API를 활용하여 사용자 특성을 분석하고, Redis를 통해 데이터를 관리합니다.

---

## What is Dayfull?  
1. **GPT-4 기반 대화 요약 및 성향 분석**  
   - `dayfull_timetable.py`  
   - 사용자의 대화를 요약하고, 성향 및 특징을 분석해 일정 추천에 활용합니다.  

2. **Perplexity API를 활용한 일정 추천**  
   - `recomm.py`  
   - 사용자 요구사항과 맥락을 반영해 최신 데이터를 기반으로 맞춤형 일정을 추천합니다.  

3. **Redis를 활용한 데이터 저장 및 관리**  
   - `redis_connection.py`  
   - 사용자 비정형 데이터를 정리하고 Redis에 저장해 빠르게 조회하고 활용합니다.

---

## Tech Stack 
- **Python**: 메인 프로그래밍 언어  
- **OpenAI GPT-4 API**: 사용자 대화 요약 및 분석  
- **Perplexity API**: 웹 브라우징 기반 일정 추천  
- **Redis**: 사용자 데이터 저장 및 조회  
- **Docker**: 애플리케이션 컨테이너화  

---
