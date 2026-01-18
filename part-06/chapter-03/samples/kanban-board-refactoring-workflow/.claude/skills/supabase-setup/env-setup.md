# Environment Setup

Supabase 연결에 필요한 환경변수 설정 가이드입니다.

## 필요한 환경변수

| 변수명                          | 설명                  |
| ------------------------------- | --------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 익명 클라이언트 키    |

## MCP로 값 조회

### 프로젝트 URL 조회

```
mcp__supabase__get_project_url(project_id: "<프로젝트_ID>")
```

### API 키 조회

```
mcp__supabase__get_publishable_keys(project_id: "<프로젝트_ID>")
```

## .env.local 파일 형식

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 스크립트로 업데이트

```bash
./scripts/update-env.sh "<SUPABASE_URL>" "<ANON_KEY>"
```

## 주의사항

1. `.env.local`은 `.gitignore`에 포함되어야 합니다
2. `NEXT_PUBLIC_` 접두사가 있어야 클라이언트에서 접근 가능
3. Anon key는 RLS로 보호되므로 클라이언트에 노출되어도 안전

## 환경변수 확인

설정 후 개발 서버를 재시작하세요:

```bash
npm run dev
```
