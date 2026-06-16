# 개발 명령어

## 개발 서버

```bash
npm run dev          # Turbopack으로 개발 서버 시작
```

## 빌드

```bash
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 시작
```

## 테스트

```bash
npm run test         # 단일 실행 테스트
npm run test:watch   # 감시 모드 테스트
npm run test:ui      # UI 대시보드로 테스트
npm run test:coverage # 커버리지 리포트
```

## 코드 품질

```bash
npm run lint         # ESLint 검사
```

## 환경 변수

```
NEXT_PUBLIC_SUPABASE_URL=<Supabase 프로젝트 URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase 익명 키>
```
