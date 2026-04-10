# Chapter 02. 코드 모음

## 에르메스 에이전트 설치하기

```shell
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

## hermes와 채팅하기

```shell
hermes
```

## 게이트웨이 시작하기

```shell
hermes gateway start
```

## 게이트웨이 실행 (API 서버 포함)

```shell
export API_SERVER_ENABLED=true

hermes gateway run
```

## API 테스트

```shell
curl -s http://127.0.0.1:8642/v1/chat/completions -H 'Content-Type: application/json' -d '{"model":"hermes-agent","messages":[{"role":"user","content":"안녕하세요"}]}'
```

## 스킬 파일 존재 확인

```shell
# 파일 있음이 출력된다.

[ -f ~/.hermes/skills/research/ai-news-briefing-freshness/SKILL.md ] && echo "파일 있음" || echo "파일 없음"
```

## 크론잡 설정 파일 확인

```shell
open ~/.hermes/cron/jobs.json
```
