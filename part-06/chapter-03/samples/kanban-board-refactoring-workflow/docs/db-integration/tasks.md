# Task Breakdown - 칸반보드 데이터베이스 통합

**Generated**: 2025-12-07
**Branch**: db-integration
**Total Tasks**: 22
**Task Groups**: 6

---

## Task Group: Database Setup

**Complexity**: Medium
**Estimated Tasks**: 4

### T-001: Create boards table

**Purpose**: 사용자별 칸반보드를 저장할 테이블 생성
**Required**: Yes
**Dependencies**: None
**Acceptance Criteria**:

- [ ] boards 테이블이 Supabase에 생성됨
- [ ] user_id가 auth.users를 참조하는 FK로 설정됨
- [ ] user_id에 UNIQUE 제약조건 적용 (사용자당 1개 보드)
- [ ] created_at, updated_at 타임스탬프 자동 생성

**Implementation Notes**:

- Supabase MCP의 `apply_migration` 사용
- CASCADE delete 설정으로 사용자 삭제 시 보드도 삭제

---

### T-002: Create cards table

**Purpose**: 카드 데이터를 저장할 테이블 생성
**Required**: Yes
**Dependencies**: T-001
**Acceptance Criteria**:

- [ ] cards 테이블이 Supabase에 생성됨
- [ ] board_id가 boards를 참조하는 FK로 설정됨
- [ ] title은 VARCHAR(200) NOT NULL
- [ ] description은 TEXT (최대 2000자)
- [ ] status는 'todo', 'in-progress', 'done' 중 하나만 허용
- [ ] order는 INTEGER로 카드 순서 관리

**Implementation Notes**:

- CHECK 제약조건으로 status 값 제한
- CHECK 제약조건으로 description 길이 제한

---

### T-003: Create database indexes

**Purpose**: 쿼리 성능 최적화를 위한 인덱스 생성
**Required**: Yes
**Dependencies**: T-002
**Acceptance Criteria**:

- [ ] boards.user_id에 인덱스 생성
- [ ] cards.board_id에 인덱스 생성
- [ ] cards(board_id, status, order) 복합 인덱스 생성

**Implementation Notes**:

- 카드 정렬 및 필터링 쿼리 최적화

---

### T-004: Apply RLS policies

**Purpose**: Row Level Security로 사용자별 데이터 격리 보장
**Required**: Yes
**Dependencies**: T-002
**Acceptance Criteria**:

- [ ] boards 테이블에 RLS 활성화
- [ ] boards에 SELECT/INSERT/UPDATE/DELETE 정책 적용 (user_id = auth.uid())
- [ ] cards 테이블에 RLS 활성화
- [ ] cards에 SELECT/INSERT/UPDATE/DELETE 정책 적용 (보드 소유자만 접근)
- [ ] 다른 사용자의 데이터 접근 불가 확인

**Implementation Notes**:

- cards RLS는 boards 테이블을 서브쿼리로 조인하여 검증

---

## Task Group: Supabase Client Setup

**Complexity**: Low
**Estimated Tasks**: 4

### T-005: Install Supabase dependencies

**Purpose**: Supabase 클라이언트 라이브러리 설치
**Required**: Yes
**Dependencies**: None
**Acceptance Criteria**:

- [ ] @supabase/supabase-js 설치됨
- [ ] @supabase/ssr 설치됨
- [ ] package.json에 의존성 추가됨

**Implementation Notes**:

- npm install @supabase/supabase-js @supabase/ssr

---

### T-006: Configure environment variables

**Purpose**: Supabase 연결에 필요한 환경 변수 설정
**Required**: Yes
**Dependencies**: T-005
**Acceptance Criteria**:

- [ ] .env.local 파일 생성
- [ ] NEXT_PUBLIC_SUPABASE_URL 설정
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY 설정
- [ ] .gitignore에 .env.local 포함 확인

**Implementation Notes**:

- Supabase Dashboard에서 키 확인
- ANON_KEY는 클라이언트에서 사용 가능한 공개 키

---

### T-007: Create Supabase client utilities

**Purpose**: 브라우저/서버 환경별 Supabase 클라이언트 생성
**Required**: Yes
**Dependencies**: T-006
**Acceptance Criteria**:

