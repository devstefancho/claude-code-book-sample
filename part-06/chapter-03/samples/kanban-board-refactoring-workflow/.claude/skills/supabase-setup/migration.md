# Migration Guide

Supabase MCP를 통해 마이그레이션을 실행하는 가이드입니다.

## SQL 파일 목록

| 파일                        | 설명                        |
| --------------------------- | --------------------------- |
| `sql/001_create_tables.sql` | 테이블, 인덱스, 트리거 생성 |
| `sql/002_enable_rls.sql`    | RLS 정책 설정               |

## 실행 순서

**반드시 순서대로 실행해야 합니다.**

### Step 1: 테이블 생성

```
mcp__supabase__apply_migration(
  project_id: "<프로젝트_ID>",
  name: "001_create_tables",
  query: <sql/001_create_tables.sql 내용>
)
```

**생성되는 항목:**

- `boards` 테이블: 사용자별 보드
- `cards` 테이블: 보드별 카드
- 인덱스: `idx_boards_user_id`, `idx_cards_board_id`, `idx_cards_status`
- 트리거: `updated_at` 자동 업데이트

### Step 2: RLS 정책 설정

```
mcp__supabase__apply_migration(
  project_id: "<프로젝트_ID>",
  name: "002_enable_rls",
  query: <sql/002_enable_rls.sql 내용>
)
```

**설정되는 정책:**

- 사용자는 자신의 보드만 조회/생성/수정/삭제 가능
- 사용자는 자신의 보드에 속한 카드만 조회/생성/수정/삭제 가능

## 테이블 스키마

### boards

| 컬럼       | 타입        | 설명                               |
| ---------- | ----------- | ---------------------------------- |
| id         | UUID        | PK, 자동 생성                      |
| user_id    | UUID        | FK → auth.users, 소유자            |
| created_at | TIMESTAMPTZ | 생성 시간                          |
| updated_at | TIMESTAMPTZ | 수정 시간 (트리거로 자동 업데이트) |

### cards

| 컬럼        | 타입         | 설명                                |
| ----------- | ------------ | ----------------------------------- |
| id          | UUID         | PK, 자동 생성                       |
| board_id    | UUID         | FK → boards, 소속 보드              |
| title       | VARCHAR(200) | 카드 제목                           |
| description | TEXT         | 카드 설명 (nullable)                |
| status      | VARCHAR(20)  | 상태: 'todo', 'in-progress', 'done' |
| order       | INTEGER      | 컬럼 내 순서                        |
| created_at  | TIMESTAMPTZ  | 생성 시간                           |
| updated_at  | TIMESTAMPTZ  | 수정 시간 (트리거로 자동 업데이트)  |

## 롤백

테이블을 삭제하려면:

```sql
DROP TABLE IF EXISTS public.cards;
DROP TABLE IF EXISTS public.boards;
DROP FUNCTION IF EXISTS update_updated_at_column();
```
