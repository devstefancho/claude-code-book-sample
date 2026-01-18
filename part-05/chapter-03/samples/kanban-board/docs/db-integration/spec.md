# 칸반보드 데이터베이스 통합 명세서

## Original Requirements

1. 이메일/패스워드 로그인을 제공하고 유저마다 1개의 칸반보드를 가질 수 있다.
2. 유저는 자신이 갖고 있는 칸반보드에 대한 아이템만 읽기, 쓰기, 삭제할 수 있다.

---

## Overview

### 무엇을 만드는가 (What)

기존 칸반보드 애플리케이션에 사용자 인증 시스템과 Supabase 데이터베이스 통합을 추가하여, 각 사용자가 자신만의 칸반보드를 관리할 수 있는 멀티테넌트 시스템을 구축한다.

### 왜 필요한가 (Why)

- 현재는 localStorage에만 데이터가 저장되어 기기/브라우저 간 동기화가 불가능
- 사용자별 데이터 분리가 되어 있지 않아 개인화된 경험 제공 불가
- 데이터 보안 및 영속성 보장 필요

### 누가 사용하는가 (Who)

개인 할 일 관리가 필요한 일반 사용자

---

## Goals

1. **사용자 인증 구현**: 이메일/패스워드 기반 회원가입 및 로그인 시스템 제공
2. **데이터베이스 통합**: Supabase를 활용한 서버 측 데이터 저장 및 관리
3. **데이터 격리**: 사용자별 칸반보드 데이터 완전 분리 및 보호
4. **원활한 UX 전환**: 기존 UI/UX를 유지하면서 백엔드 통합

---

## User Stories

### US-001: 회원가입

```
As a 신규 사용자,
I want to 이메일과 패스워드로 계정을 생성하고 싶다,
So that 나만의 칸반보드를 사용할 수 있다.
```

### US-002: 로그인

```
As a 기존 사용자,
I want to 이메일과 패스워드로 로그인하고 싶다,
So that 내 칸반보드 데이터에 접근할 수 있다.
```

### US-003: 로그아웃

```
As a 로그인된 사용자,
I want to 로그아웃하고 싶다,
So that 다른 사람이 내 데이터에 접근하지 못하게 할 수 있다.
```

### US-004: 데이터 영속성

```
As a 로그인된 사용자,
I want to 카드를 추가/수정/삭제하면 자동으로 서버에 저장되길 원한다,
So that 다른 기기에서도 동일한 데이터를 볼 수 있다.
```

### US-005: 데이터 보호

```
As a 사용자,
I want to 내 칸반보드 데이터가 다른 사용자에게 보이지 않길 원한다,
So that 개인 정보가 보호된다.
```

---

## Functional Requirements

### FR-001: 회원가입 (Must-have)

사용자가 이메일과 패스워드로 새 계정을 생성할 수 있어야 한다.

**Acceptance Criteria:**

- [ ] 이메일 형식 검증 (유효한 이메일 주소)
- [ ] 패스워드 최소 8자 이상
- [ ] 중복 이메일 가입 방지
- [ ] 가입 성공 시 자동 로그인

---

### FR-002: 로그인 (Must-have)

등록된 사용자가 이메일과 패스워드로 로그인할 수 있어야 한다.

**Acceptance Criteria:**

- [ ] 올바른 자격 증명으로 로그인 성공
- [ ] 잘못된 자격 증명 시 에러 메시지 표시
- [ ] 로그인 상태 유지 (세션 관리)

---

### FR-003: 로그아웃 (Must-have)

로그인된 사용자가 로그아웃할 수 있어야 한다.

**Acceptance Criteria:**

- [ ] 로그아웃 버튼 클릭 시 세션 종료
- [ ] 로그아웃 후 로그인 페이지로 리다이렉트

---

### FR-004: 칸반보드 자동 생성 (Must-have)

신규 사용자 가입 시 자동으로 1개의 칸반보드가 생성되어야 한다.

**Acceptance Criteria:**

- [ ] 회원가입 완료 시 기본 칸반보드 자동 생성
- [ ] 기본 3개 컬럼 (할 일, 진행 중, 완료) 포함
- [ ] 사용자당 1개의 칸반보드만 존재

---

### FR-005: 카드 CRUD 동기화 (Must-have)

카드 생성/수정/삭제 시 Supabase 데이터베이스와 동기화되어야 한다.

