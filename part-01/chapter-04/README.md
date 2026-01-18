# Chapter 04. 아키텍처와 메모리

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md)

## User 레벨의 .claude 디렉토리 아키텍처 이해하기

`~/.claude` 디렉토리는 사용자의 설정과 작업 이력을 관리합니다.

### 전역 메모리 파일

- **CLAUDE.md**: 단일 파일로 메모리 관리
- **rules/**: 여러 개의 md 파일로 분리하여 관리

### 전역 커스텀 슬래시 커맨드

`~/.claude/commands/` 디렉토리에 마크다운 파일 형태로 저장됩니다.

### 디버그 로그 생성

`~/.claude/debug/` 디렉토리에 디버그 로그가 저장됩니다.

`claude --debug`로 디버그 모드를 실행할 수 있습니다.

### 파일 변경 히스토리 저장소

`~/.claude/file-history/` 디렉토리에 파일의 변경이력이 저장됩니다. `/rewind` 커맨드로 코드를 되돌릴 수 있는 이유입니다.

### 전역 Output Style

`~/.claude/output-styles/` 디렉토리에 전역 Output Style이 저장됩니다.

### plan mode의 계획 파일 저장소

`~/.claude/plans/` 아래에 작업 계획 파일들이 생성됩니다. `/plan` 커맨드로 계획을 확인할 수 있습니다.

### 플러그인 설치 장소

`~/.claude/plugins/` 디렉토리에 설치한 모든 플러그인이 저장됩니다.

### 프로젝트의 대화기록

`~/.claude/projects/` 디렉토리에 각 프로젝트마다 실행한 세션의 전체 데이터가 저장됩니다.

```shell
~/.claude/projects/-Users-stefancho-works/32f5bc3c-d89c-4767-9b5b-320d55bbaf60.jsonl
```

### 세션내 환경변수 관리

`~/.claude/session-env/` 디렉토리에 SessionStart Hook에서 등록한 환경변수가 저장됩니다.

### Todo 관리

`~/.claude/todos/` 디렉토리에 TodoList가 저장됩니다.

- `completed`: 완료된 작업
- `in_progress`: 진행 중인 작업
- `pending`: 아직 시작하지 않은 작업

`/todos` 커맨드로 todo를 확인할 수 있습니다.

### 전역 스킬

`~/.claude/skills/` 디렉토리에 모든 프로젝트에서 사용할 수 있는 전역 스킬이 저장됩니다.

### 전역 설정

`~/.claude/settings.json`은 모든 프로젝트에 적용되는 공통 설정 파일입니다.

### 유저 프롬프트 히스토리

`~/.claude/history.jsonl` 파일에 모든 프롬프트가 기록됩니다.

저장되는 정보:
- `display`: 입력한 프롬프트 텍스트
- `timestamp`: 실행 시간
- `project`: 디렉토리 경로
- `sessionId`: 세션 고유 ID

## 메모리 관리

### 메모리 생성하기

```shell
cd weather-app
```

`/init` 커맨드로 CLAUDE.md를 생성합니다.

#### 프롬프트 예시

```
[나]: weather-app 디렉토리 생성하고 Mock 데이터로 아이폰 스타일의 날씨앱 만들어줘

[나]: CLAUDE.md에 서버 실행하는 방법도 작성해줘

[나]: 서버 실행해줘
```

### 메모리 규칙 파일

```shell
.claude/rules
```

디렉토리 아래에 작성된 모든 마크다운 파일(.md)은 자동으로 메모리에 추가됩니다.

- `.claude/rules/overview.md`: 프로젝트 전반적인 설명
- `.claude/rules/structure.md`: 디렉토리 구조 설명

#### 메모리 로드 순서

outer/ 에서 실행:

```shell
> cd outer/
> claude
```

outer/inner/ 에서 실행 (상위 CLAUDE.md도 함께 로드):

```shell
> cd outer/inner/
> claude
```

### 메모리 직접 수정하기

`/memory` 커맨드로 메모리를 확인하고 수정할 수 있습니다.

`/context` 커맨드로 현재 메모리 크기를 확인할 수 있습니다.

### 개인용 메모리: CLAUDE.local.md

개인만 사용하는 설정을 관리할 때 사용합니다. Git의 글로벌 ignore 목록에 자동으로 추가됩니다.

### 메모리 파일 임포트: @ 문법

메모리 파일 내에서 `@` 문법으로 다른 파일을 참조할 수 있습니다. 최대 5단계까지 재귀적으로 임포트 가능합니다.

### 클로드 코드의 메모리 우선순위

1. **가까울수록 이깁니다**: 현재 디렉토리의 메모리 설정이 우선
2. **개인 설정이 우선**: CLAUDE.local.md가 CLAUDE.md보다 우선
3. **규칙이 기억보다 중요**: .claude/rules/가 CLAUDE.md보다 우선

#### 프롬프트 예시

```
[나]: 현재 프로젝트의 아래 정보 알려줘
  - 테스트 프레임워크
  - 프로젝트 언어
  - 코딩 스타일
  - 프레임워크
```
