# Chapter 05. 코드 모음

## 데이터 모델 리뷰 스킬 프론트매터

파일 링크: [./samples/skills/data-model-reviewer/SKILL.md](./samples/skills/data-model-reviewer/SKILL.md)

```markdown
---
name: data-model-reviewer
description: Analyze and Refactor TypeScript data models. Detect duplication, improve type safety, and validate relationships in interfaces/types.
allowed-tools: Read, Grep, Glob
---
```

## 본문 요약

```markdown
# Data Model Reviewer

TypeScript 타입 정의를 검토하여 SSOT, 타입 안전성, 데이터 관계의 품질을 확인합니다.
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

## 리뷰 체크리스트

```markdown
## 리뷰 체크리스트

### 타입 안전성 (Type Safety)
- [ ] `any` 타입을 사용하고 있지 않은가?
- [ ] 매직 스트링(Magic String) 대신 Literal Union이나 Enum을 사용했는가?
- [ ] Optional(`?`) 처리가 꼭 필요한 곳에만 사용되었는가?

### 구조 및 관계 (Structure & Relationship)
- [ ] 관련된 데이터가 적절히 그룹화되었는가?
- [ ] 중복된 데이터 정의가 없는가? (SSOT 위반)
- [ ] ID 필드의 타입이 프로젝트 전반에서 일관적인가?
- [ ] 중첩 깊이가 적절한가? (권장: 3단계 이하)
```

## 출력 형식

```markdown
## 출력 형식

[examples.md](examples.md)의 "리뷰 출력 형식" 섹션을 따를 것
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

## 출력 형식 작성

````markdown
## 리뷰 출력 형식

### 요약

| 항목         | 상태    |
| ------------ | ------- |
| SSOT         | ✅ / ⚠️ |
| Type Safety  | ✅ / ⚠️ |
| Relationship | ✅ / ⚠️ |

### 발견된 이슈

#### [심각도: High/Medium/Low] 이슈 제목

- **파일**: `경로/파일명.ts:라인번호`
- **문제**: 문제 설명
- **제안**: 개선 방안

```ts
// 수정 전
문제 코드

// 수정 후
개선 코드
````

## 예시 파일

파일 링크: [./samples/skills/data-model-reviewer/examples.md](./samples/skills/data-model-reviewer/examples.md)