**Acceptance Criteria:**

- [ ] 카드 추가 시 DB에 즉시 저장
- [ ] 카드 수정 시 DB에 즉시 반영
- [ ] 카드 삭제 시 DB에서 즉시 제거
- [ ] 드래그 앤 드롭으로 이동 시 상태 및 순서 DB 반영

---

### FR-006: 보호된 라우트 (Must-have)

인증되지 않은 사용자는 칸반보드에 접근할 수 없어야 한다.

**Acceptance Criteria:**

- [ ] 비로그인 사용자가 메인 페이지 접근 시 로그인 페이지로 리다이렉트
- [ ] 로그인 사용자만 칸반보드 접근 가능

---

### FR-007: 데이터 로딩 (Must-have)

로그인 시 사용자의 칸반보드 데이터를 서버에서 불러와야 한다.

**Acceptance Criteria:**

- [ ] 로그인 후 사용자의 보드 및 카드 데이터 자동 로드
- [ ] 로딩 중 상태 표시
- [ ] 로드 실패 시 에러 처리

---

## Non-Functional Requirements

### NFR-001: 보안 (Security)

- **인증**: Supabase Auth를 통한 JWT 기반 인증
- **권한**: Row Level Security (RLS) 정책으로 사용자별 데이터 격리
- **전송**: HTTPS를 통한 암호화된 통신
- **패스워드**: Supabase에서 bcrypt 해싱 처리

### NFR-002: 성능 (Performance)

- 로그인 응답 시간: 2초 이내
- 카드 CRUD 응답 시간: 1초 이내
- 초기 데이터 로딩: 3초 이내

### NFR-003: 사용성 (Usability)

- 기존 칸반보드 UI/UX 유지
- 로딩/에러 상태에 대한 명확한 피드백
- 폼 검증 에러 메시지 명확히 표시

### NFR-004: 호환성 (Compatibility)

- 기존 기능과의 호환성 유지 (드래그 앤 드롭, 모달 등)
- 모던 브라우저 지원 (Chrome, Firefox, Safari, Edge 최신 버전)

---

## Constraints & Assumptions

### Technical Constraints

- **백엔드**: Supabase (PostgreSQL, Auth, RLS) 사용
- **프론트엔드**: 기존 Next.js 15 + TypeScript 유지
- **상태 관리**: Zustand 기반 구조 유지하되 서버 동기화 추가

### Business Constraints

- 기존 UI 컴포넌트 재사용 (최소한의 UI 변경)
- 사용자당 1개 보드만 허용 (다중 보드 미지원)

### Assumptions

- Supabase 프로젝트가 이미 생성되어 있음 (project_ref: aaxmgihqrcmhsokzremv)
- 사용자는 유효한 이메일 주소를 가지고 있음
- 이메일 인증은 필수가 아님 (가입 즉시 사용 가능)

---

## Success Criteria

### 정량적 지표

- [ ] 회원가입 → 로그인 → 카드 생성까지 3분 이내 완료 가능
- [ ] 페이지 새로고침 후 데이터 100% 유지
- [ ] 다른 기기에서 로그인 시 동일 데이터 확인

### 정성적 지표

- [ ] 기존 드래그 앤 드롭 기능 정상 작동
- [ ] 로그인/로그아웃 흐름이 직관적
- [ ] 에러 상황에서 명확한 안내 제공

### 보안 체크리스트

- [ ] RLS 정책으로 타 사용자 데이터 접근 차단 확인
- [ ] 비인증 상태에서 API 직접 호출 차단 확인
- [ ] SQL Injection 방지 확인 (Supabase 파라미터 바인딩)

---

## Database Schema (참고)

### users (Supabase Auth 자동 관리)

- id (UUID, PK)
- email
- created_at

### boards

- id (UUID, PK)
- user_id (UUID, FK → auth.users)
- created_at
- updated_at

### cards

- id (UUID, PK)
- board_id (UUID, FK → boards)
- title (VARCHAR 200)
- description (TEXT, max 2000)
- status (ENUM: 'todo', 'in-progress', 'done')
- order (INTEGER)
- created_at
- updated_at

### RLS Policies

- boards: user_id = auth.uid()인 경우만 CRUD 허용
- cards: board.user_id = auth.uid()인 경우만 CRUD 허용
