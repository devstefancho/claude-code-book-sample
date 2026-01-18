# Chapter 01. 스킬을 이해하고 간단한 번역 스킬 만들기

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md) | 샘플: [samples/](./samples/)

스킬(Skill)의 개념과 기본 작성법을 알아봅니다.

## 우리에게 익숙한 게임의 스킬

게임의 스킬처럼 클로드 코드의 스킬도 특정 목적을 위한 도구입니다.

## 코드 리뷰 스킬의 종류

- 불필요한 코드 확인 스킬
- 반복된 코드 모듈화 스킬
- 파일 구조를 잘 지키고 있는지 확인하는 스킬

## 스킬의 디렉터리 구조 이해하기

스킬 디렉터리 구조는 [code.md](./code.md)를 참고하세요.

## 스킬의 점진적 공개 (Progressive Disclosure) 전략

### Level 1: 메타데이터 (항상 로드)
- name, description
- 권장: 100 토큰 내외

### Level 2: SKILL.md 본문 (스킬 사용 시 로드)
- 권장: 5,000 토큰 내외

### Level 3: 추가 리소스 (필요시 로드)
- 제한 없음

## 간단한 번역 스킬 작성하기

스킬 파일 경로: `.claude/skills/translate-politely/SKILL.md`

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/translate-politely/SKILL.md

프론트매터, 본문, 전체 파일 내용은 [code.md](./code.md)를 참고하세요.

프롬프트 예시는 [prompts.md](./prompts.md)를 참고하세요.
