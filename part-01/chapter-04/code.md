# Chapter 04. 코드 모음

## User 레벨 .claude 디렉토리 구조

```
~/.claude/
├── CLAUDE.md              # 전역 메모리 파일
├── rules/                 # 여러 개의 md 파일로 분리하여 관리
├── commands/              # 전역 커스텀 슬래시 커맨드
├── debug/                 # 디버그 로그
├── file-history/          # 파일 변경 히스토리 (/rewind)
├── output-styles/         # 전역 Output Style
├── plans/                 # plan mode의 계획 파일
├── plugins/               # 플러그인 설치 장소
├── projects/              # 프로젝트의 대화기록
├── session-env/           # 세션내 환경변수
├── todos/                 # Todo 관리
├── skills/                # 전역 스킬
├── settings.json          # 전역 설정
└── history.jsonl          # 유저 프롬프트 히스토리
```

## 프로젝트 대화기록 경로 예시

```shell
~/.claude/projects/-Users-stefancho-works/32f5bc3c-d89c-4767-9b5b-320d55bbaf60.jsonl
```

## 프로젝트 디렉토리 이동

```shell
cd weather-app
```

## 메모리 규칙 파일 디렉토리

```shell
.claude/rules
```

## 메모리 로드 순서 예시

outer/ 에서 실행:

```shell
cd outer/
claude
```

outer/inner/ 에서 실행 (상위 CLAUDE.md도 함께 로드):

```shell
cd outer/inner/
claude
```
