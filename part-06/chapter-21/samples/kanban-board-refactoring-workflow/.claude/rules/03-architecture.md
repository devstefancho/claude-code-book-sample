# 아키텍처 구성

## 디렉토리 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 라우트 (login, signup)
│   ├── (protected)/       # 보호된 라우트 (메인 보드)
│   └── auth/callback/     # OAuth 콜백
├── components/            # React 컴포넌트
│   ├── auth/             # 인증 폼
│   ├── board/            # 칸반 보드 (KanbanBoard, Column, Card)
│   ├── modals/           # 모달 (CardFormModal, ConfirmModal)
│   └── ui/               # 기본 UI (Button, Input, Modal)
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티
│   ├── store.ts          # Zustand 스토어
│   ├── validation.ts     # Zod 스키마
│   ├── constants.ts      # 상수 정의
│   └── supabase/         # Supabase 클라이언트
└── types/                 # TypeScript 타입
```

## 데이터 흐름

```
UI (Components)
    ↓ 사용자 액션
Custom Hooks (상태 관리)
    ↓
Zustand Store (전역 상태 + 낙관적 업데이트)
    ↓
Supabase Client (API 호출)
    ↓
PostgreSQL (데이터 저장)
```

## 인증 흐름

- Middleware에서 모든 요청의 세션 검증
- 미인증 시 /login으로 리다이렉트
- 인증된 사용자가 /login 접근 시 /로 리다이렉트

## 데이터베이스 테이블

- **boards**: 사용자별 보드 (user_id로 연결)
- **cards**: 보드별 카드 (board_id로 연결, status/order로 정렬)
