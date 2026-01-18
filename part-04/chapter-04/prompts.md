# Chapter 04. 프롬프트 모음

## 보안 코드 리뷰 스킬 템플릿

프롬프트 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/prompts/skills/security-template.txt

```
[나]: 보안 코드 리뷰 클로드 코드 스킬 만들어줘

## 도메인
- <도메인>

## 환경
- 언어: **<Python/TypeScript/Kotlin/Lua>**
- 프레임워크: **<Django/FastAPI/React/Spring>**
- 데이터베이스: **<PostgreSQL/MongoDB/Redis/Supabase/Railway>**
- 배포: **<AWS/Docker/Kubernetes/Vercel>**

## 요구사항
1. HIGH/MEDIUM/LOW로 우선순위 분류
2. 각 취약점마다 쉽고 간단한 예시를 제공
   - 취약한 코드 예시
   - 안전한 코드 예시
```

## 칸반보드 프로젝트용 프롬프트

프롬프트 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/prompts/skills/security.txt

```
[나]: 보안 코드 리뷰 클로드 코드 스킬 만들어줘

## 도메인
- 칸반보드 웹 개발

## 환경
- 언어: **Typescript**
- 프레임워크: **Nextjs**
- 데이터베이스: **Supabase**
- 배포: **Vercel**

## 요구사항
1. HIGH/MEDIUM/LOW로 우선순위 분류
2. 각 취약점마다 쉽고 간단한 예시를 제공
   - 취약한 코드 예시
   - 안전한 코드 예시
```

## 보안 코드 리뷰 스킬 사용

```
[나]: web-security-reviewer 스킬 사용해서 kanban-app 코드 리뷰해 줘

[AI]: Kanban-App 웹 보안 검토 보고서
```
