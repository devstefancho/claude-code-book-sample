# 코딩 컨벤션

## 파일 명명 규칙

- 컴포넌트: PascalCase (예: KanbanBoard.tsx)
- 훅: camelCase, use 접두사 (예: useCardForm.ts)
- 유틸리티: camelCase (예: validation.ts)
- 타입: index.ts 또는 도메인명.ts

## 컴포넌트 작성

- 함수형 컴포넌트 사용
- Props는 interface로 정의
- 복잡한 로직은 커스텀 훅으로 분리

## 상태관리 패턴

- 전역 상태: Zustand (lib/store.ts)
- 폼 상태: 커스텀 훅 (useCardForm 등)
- 낙관적 업데이트: UI 먼저 변경 후 API 호출, 실패 시 롤백

## 검증 규칙

- Zod 스키마로 런타임 검증
- 카드 제목: 1-200자
- 카드 설명: 0-2000자

## Supabase 사용

- 클라이언트: lib/supabase/client.ts
- 서버: lib/supabase/server.ts
- 미들웨어: lib/supabase/middleware.ts

## 접근성

- 모든 인터랙티브 요소에 aria-label
- 키보드 네비게이션 지원
- 모달에 포커스 트랩 적용
