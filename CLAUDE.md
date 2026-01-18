# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

이 저장소는 Claude Code 사용법을 다루는 한국어 책의 샘플 코드 모음입니다. 실행 가능한 단일 프로젝트가 아니라 책의 각 Part/Chapter별로 예제 코드, 프롬프트, 설정 파일이 분리되어 있습니다.

## Directory Structure

```
part-01/  # 기본 사용법 (단축키, 설정, 세션 관리, 확장 기능)
part-02/  # SDD(Spec-Driven Development)로 칸반보드 프로젝트 만들기
part-03/  # 리팩터링 전략 (SRP, DRY, KISS 등)
part-04/  # 코드 리뷰 스킬 개발
part-05/  # 리팩터링 안전장치 (checkpoint, git worktree, Plan 에이전트)
part-06/  # 리팩터링 워크플로 설계
```

각 챕터 내부:
- `prompts.md` - 해당 챕터에서 사용할 프롬프트 예시
- `code.md` - 코드 스니펫 및 설정 예시
- `samples/` - 실행 가능한 샘플 프로젝트 (일부 챕터에만 존재)

## Sample Projects

실행 가능한 샘플 프로젝트들은 `samples/` 디렉토리에 있습니다:
- `part-05/chapter-03/samples/kanban-board/` - 칸반보드 프로젝트 (React + Supabase)
- `part-06/chapter-03/samples/kanban-board-refactoring-workflow/` - 리팩터링 워크플로가 적용된 칸반보드

### kanban-board (part-05)

```bash
cd part-05/chapter-03/samples/kanban-board
npm install
npm run dev
```

### kanban-board-refactoring-workflow (part-06)

Next.js 15 + Supabase 기반 칸반보드.

```bash
# 1. 실습용 폴더 다운로드
npx degit devstefancho/claude-code-book-sample/part-06/chapter-03/samples/kanban-board-refactoring-workflow ~/kanban-board-refactoring-workflow

# 2. git 초기화 및 패키지 설치
cd ~/kanban-board-refactoring-workflow
git init && git add . && git commit -m "Initial commit"
npm install

# 3. Supabase 설정 (supabase-setup 스킬 사용)
# Claude Code에서 "Supabase 설정" 또는 "DB 셋업" 요청
# - Supabase MCP 연결 필요
# - 테이블 생성, RLS 정책, 환경변수, 타입 자동 설정

# 4. 개발 서버 실행
npm run dev
```

테스트/린트:
```bash
npm run test           # 테스트 실행
npm run test:watch     # 테스트 감시 모드
npm run lint           # ESLint 검사
```

## Key Concepts

- **SDD (Spec-Driven Development)**: spec.md → plan.md → tasks.md → implement 순서로 문서 기반 개발
- **리팩터링 스킬**: `.claude/skills/` 디렉토리에 SKILL.md와 examples 파일로 구성
- **커스텀 커맨드**: `.claude/commands/` 디렉토리의 markdown 파일로 슬래시 커맨드 정의