- [ ] src/lib/supabase/client.ts 생성 (브라우저용)
- [ ] src/lib/supabase/server.ts 생성 (서버 컴포넌트용)
- [ ] src/lib/supabase/middleware.ts 생성 (미들웨어용)
- [ ] 쿠키 기반 세션 관리 구현

**Implementation Notes**:

- @supabase/ssr의 createBrowserClient, createServerClient 사용
- 서버 클라이언트는 cookies() 활용

---

### T-008: Add TypeScript types for database

**Purpose**: 데이터베이스 스키마에 맞는 TypeScript 타입 정의
**Required**: Yes
**Dependencies**: T-004
**Acceptance Criteria**:

- [ ] DbBoard 인터페이스 정의
- [ ] DbCard 인터페이스 정의
- [ ] 기존 Card 타입과 DbCard 매핑 유틸리티

**Implementation Notes**:

- src/types/index.ts 수정
- Supabase MCP의 generate_typescript_types 활용 가능

---

## Task Group: Authentication

**Complexity**: Medium
**Estimated Tasks**: 6

### T-009: Implement Next.js middleware

**Purpose**: 보호된 라우트에 대한 인증 검사
**Required**: Yes
**Dependencies**: T-007
**Acceptance Criteria**:

- [ ] src/middleware.ts 생성
- [ ] /login, /signup은 공개 접근 허용
- [ ] 그 외 라우트는 인증 필요
- [ ] 미인증 시 /login으로 리다이렉트
- [ ] 세션 쿠키 갱신 처리

**Implementation Notes**:

- matcher 설정으로 API 라우트 제외
- updateSession으로 토큰 자동 갱신

---

### T-010: Create auth route group structure

**Purpose**: 인증 관련 페이지 라우트 구조 설정
**Required**: Yes
**Dependencies**: T-009
**Acceptance Criteria**:

- [ ] src/app/(auth)/login/page.tsx 생성
- [ ] src/app/(auth)/signup/page.tsx 생성
- [ ] src/app/auth/callback/route.ts 생성 (OAuth 콜백용)

**Implementation Notes**:

- (auth) 라우트 그룹으로 레이아웃 공유
- callback은 이메일 인증 링크 처리

---

### T-011: Create LoginForm component

**Purpose**: 이메일/패스워드 로그인 UI 구현
**Required**: Yes
**Dependencies**: T-010
**Acceptance Criteria**:

- [ ] src/components/auth/LoginForm.tsx 생성
- [ ] 이메일, 패스워드 입력 필드
- [ ] 로그인 버튼 및 로딩 상태
- [ ] 에러 메시지 표시
- [ ] 회원가입 페이지 링크
- [ ] 로그인 성공 시 메인 페이지로 리다이렉트

**Implementation Notes**:

- 기존 Input, Button 컴포넌트 재사용
- Supabase signInWithPassword 호출

---

### T-012: Create SignupForm component

**Purpose**: 회원가입 UI 구현
**Required**: Yes
**Dependencies**: T-010
**Acceptance Criteria**:

- [ ] src/components/auth/SignupForm.tsx 생성
- [ ] 이메일, 패스워드, 패스워드 확인 입력 필드
- [ ] 패스워드 최소 8자 검증
- [ ] 패스워드 일치 검증
- [ ] 가입 성공 시 이메일 인증 안내 표시
- [ ] 로그인 페이지 링크

**Implementation Notes**:

- Supabase signUp 호출
- 이메일 인증 필요 여부는 Supabase 설정에 따름

---

### T-013: Create LogoutButton component

**Purpose**: 로그아웃 기능 구현
**Required**: Yes
**Dependencies**: T-007
**Acceptance Criteria**:

- [ ] src/components/auth/LogoutButton.tsx 생성
- [ ] 클릭 시 Supabase signOut 호출
- [ ] 로그아웃 후 /login으로 리다이렉트
- [ ] 로딩 상태 표시

**Implementation Notes**:

- 기존 Button 컴포넌트 스타일 재사용

---

### T-014: Create useAuth hook

