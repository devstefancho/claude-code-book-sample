# Kanban Board Supabase 새로 설정하기

칸반보드 리팩터링 실습에 앞서 개인 Supabase 프로젝트 데이터베이스 설정을 위한 가이드입니다.
이 파일을 클로드 코드에게 넘겨주고 클로드 코드를 사용해해서 하나씩 순차대로 진행해보세요.

## 1. 프로젝트 압축 해제

원하는 경로에 압축을 해제합니다.

```bash
unzip kanban-board-refactoring-workflow.zip -d ~/works/kanban-board
```

## 2. 의존성 설치

압축 해제된 디렉토리로 이동하여 패키지를 설치합니다.

```bash
cd ~/works/kanban-board
npm install
```

## 3. Supabase 프로젝트 생성 및 MCP 설정

### 3.1 Supabase 프로젝트 생성

1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속
2. "New Project" 버튼 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전 설정 후 생성

### 3.2 .mcp.json 설정

Supabase 프로젝트에서 Connect 버튼을 클릭하여 Claude Code 의 .mcp.json 값을 가져옵니다.
프로젝트 루트에 `.mcp.json` 파일을 수정합니다.

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=<YOUR_PROJECT_REF>"
    }
  }
}
```

## 4. Claude Code로 프로젝트 세팅

Claude Code에서 다음 프롬프트를 입력합니다:

```
supabase mcp와 supabase-setup 스킬써서 새로운 프로젝트 세팅해줘
```
