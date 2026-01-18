# Chapter 01. 코드 모음

## 스킬 디렉터리 구조

```
.claude/skills/my-skill/
├── SKILL.md (필수)
├── examples.md (선택)
└── resources/ (선택)
```

## 번역 스킬 프론트매터

```markdown
---
name: translate-politely
description: 사용자가 번역을 요청한 단어를 정중한 표현의 영어로 번역한다.
allowed-tools: Read, Grep, Glob
---
```

## 번역 스킬 본문

```markdown
# Translate Politely

## Instructions

사용자가 번역이라는 번역해달라고 한 내용을 영어, 일본어의 정중한 표현으로 알려줍니다.

## Output Structure

{
    input: {사용자가 입력한 내용},
    result: {영어로 번역한 내용}
}
```

## 전체 스킬 파일

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/translate-politely/SKILL.md

```markdown
---
name: translate-politely
description: 사용자가 번역을 요청한 단어를 정중한 표현의 영어로 번역한다.
allowed-tools: Read, Grep, Glob
---

# Translate Politely

## Instructions

사용자가 번역이라는 번역해달라고 한 내용을 영어, 일본어의 정중한 표현으로 알려줍니다.

## Output Structure

{
    input: {사용자가 입력한 내용},
    result: {영어로 번역한 내용}
}
```