**Purpose**: 인증 상태 및 사용자 정보 접근 훅
**Required**: Yes
**Dependencies**: T-007
**Acceptance Criteria**:

- [ ] src/hooks/useAuth.ts 생성
- [ ] 현재 사용자 정보 반환
- [ ] 로딩 상태 반환
- [ ] 인증 상태 변경 구독

**Implementation Notes**:

- onAuthStateChange 이벤트 구독
- 컴포넌트에서 인증 상태 확인에 사용

---

## Task Group: Protected Routes & Layout

**Complexity**: Low
**Estimated Tasks**: 2

### T-015: Create protected route layout

**Purpose**: 인증된 사용자만 접근 가능한 레이아웃 구현
**Required**: Yes
**Dependencies**: T-009, T-013
**Acceptance Criteria**:

- [ ] src/app/(protected)/layout.tsx 생성
- [ ] 서버 컴포넌트에서 세션 확인
- [ ] LogoutButton 포함
- [ ] 현재 사용자 이메일 표시

**Implementation Notes**:

- 서버 컴포넌트로 구현하여 초기 로드 최적화

---

### T-016: Move kanban board to protected route

**Purpose**: 기존 칸반보드 페이지를 보호된 라우트로 이동
**Required**: Yes
**Dependencies**: T-015
**Acceptance Criteria**:

- [ ] src/app/page.tsx를 src/app/(protected)/page.tsx로 이동
- [ ] 기존 UI/기능 유지
- [ ] 루트 페이지는 /login으로 리다이렉트

**Implementation Notes**:

- 기존 코드 최소 수정

---

## Task Group: Data Synchronization

**Complexity**: High
**Estimated Tasks**: 4

### T-017: Modify store for board loading

**Purpose**: Zustand store에 보드 로딩 기능 추가
**Required**: Yes
**Dependencies**: T-008, T-014
**Acceptance Criteria**:

- [ ] boardId 상태 추가
- [ ] isLoading, error 상태 추가
- [ ] loadBoard 액션 구현 (보드 조회, 없으면 생성)
- [ ] 첫 로그인 시 기본 3개 컬럼 포함 보드 자동 생성

**Implementation Notes**:

- 서버에서 보드 로드 후 cards를 columns로 변환
- upsert 패턴으로 보드 생성 처리

---

### T-018: Implement card CRUD with Supabase

**Purpose**: 카드 생성/수정/삭제를 Supabase와 동기화
**Required**: Yes
**Dependencies**: T-017
**Acceptance Criteria**:

- [ ] addCard가 Supabase에 카드 생성
- [ ] updateCard가 Supabase에 카드 수정
- [ ] deleteCard가 Supabase에서 카드 삭제
- [ ] Optimistic update 적용 (UI 먼저 업데이트)
- [ ] 서버 실패 시 롤백

**Implementation Notes**:

- 기존 store 액션 수정
- try-catch로 에러 처리 및 롤백

---

### T-019: Implement drag and drop sync

**Purpose**: 드래그 앤 드롭 시 카드 상태/순서를 서버에 동기화
**Required**: Yes
**Dependencies**: T-018
**Acceptance Criteria**:

- [ ] moveCard가 status 변경을 Supabase에 반영
- [ ] 같은 컬럼 내 순서 변경 시 order 업데이트
- [ ] 다른 컬럼으로 이동 시 status + order 업데이트
- [ ] 영향받는 카드들의 order 일괄 업데이트

**Implementation Notes**:

- 배치 업데이트로 네트워크 호출 최소화
- order 재계산 로직 필요

---

### T-020: Remove localStorage persistence

**Purpose**: 서버 기반 저장으로 전환 후 localStorage 코드 제거
**Required**: Yes
**Dependencies**: T-019
**Acceptance Criteria**:

- [ ] Zustand persist 미들웨어 제거
- [ ] localStorage 관련 코드 정리
- [ ] 앱 시작 시 서버에서 데이터 로드

**Implementation Notes**:

- 기존 localStorage 데이터는 마이그레이션 불필요 (새 시스템)

---

## Task Group: UI Polish & Error Handling

**Complexity**: Low
**Estimated Tasks**: 2

### T-021: Add loading states

