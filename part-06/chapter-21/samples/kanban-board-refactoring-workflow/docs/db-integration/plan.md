# 칸반보드 데이터베이스 통합 기술 구현 계획

## Original Tech Stack Request

```
1. database 서버는 supabase를 사용한다.
2. supabase mcp를 사용해서 query를 실행한다.
```

---

## Technology Stack

### Backend Database

- **Supabase**: PostgreSQL 기반 BaaS
  - Auth: 이메일/패스워드 인증
  - Database: PostgreSQL
  - RLS: Row Level Security 정책
  - MCP: Claude Code에서 직접 쿼리 실행

### Frontend Framework (기존 유지)

- **Next.js** (15.5.0): App Router 사용
- **React** (19.0.0): UI 라이브러리
- **TypeScript** (5.7.2): 타입 안전성

### State Management (기존 유지)

- **Zustand** (5.0.8): 전역 상태 관리 + 서버 동기화 확장

### Additional Dependencies (신규 추가)

- **@supabase/supabase-js** (^2.x): Supabase 클라이언트
- **@supabase/ssr** (^0.x): Next.js SSR 지원

---

## Architecture Overview

### 시스템 구조

```
[Client Browser]
      │
      ▼
[Next.js App Router]
      │
      ├─► [Auth Pages] ─────► [Supabase Auth]
      │
      ├─► [Protected Routes]
      │         │
      │         ▼
      │   [Zustand Store]
      │         │
      │         ▼
      │   [Supabase Client] ─► [Supabase Database]
      │                              │
      │                              ▼
      │                        [RLS Policies]
      │
      └─► [Middleware] ───────► Session 검증
```

### 디렉토리 구조 (변경 사항)

```
src/
├── app/
│   ├── (auth)/                    # 신규: 인증 라우트 그룹
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (protected)/               # 신규: 보호된 라우트 그룹
│   │   ├── layout.tsx             # 인증 체크 레이아웃
│   │   └── page.tsx               # 기존 칸반보드 (이동)
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts           # 신규: Auth 콜백
│   ├── layout.tsx                 # 기존 유지
│   └── globals.css                # 기존 유지
├── components/
│   ├── auth/                      # 신규: 인증 컴포넌트
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── LogoutButton.tsx
│   ├── board/                     # 기존 유지
│   ├── modals/                    # 기존 유지
│   └── ui/                        # 기존 유지
├── hooks/
│   ├── useAuth.ts                 # 신규: 인증 훅
│   └── ... (기존 유지)
├── lib/
│   ├── supabase/                  # 신규: Supabase 설정
│   │   ├── client.ts              # 브라우저 클라이언트
│   │   ├── server.ts              # 서버 클라이언트
│   │   └── middleware.ts          # 미들웨어 클라이언트
│   ├── store.ts                   # 수정: 서버 동기화 추가
│   └── ... (기존 유지)
├── types/
│   └── index.ts                   # 수정: DB 타입 추가
└── middleware.ts                  # 신규: 라우트 보호
```

---

## Data Models

### Database Schema (Supabase MCP로 생성)

```sql
-- boards 테이블
CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)  -- 사용자당 1개 보드
);

-- cards 테이블
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT DEFAULT '' CHECK (char_length(description) <= 2000),
  status VARCHAR(20) NOT NULL CHECK (status IN ('todo', 'in-progress', 'done')),
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_cards_board_id ON cards(board_id);
CREATE INDEX idx_cards_status_order ON cards(board_id, status, "order");
CREATE INDEX idx_boards_user_id ON boards(user_id);
```

### RLS Policies

```sql
-- boards RLS
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own board"
  ON boards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own board"
  ON boards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own board"
  ON boards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own board"
  ON boards FOR DELETE
  USING (auth.uid() = user_id);

-- cards RLS
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cards"
  ON cards FOR SELECT
  USING (
    board_id IN (SELECT id FROM boards WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own cards"
  ON cards FOR INSERT
  WITH CHECK (
    board_id IN (SELECT id FROM boards WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own cards"
  ON cards FOR UPDATE
  USING (
    board_id IN (SELECT id FROM boards WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete own cards"
  ON cards FOR DELETE
  USING (
    board_id IN (SELECT id FROM boards WHERE user_id = auth.uid())
  );
```

### TypeScript 타입 (기존 확장)

```typescript
// types/index.ts에 추가
export interface DbCard {
  id: string;
  board_id: string;
  title: string;
  description: string;
  status: CardStatus;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface DbBoard {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
```

---

## Component Structure

### 신규 컴포넌트

```
components/
└── auth/
    ├── LoginForm.tsx       # 로그인 폼 (이메일, 패스워드)
    ├── SignupForm.tsx      # 회원가입 폼 (이메일, 패스워드)
    └── LogoutButton.tsx    # 로그아웃 버튼
```

### 컴포넌트 설계

#### LoginForm.tsx

