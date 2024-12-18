import openai

# OpenAI API 설정
api_key = "YOUR_API_KEY"
client = openai.OpenAI(api_key=api_key)

# 대화 요약 생성 함수
def generate_conversation_summary(messages):
    summary_prompt = "다음 대화를 요약해 주세요. 길이는 3문장을 넘기지 말고 대화의 핵심 내용만 간결하게 정리해 주세요:\n대화:\n"
    for msg in messages:
        summary_prompt += f"{msg['role']}: {msg['content']}\n"
    summary_prompt += "\n대화 요약:"  

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": summary_prompt}],
        max_tokens=300
    )
    return response.choices[0].message.content.strip()

# 사용자 특성 요약 생성 함수
def generate_user_summary(messages):
    summary_prompt = (
        "다음 대화를 바탕으로 사용자의 성격, 선호, 특징, 취향, 호불호 등을 요약해주세요."
        "특히 사용자가 직접 언급하지 않은 부분이라도 말투, 대화 맥락에서 파악한 특징을 포함해주세요."
        "최종 요약은 이벤트, 일정, 장소 추천에 유용하도록 사용자 성향에 집중해서 작성해 주고, 길이는 3문장을 넘기지 마세요.\n대화:\n"
    )
    for msg in messages:
        summary_prompt += f"{msg['role']}: {msg['content']}\n"
    summary_prompt += "\n사용자 특성 요약:"  

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": summary_prompt}],
        max_tokens=300
    )
    return response.choices[0].message.content.strip()

# 사용자 특성 업데이트 함수
def update_user_summary(previous_summary, new_messages):
    update_prompt = (
        f"다음은 이전 세션에서 생성된 사용자 정보 요약입니다:\n{previous_summary}\n\n"
        "아래는 추가된 대화입니다. 이 내용을 반영해 사용자의 성격, 선호, 특징, 취향, 호불호를 업데이트 해주세요."
        "최종 요약은 길이가 너무 길지 않도록 하고, 이벤트, 일정, 장소 추천에 유용하도록 작성해 주세요.길이는 3문장을 넘기지마세요.\n추가 대화:\n"
    )
    for msg in new_messages:
        update_prompt += f"{msg['role']}: {msg['content']}\n"
    update_prompt += "\n새로운 사용자 특성 요약:"  

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": update_prompt}],
        max_tokens=300
    )
    return response.choices[0].message.content.strip()

# 챗봇 대화 시작
def chatbot_conversation(previous_summary=None, previous_sessions=[], session=1, user_name=None):
    # 이전 세션 요약 학습 메시지 출력 및 시스템 메시지에 추가
    messages = [
        {"role": "system", "content": "너는 사용자에게 친근하게 말을 거는 20대 대학생 느낌의 챗봇이야. 사용자의 대부분은 서울 소재 대학생이니까 시작은 대학이나 전공을 묻고, 전공 관련 내용으로 가볍게 흥미를 끌어. 반말을 유지하고, 말투를 일관되게 해줘. 적당한 밈은 좋지만 농담을 지나치게 많이 하지 마. 사용자의 일상과 취향에 대해 가볍게 물으며 정보를 수집하고, 대화를 이어 나가려고 노력해."}
    ]

    if previous_sessions:
        print("\n[이전 세션 요약 학습 중...]")
        for idx, summary in enumerate(previous_sessions[-3:], start=1):
            messages.append({"role": "system", "content": f"이전 세션 {session - len(previous_sessions) + idx} 요약: {summary}"})
    
    if previous_summary:
        messages.append({"role": "system", "content": f"이전 사용자 정보 요약: {previous_summary}"})

    if user_name is None:
        messages.append({"role": "assistant", "content": "안녕! 만나서 반가워. 먼저 이름을 알려줄래?"})
    else:
        messages.append({"role": "assistant", "content": f"안녕 {user_name}! 다시 만나서 반가워. 오늘 하루는 어땠어?"})

    print(messages[-1]["content"])

    while True:
        user_input = input("당신: ")
        if user_input.strip() == "종료":
            print(f"대화가 종료되었습니다. (세션 {session})")
            conversation_summary = generate_conversation_summary(messages)
            if previous_summary:
                updated_summary = update_user_summary(previous_summary, messages)
            else:
                updated_summary = generate_user_summary(messages)

            print("\n[세션 대화 요약]")
            print(conversation_summary)

            print("\n[사용자 정보 요약]")
            print(updated_summary)

            return conversation_summary, updated_summary, user_name

        if user_name is None:
            user_name = user_input.strip()
            messages.append({"role": "assistant", "content": f"반가워, {user_name}! 잘 지냈어?"})
            print(messages[-1]["content"])
            continue

        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages + [{"role": "user", "content": user_input}],
            max_tokens=300
        )
        reply = response.choices[0].message.content.strip()
        print(f"챗봇: {reply}")
        messages.append({"role": "user", "content": user_input})
        messages.append({"role": "assistant", "content": reply})

# 메인 실행
if __name__ == "__main__":
    previous_sessions = []
    previous_summary = None
    user_name = None
    for session in range(1, 6):
        print(f"\n=== 세션 {session} 시작 ===")
        conversation_summary, previous_summary, user_name = chatbot_conversation(previous_summary, previous_sessions, session, user_name)
        previous_sessions.append(conversation_summary)
