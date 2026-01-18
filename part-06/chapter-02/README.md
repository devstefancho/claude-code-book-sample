# Chapter 02. 리팩터링 워크플로에 필요한 실제 파일 알아보기

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md)

리팩터링 워크플로에서 사용되는 실제 파일들의 역할과 구조를 알아봅니다.

## 워크플로 파일 구조

### 메모리 파일
- `CLAUDE.md`: 프로젝트 전반적인 설명
- `.claude/rules/`: 규칙 파일들

### 스킬 파일
- `.claude/skills/`: 코드 리뷰 스킬들
  - `strategic-code-reviewer/`
  - `component-design-reviewer/`
  - `data-model-reviewer/`

### 커맨드 파일
- `.claude/commands/`: 커스텀 슬래시 커맨드
  - `sdd/spec.md`
  - `sdd/plan.md`
  - `sdd/tasks.md`
  - `sdd/implement.md`

## 파일간 연계

1. 메모리 파일이 프로젝트 컨텍스트 제공
2. 스킬 파일이 코드 리뷰 수행
3. 커맨드 파일이 워크플로 자동화