- Props: 없음
- State: email, password, error, loading
- 기능: Supabase signInWithPassword 호출
- UI: 기존 Input, Button 컴포넌트 재사용

#### SignupForm.tsx

- Props: 없음
- State: email, password, confirmPassword, error, loading
- 기능: Supabase signUp 호출 (이메일 인증 필요)
- 가입 후: 이메일 확인 안내 메시지 표시
- UI: 기존 Input, Button 컴포넌트 재사용

#### LogoutButton.tsx

- Props: 없음
- 기능: Supabase signOut 호출 + 리다이렉트
- UI: 기존 Button 컴포넌트 재사용

---

## State Management

### Zustand Store 수정 방향

```typescript
// store.ts 수정 개념
export interface KanbanState {
  // 기존
  columns: Record<CardStatus, Column>;

  // 신규 추가
  boardId: string | null;
  isLoading: boolean;
  error: string | null;

  // 기존 액션 (동기화 로직 추가)
  addCard: (card: Omit<Card, "id" | "createdAt" | "updatedAt" | "order">) => Promise<void>;
  updateCard: (id: string, updates: Partial<Pick<Card, "title" | "description">>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  moveCard: (cardId: string, targetStatus: CardStatus, targetOrder: number) => Promise<void>;

  // 신규 액션
  loadBoard: () => Promise<void>; // 보드 로드, 없으면 자동 생성
  setBoardId: (boardId: string) => void;
}
```

### 동기화 전략

- **Optimistic Update**: UI 먼저 업데이트 → 백그라운드 서버 동기화
- **Error Rollback**: 서버 실패 시 이전 상태로 복원
- **localStorage 제거**: 서버 기반으로 전환

---

## Security Considerations

### 인증 (Authentication)

- Supabase Auth JWT 기반
- 이메일 인증(Email Verification) 필수
- 세션 쿠키 자동 관리 (@supabase/ssr)
- 미들웨어에서 세션 검증

### 권한 (Authorization)

- RLS 정책으로 서버 레벨 데이터 격리
- 클라이언트는 자신의 데이터만 조회 가능

### 입력 검증

- 클라이언트: 기존 Zod 스키마 유지
- 서버: PostgreSQL CHECK 제약조건

---

## Testing Strategy

### 테스트 범위 (MVP)

- 수동 E2E 테스트
- Supabase Dashboard에서 RLS 정책 검증

### 보안 테스트 체크리스트

- [ ] 로그인하지 않은 상태에서 /board 접근 시 리다이렉트
- [ ] 다른 사용자의 보드/카드 접근 시 빈 결과
- [ ] SQL Injection 시도 차단 확인

---

## Deployment Plan

### 환경 변수

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://aaxmgihqrcmhsokzremv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
```

### Supabase MCP 활용

- 개발 중 스키마 생성/수정: `mcp__supabase__apply_migration`
- 데이터 조회/테스트: `mcp__supabase__execute_sql`
- 타입 생성: `mcp__supabase__generate_typescript_types`

---

## Dependencies

### Production Dependencies (신규)

```json
{
  "@supabase/supabase-js": "^2.47.0",
  "@supabase/ssr": "^0.5.0"
}
```

### 기존 Dependencies (유지)

```json
{
  "next": "15.5.0",
  "react": "19.0.0",
  "zustand": "5.0.8",
  "zod": "3.25.76",
  "@dnd-kit/core": "6.3.1",
  "@dnd-kit/sortable": "10.0.0"
}
```

---

## Implementation Order

### Phase 1: Database Setup (Supabase MCP)

1. boards 테이블 생성
2. cards 테이블 생성
3. RLS 정책 적용
4. 인덱스 생성

### Phase 2: Auth Integration

1. Supabase 클라이언트 설정 (client.ts, server.ts, middleware.ts)
2. 미들웨어 구현 (라우트 보호)
3. 로그인/회원가입 페이지 구현
4. 로그아웃 기능 구현

### Phase 3: Data Sync

1. Zustand store 수정 (Supabase 연동)
2. 보드 자동 생성 로직 (첫 로그인 시 보드 없으면 생성)
3. 카드 CRUD 동기화
4. 드래그 앤 드롭 동기화

### Phase 4: UI Polish

1. 로딩 상태 표시
2. 에러 처리 및 표시
3. localStorage 기반 코드 제거

---

## Critical Files to Modify

### 신규 생성

- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/middleware.ts`
- `src/middleware.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/app/(protected)/layout.tsx`
- `src/app/auth/callback/route.ts`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/SignupForm.tsx`
- `src/components/auth/LogoutButton.tsx`
- `src/hooks/useAuth.ts`
- `.env.local`

### 수정

- `src/lib/store.ts` (Supabase 동기화 추가)
- `src/types/index.ts` (DB 타입 추가)
- `src/app/page.tsx` → `src/app/(protected)/page.tsx` (이동)
