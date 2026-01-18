# Chapter 05. 코드 모음

## 컴포넌트 리뷰 스킬 프론트매터

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/component-design-reviewer/SKILL.md

```markdown
---
name: component-design-reviewer
description: Reviews React components and provides improvement suggestions. Use when you need code review, component review, structure improvement, refactoring, or component separation.
allowed-tools: Read, Grep, Glob
---
```

## 5가지 검사 원칙

```markdown
## 검사 원칙

1. **SRP** - 하나의 컴포넌트, 하나의 역할
2. **Props** - drilling 최소화, 명확한 interface
3. **Composition** - 상속보다 합성
4. **Reusability** - 공통 요소 추출
5. **Custom Hooks** - UI/비즈니스 로직 분리
```

## Instructions

```markdown
## Instructions

1. Read로 대상 컴포넌트 파일 읽기
2. 5가지 원칙별로 체크리스트 기반 분석
3. Grep으로 props drilling, hooks 패턴 검색
4. 컴포넌트별 리포트 생성 (Critical/Warning/Suggestion)
5. 문제마다 "문제 코드" vs "개선 코드" 예시 제공
```

## 예시 파일

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/component-design-reviewer/examples.md
