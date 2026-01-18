# Chapter 06. 코드 모음

## 데이터 모델 리뷰 스킬 프론트매터

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/data-model-reviewer/SKILL.md

```markdown
---
name: data-model-reviewer
description: Analyze and Refactor TypeScript data models. Detect duplication, improve type safety, and validate relationships in interfaces/types.
allowed-tools: Read, Grep, Glob
---
```

## 검사 원칙

```markdown
## 검사 원칙

1. **SSOT (Single Source of Truth)** - 데이터 정의의 중복 제거
2. **Type Safety** - any 지양, Union/Enum 활용
3. **Relationship** - 데이터 간 관계의 명확성
```

## Instructions

```markdown
## Instructions

1. **대상 확인**: 사용자가 특정 파일/디렉토리를 지정한 경우 해당 대상에서 검토, 미지정 시 프로젝트 전체 탐색
2. **타입 파일 탐색**: `Glob`으로 `**/types/**/*.ts`, `**/*.d.ts` 등 타입 정의 파일 찾기
3. **타입 정의 분석**: `Read`로 파일 읽고 interface/type 정의 확인
4. **문제 패턴 검색**: `Grep`으로 `any`, 매직 스트링, 중복 정의 탐지
5. **체크리스트 기반 검토**: 아래 체크리스트 항목별로 검증
6. **결과 출력**: examples.md의 출력 형식에 따라 리뷰 결과 제시
```

## 매직 스트링 vs Union Type

### Bad

```ts
interface Task {
  id: string;
  title: string;
  status: string; // "TODO", "DONE" 등 오타 발생 가능
}
```

### Good

```ts
type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface Task {
  id: string;
  title: string;
  status: TaskStatus; // 자동완성 지원 및 타입 안전성 확보
}
```

## 데이터 중복 vs 참조

### Bad

```ts
interface Comment {
  id: string;
  content: string;
  authorName: string;  // User 정보가 변경되면 불일치 발생 위험
  authorEmail: string;
  authorAvatar: string;
}
```

### Good

```ts
interface UserSummary {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Comment {
  id: string;
  content: string;
  author: UserSummary; // 필요한 정보만 객체로 묶거나 ID로 참조
}
```
