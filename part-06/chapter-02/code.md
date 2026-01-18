# Chapter 02. 코드 모음

## 소스 코드 준비와 패키지 설치

```shell
# 1. 실습용 폴더 다운로드
npx degit devstefancho/claude-code-book-sample/part-06/chapter-03/samples/kanban-board-refactoring-workflow ~/kanban-board-refactoring-workflow

# 2. git 초기화
cd ~/kanban-board-refactoring-workflow
git init
git add .
git commit -m "Initial commit"

# 3. 패키지 설치
npm install
```

## 워크플로 파일 구조

```
.claude/
├── agents/                            # 서브 에이전트
├── commands/                          # 커스텀 슬래시 커맨드
├── rules/                             # 규칙 파일들
└── skills/                            # 스킬
    ├── refactor-setup/                # 리팩터링 환경 설정 스킬
    └── supabase-setup/                # Supabase 설정 스킬
```
