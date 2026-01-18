# 5.3 칸반 보드 (Kanban Board)

> 이 코드는 책의 5.3절 예제 코드입니다.

드래그 앤 드롭 기능을 지원하는 웹 기반 칸반 보드 애플리케이션입니다.

## 주요 기능

- **드래그 앤 드롭**: @dnd-kit을 활용한 직관적인 카드 이동
- **3개의 상태 컬럼**: 할 일(Todo), 진행 중(In Progress), 완료(Done)
- **카드 CRUD**: 카드 생성, 수정, 삭제 기능
- **데이터 영속성**: Zustand persist middleware를 통한 localStorage 자동 저장
- **Supabase 인증**: 이메일/비밀번호 기반 회원가입 및 로그인
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 기술 스택

| 카테고리 | 기술 |
|---------|------|
| Framework | Next.js 15.5 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 3.4 |
| State | Zustand 5.0 |
| Drag & Drop | @dnd-kit |
| Auth & DB | Supabase |
| Validation | Zod |

## 프로젝트 구조

```
05_03/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 인증 페이지 (로그인, 회원가입)
│   │   ├── (protected)/        # 인증 필요 페이지 (칸반 보드)
│   │   └── auth/callback/      # Supabase 인증 콜백
│   ├── components/
│   │   ├── auth/               # 인증 관련 컴포넌트
│   │   ├── board/              # 칸반 보드 컴포넌트
│   │   ├── modals/             # 모달 컴포넌트
│   │   └── ui/                 # 재사용 가능한 UI 컴포넌트
│   ├── hooks/                  # 커스텀 훅
│   ├── lib/                    # 유틸리티 및 설정
│   │   └── supabase/           # Supabase 클라이언트
│   └── types/                  # TypeScript 타입 정의
└── docs/                       # SDD 문서
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 Supabase 설정을 추가합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 학습 포인트

이 예제에서 다루는 주요 개념:

1. **Next.js App Router**: Route Groups를 활용한 레이아웃 분리
2. **Zustand**: 간결한 상태 관리 및 localStorage 연동
3. **@dnd-kit**: 접근성을 고려한 드래그 앤 드롭 구현
4. **Supabase**: 서버리스 인증 및 데이터베이스 연동
5. **TypeScript + Zod**: 타입 안전성과 런타임 검증

## Claude Code로 구축

이 프로젝트는 Claude Code를 사용하여 구축되었습니다.
