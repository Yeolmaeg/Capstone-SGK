import requests
import re
import math
import logging
from datetime import datetime
from openai import OpenAI

# 로깅 설정
logging.basicConfig(level=logging.DEBUG, format='[%(asctime)s] %(levelname)s: %(message)s')

# Redis 연결 설정
redis_host = "127.0.0.1"
redis_port = 6379
redis_db = 0

# Redis에서 사용자 데이터 가져오기
def fetch_user_data_from_redis(user_id):
    logging.info("Redis에서 사용자 데이터 가져오는 중...")
    try:
        r = redis.StrictRedis(host=redis_host, port=redis_port, db=redis_db, decode_responses=True)
        raw_data = r.get(user_id)  # 사용자 데이터를 JSON 문자열로 가져옴
        logging.debug(f"Raw Redis Data: {raw_data}")
        if not raw_data:
            print("ERROR: Redis에서 사용자 데이터를 찾을 수 없습니다.")
            return []
        user_data = eval(raw_data)  # JSON 문자열을 딕셔너리로 변환
        logging.info("Redis에서 사용자 데이터 성공적으로 가져옴.")
        return user_data
    except Exception as e:
        print("ERROR: Redis에서 데이터 가져오기 실패:", e)
        return []


# Perplexity API 키 설정
API_KEY_PERPLEXITY = "YOUR_API_KEY"
PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"


# Perplexity API로 활동 추천받기
def fetch_recommendations_with_perplexity(preferences, location, time_slot, date):
    logging.info("Perplexity API로 추천 활동 요청 중...")
    prompt = f"""
    사용자 특성: {', '.join(preferences)}. 위치: {location}. 시간: {time_slot}. 날짜: {date}.
    이 정보를 바탕으로 {date} 이 날짜와  {time_slot} 시간대에 할 수 있는 재밌는 활동을 5개 추천해 줘.
    내 위치에서 그 장소까지의 거리가 너무 멀면 추천하지 마.
    반드시 대중교통으로 10분 이내, 도보로 20분 이내로만 걸리는 장소로만 추천해. 다른 구에 있는 장소 절대 추천하지 마.

    사용자 특성 중 'characteristic' 사용자의 성향과 취미를 설명한 거고,'summary'는 이전에 사용자가 선호했던 활동들에 대한 설명이야.
    이 두가지를 보고 사용자가 좋아하는 활동과 같거나 유사한 활동으로 정해. 관련 없는 '안전' 같은 키워드 쓰지 말고 다양한 활동으로 추천해.
    꼭 사용자 정보의 모든 취향과 일치하는 일정이 아니더라도, 사용자가 좋아할 수 있을 것 같은 활동도 포함해도 돼.
    현재 내 위치{location} 좌표를 정확히 확인해. 서울의 어느 구에 있는지 파악하고, 내 위치에서 대중교통으로 10분 이내, 도보로 20분 이내에 갈 수 있는 곳만 추천해.
    안전 체험관이나 안전과 관련된 활동은 제외하고 추천해. 안전하다고 모든 유저가 다 유용하다고 생각하는 거 아님.

    각 항목은 반드시 "추천받은 항목 1", "추천받은 항목 2"로 각 항목을 구문해야 해.
    주어진 시간 동안 할 수 있어야 함.
    예를 들어서 영화를 본다면, 단순히 '영화 보기' 같은 일정 말고, 구체적으로 어느 영화관에 가서, 몇 시에 상영하는 어떤 영화를 볼 건지 정도로 구체적으로.


    각 추천은 제목, 장소, 예상 거리(km), 예상 비용(원), 시간, 그리고 한 줄 특징을 포함해야 해.
    디즈니+나 넷플릭스 같은, 집에서 OTT 보는 활동은 제외.
    모든 추천의 제목은 구체적인 장소 이름으로 하고,
    장소는 해당 장소의 구체적인 도로명주소를 꼭 포함하고 반드시 한국어로 적어. 꼭 그 장소의 정확한 주소를 알아내. 엉뚱한 주소 적지 마.

    그리고 '추천한 이유'에는 일정 추천할 때 그 이유를 사용자 맥락을 어떻게 파악했는지 말해. 사용자의 특성이 어떻고, 그 특성에 어떻게 적합한 활동인지 설명해야 해.
    혼란을 발생시키지 말고 정확한 정보만 적어.


    응답은
    추천 활동 1:
    제목:
    장소:
    거리:
    예상 비용:
    시간:
    특징:
    추천한 이유:

    무조건 이 형식에 맞춰서 응답 받아야 됨.
    위의 '제목:' 항목은 이게 무슨 활동인지 알 수 있어야 돼.
    위의 '거리:' 항목은 내 위치에서 그 장소까지 몇km인지 적어.
    위의 '장소:' 항목은 무조건 한국어로 적고, 구체적인 도로명 주소로 적어. 우편번호는 적지 마
    위의 '시간:' 항목에는 년도, 월, 일은 적지 말고, 시간만 적어.
    """

    headers = {
        "Authorization": f"Bearer {API_KEY_PERPLEXITY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            {"role": "system", "content": "당신은 사용자의 취향과 상황에 맞는 활동을 추천하는 도우미입니다."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 1500,
        "temperature": 0.7
    }

    try:
        response = requests.post(PERPLEXITY_API_URL, headers=headers, json=payload)
        logging.debug(f"API Response Status: {response.status_code}")
        logging.debug(f"API Response Content: {response.text}")
        response.raise_for_status()  # HTTP 오류 발생 시 예외 처리
        data = response.json()
        print("DEBUG: Perplexity API 응답 성공")
        cleaned_content = data["choices"][0]["message"]["content"].replace('*', '')

        print(cleaned_content)
        logging.info("Perplexity API 응답 성공.")

        return cleaned_content
    except Exception as e:
        print("ERROR: Perplexity API 호출 실패:", e)
        return ""


# 메인 실행 코드
if __name__ == "__main__":
    user_id = "user_12345"
    user_data = fetch_user_data_from_redis(user_id)
    if not user_data:
        print("ERROR: 사용자 데이터가 없습니다. 프로그램을 종료합니다.")
        exit()


    user_profile = {
    "name": "김이화",
    "age": 23,
    "location": "37.561102,126.946637",  # 이화여대 좌표 (위도, 경도)
    "preferences": user_data,
    "time_slot": "14:00-16:00",  # 공백 시간
    "date": "2024-12-17"  #  날짜
    }


    # 사용자 데이터를 바탕으로 Perplexity API 호출
    content = fetch_recommendations_with_perplexity(
        preferences=user_profile["preferences"],
        location=user_profile["location"],
        time_slot=user_profile["time_slot"],
        date=user_profile["date"],
    )