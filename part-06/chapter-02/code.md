# Chapter 02. 코드 모음

## 소스 코드 준비와 패키지 설치

```shell
# 파일 위치: https://github.com/devstefancho/claude-code-book-sample/blob/main/part-06/chapter-03/samples/kanban-board-refactoring-workflow.zip

mkdir ~/kanban-board-refactoring-workflow

unzip kanban-board-refactoring-workflow.zip -d ~/kanban-board-refactoring-workflow
```

```shell
cd ~/kanban-board-refactoring-workflow

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
