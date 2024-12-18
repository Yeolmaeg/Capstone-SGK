import redis

# Redis 연결 설정
redis_host = "127.0.0.1"  # Colab에서 Redis는 localhost에서 실행됨
redis_port = 6379         # 기본 Redis 포트

def save_preferences_to_redis(user_id, characteristic, summary):
    try:
        # Redis 연결
        r = redis.StrictRedis(host=redis_host, port=redis_port, decode_responses=True)
        # 데이터를 딕셔너리로 저장
        preferences = {
            "characteristic": characteristic,
            "summary": summary
        }
        r.set(user_id, str(preferences))
        print(f"사용자 ID: {user_id}의 데이터 저장 완료")
    except Exception as e:
        print("ERROR: Redis에 사용자 데이터를 저장 실패:", e)

# 테스트 실행
if __name__ == "__main__":
    user_id = "user_12345"
    characteristic = [""]
    summary = [""]
    # Redis에 사용자 취향 데이터 저장
    save_preferences_to_redis(user_id, characteristic, summary)