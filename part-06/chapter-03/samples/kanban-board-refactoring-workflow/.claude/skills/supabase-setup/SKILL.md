---
name: supabase-setup
description: Supabase 프로젝트 초기 설정. 테이블 생성, RLS 정책, 환경변수 설정, 타입 생성. "Supabase 설정", "DB 셋업" 요청 시 사용.
---

# Supabase Setup

새 Supabase 프로젝트에 칸반 보드 데이터베이스를 설정합니다.

## Prerequisites

- Supabase 프로젝트가 생성되어 있어야 합니다
- Supabase MCP가 연결되어 있어야 합니다

## Required Input

사용자에게 다음 정보가 필요합니다:

1. **프로젝트 ID**: Supabase 프로젝트 ID (대시보드 URL에서 확인 가능)

정보가 누락된 경우:

- 프로젝트 ID 없음 → "Supabase 프로젝트 ID를 알려주세요. (Settings > General에서 확인)"

## Workflow

### Step 1: 프로젝트 확인

Supabase MCP를 통해 프로젝트 연결 상태를 확인합니다:

```
mcp__supabase__get_project_url(project_id)
```

연결 실패 시 사용자에게 프로젝트 ID 재확인 요청.

### Step 2: 마이그레이션 실행

[migration.md](migration.md)를 참고하여 SQL 파일을 순서대로 실행합니다.

#### 2-1. 테이블 생성

`sql/001_create_tables.sql` 파일 내용을 읽어서 실행:

```
mcp__supabase__apply_migration(
  project_id,
  name: "001_create_tables",
  query: <sql/001_create_tables.sql 내용>
)
```

#### 2-2. RLS 정책 설정

`sql/002_enable_rls.sql` 파일 내용을 읽어서 실행:

```
mcp__supabase__apply_migration(
  project_id,
  name: "002_enable_rls",
  query: <sql/002_enable_rls.sql 내용>
)
```

### Step 3: 환경변수 설정

[env-setup.md](env-setup.md)를 참고하여 환경변수를 설정합니다.

#### 3-1. 프로젝트 URL 조회

```
mcp__supabase__get_project_url(project_id)
```

#### 3-2. API 키 조회

```
mcp__supabase__get_publishable_keys(project_id)
```

#### 3-3. .env.local 업데이트

조회한 값으로 `.env.local` 파일을 생성/업데이트합니다:

```bash
NEXT_PUBLIC_SUPABASE_URL=<조회된 URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<조회된 anon key>
```

### Step 4: TypeScript 타입 재생성

```
mcp__supabase__generate_typescript_types(project_id)
```

생성된 타입을 `src/types/database.ts`에 저장합니다.

### Step 5: 검증

설정이 올바른지 확인:

1. 테이블 존재 확인 (boards, cards)
2. RLS 활성화 확인
3. `.env.local` 파일 존재 확인
4. `src/types/database.ts` 파일 업데이트 확인

## User Report Format

작업 완료 후 사용자에게 보고:

```
## Supabase Setup Complete

### Database
- Tables: boards, cards (created)
- RLS: Enabled with user-based policies
- Triggers: updated_at auto-update

### Environment
- .env.local updated with:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY

### Types
- src/types/database.ts regenerated

### Next Steps
1. 개발 서버 재시작: npm run dev
2. 회원가입 후 보드 테스트
```

## Error Handling

### 마이그레이션 실패 시

- 이미 테이블이 존재하면 `IF NOT EXISTS`로 인해 무시됨
- 다른 오류 발생 시 오류 메시지 확인 후 사용자에게 보고

### 환경변수 조회 실패 시

- 프로젝트 ID 재확인 요청
- Supabase MCP 연결 상태 확인 안내

## Related Files

- [migration.md](migration.md): SQL 마이그레이션 상세
- [env-setup.md](env-setup.md): 환경변수 설정 가이드
- [sql/001_create_tables.sql](sql/001_create_tables.sql): 테이블 생성 SQL
- [sql/002_enable_rls.sql](sql/002_enable_rls.sql): RLS 정책 SQL
