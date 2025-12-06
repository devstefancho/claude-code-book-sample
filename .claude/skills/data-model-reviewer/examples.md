## 1. 매직 스트링 vs Union Type

### Bad: 문자열로 상태 관리

```ts
interface Task {
  id: string;
  title: string;
  status: string; // "TODO", "DONE" 등 오타 발생 가능, 유효성 검사 어려움
}
```

### Good: Union Type으로 제한

```ts
type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

interface Task {
  id: string;
  title: string;
  status: TaskStatus; // 자동완성 지원 및 타입 안전성 확보
}
```

## 2. 데이터 중복(비정규화) vs 참조

### Bad: 데이터 중복 정의

```ts
interface Comment {
  id: string;
  content: string;
  authorName: string; // User 정보가 변경되면 불일치 발생 위험
  authorEmail: string;
  authorAvatar: string;
}
```

### Good: 참조 활용 또는 분리

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
```