**Purpose**: 데이터 로딩 중 사용자 피드백 제공
**Required**: Yes
**Dependencies**: T-017
**Acceptance Criteria**:

- [ ] 보드 로딩 시 스피너/스켈레톤 표시
- [ ] 카드 CRUD 작업 중 버튼 비활성화
- [ ] 로그인/회원가입 버튼 로딩 상태

**Implementation Notes**:

- 기존 UI 컴포넌트 활용

---

### T-022: Add error handling UI

**Purpose**: 에러 발생 시 사용자에게 명확한 피드백 제공
**Required**: Yes
**Dependencies**: T-021
**Acceptance Criteria**:

- [ ] 로그인 실패 메시지 (잘못된 자격 증명)
- [ ] 회원가입 에러 메시지 (중복 이메일 등)
- [ ] 카드 저장 실패 시 토스트/알림
- [ ] 네트워크 에러 처리

**Implementation Notes**:

- 사용자 친화적인 에러 메시지로 변환

---

## Summary

### Task Groups Overview

| Group                      | Tasks | Complexity | Required | Optional |
| -------------------------- | ----- | ---------- | -------- | -------- |
| Database Setup             | 4     | Medium     | 4        | 0        |
| Supabase Client Setup      | 4     | Low        | 4        | 0        |
| Authentication             | 6     | Medium     | 6        | 0        |
| Protected Routes & Layout  | 2     | Low        | 2        | 0        |
| Data Synchronization       | 4     | High       | 4        | 0        |
| UI Polish & Error Handling | 2     | Low        | 2        | 0        |

### All Tasks Summary

| ID    | Task                              | Purpose                    | Required | Dependencies |
| ----- | --------------------------------- | -------------------------- | -------- | ------------ |
| T-001 | Create boards table               | 사용자별 보드 저장         | Yes      | None         |
| T-002 | Create cards table                | 카드 데이터 저장           | Yes      | T-001        |
| T-003 | Create database indexes           | 쿼리 성능 최적화           | Yes      | T-002        |
| T-004 | Apply RLS policies                | 사용자별 데이터 격리       | Yes      | T-002        |
| T-005 | Install Supabase dependencies     | 클라이언트 라이브러리 설치 | Yes      | None         |
| T-006 | Configure environment variables   | Supabase 연결 설정         | Yes      | T-005        |
| T-007 | Create Supabase client utilities  | 클라이언트 생성 유틸리티   | Yes      | T-006        |
| T-008 | Add TypeScript types for database | DB 스키마 타입 정의        | Yes      | T-004        |
| T-009 | Implement Next.js middleware      | 라우트 보호                | Yes      | T-007        |
| T-010 | Create auth route group structure | 인증 페이지 라우트         | Yes      | T-009        |
| T-011 | Create LoginForm component        | 로그인 UI                  | Yes      | T-010        |
| T-012 | Create SignupForm component       | 회원가입 UI                | Yes      | T-010        |
| T-013 | Create LogoutButton component     | 로그아웃 기능              | Yes      | T-007        |
| T-014 | Create useAuth hook               | 인증 상태 관리 훅          | Yes      | T-007        |
| T-015 | Create protected route layout     | 보호된 레이아웃            | Yes      | T-009, T-013 |
| T-016 | Move kanban board to protected    | 칸반보드 라우트 이동       | Yes      | T-015        |
| T-017 | Modify store for board loading    | 보드 로딩 기능             | Yes      | T-008, T-014 |
| T-018 | Implement card CRUD with Supabase | 카드 CRUD 동기화           | Yes      | T-017        |
| T-019 | Implement drag and drop sync      | 드래그 앤 드롭 동기화      | Yes      | T-018        |
| T-020 | Remove localStorage persistence   | localStorage 제거          | Yes      | T-019        |
| T-021 | Add loading states                | 로딩 상태 UI               | Yes      | T-017        |
| T-022 | Add error handling UI             | 에러 처리 UI               | Yes      | T-021        |

---

## Next Steps

To begin implementation, run:

- `/implement` - Implement tasks one by one with guidance
- `/implement --all` - Implement all tasks in sequence

**Recommendation**: Start with `/implement` for better control and review at each step.
