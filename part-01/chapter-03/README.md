# Chapter 03. 설정과 세션 관리

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md)

## 작업 권한 모드 변경

`[Shift] + [Tab]`으로 권한모드를 변경할 수 있습니다.

### default 모드

가장 기본이 되는 모드입니다. 작업 수행 전 매번 사용자에게 허용 여부를 묻습니다.

### plan 모드

읽기만 가능한 모드입니다. 파일 수정을 할 수 없고, 계획을 먼저 작성합니다.

### acceptEdits 모드

파일 수정 권한을 자동으로 수락합니다. 다른 도구의 권한은 여전히 요청됩니다.

### dontAsk 모드

사전에 /permissions으로 허용한 도구만 사용 가능하고, 나머지는 자동으로 거부합니다.

```shell
claude --permission-mode dontAsk
```

### bypassPermissions 모드

모든 권한이 허용됩니다. DevContainer 환경에서 사용을 권장합니다.

```shell
claude --permission-mode bypassPermissions
```

또는

```shell
claude --dangerously-skip-permissions
```

### 기본모드 설정하기

```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

## 세부 권한 설정하기

### /permissions 커맨드로 권한 설정하기

1. `/permission` 입력
2. 권한관리 화면에서 `[Tab]`으로 순회
3. "Add a new rule"에서 `[Enter]`
4. 예: `Bash(ls:*)`를 입력하면 `ls` 명령어가 항상 허용됨

### 권한의 우선순위

**Deny > Ask > Allow** 순서로 적용됩니다.

```json
{
  "permissions": {
    "allow": [
      "Bash(ls:*)"
    ],
    "ask": [
      "Bash(ls:*)"
    ],
    "deny": [
      "Bash(rm -r *)",
      "Bash(rm -rf *)"
    ]
  }
}
```

## 도구의 종류

### 선택창을 띄우는 도구

**AskUserQuestion**: 선택창을 보여주는 도구. 인터뷰 방식의 프롬프팅이 가능합니다.

### 검색을 위한 도구

- **Read**: 파일 내용 읽기
- **Grep**: 특정 단어 검색
- **Glob**: 파일 이름 패턴 검색

```json
{
  "permissions": {
    "deny": [
      "Read(.env)"
    ]
  }
}
```

### 파일 수정을 위한 도구

- **Write**: 파일 새로 생성
- **Edit**: 파일 수정
- **NotebookEdit**: 주피터 노트북 수정

```json
{
  "permissions": {
    "deny": ["Write(*)", "Edit(*)"]
  }
}
```

### 명령어 실행과 관련된 도구

- **Bash**: 터미널 명령어 실행
- **BashOutput**: Bash 결과 표시
- **KillShell**: 백그라운드 프로세스 종료

### 웹 검색 도구

- **WebFetch**: 특정 웹페이지 정보 가져오기
- **WebSearch**: 검색 키워드로 웹 검색

```json
{
  "permissions": {
    "allow": [
      "WebFetch(domain:news.ycombinator.com)"
    ]
  }
}
```

### Todo 관리 도구

**TodoWrite**: Todo를 수정하는 도구

- `[Ctrl] + [t]`로 Todo 토글
- `/todos` 커맨드로 Todo 확인

### 스킬 도구

```json
{
  "permissions": {
    "allow": ["Skill(hello)"]
  }
}
```

## 설정 기능

- `/config`: 세부 설정
- `/status`: 현재 상태 확인
- `/usage`: 사용량 확인

## 외부 디렉토리 추가하기

`/add-dir` 커맨드로 외부 디렉토리를 추가합니다.

1. `/add-dir` 입력
2. 경로 입력 (자동완성 지원)
3. 저장 옵션 선택

## 세션 이름 정하기

`/rename foo`로 세션 이름을 변경합니다.

- `claude -r hello`: 세션 재개
- `/resume`: 세션 내에서 다른 대화로 전환

## 종료하기

- `[Ctrl] + [c]` 두 번
- `[Ctrl] + [d]` 두 번
- `/exit` 커맨드

## 대화 히스토리 지우기

`/clear`: 현재 세션의 대화를 모두 삭제합니다.

## 대화 히스토리 요약하기

`/compact`: 대화 내용을 요약합니다.

```
/compact 현재 코드의 UI 버그에 대해서 논의하던 것에 초점을 맞춰줘
```

## 컨텍스트 윈도우 상세 분석하기

`/context`: 현재 컨텍스트 윈도우의 상태를 보여줍니다.

### 컨텍스트 구성 요소

- **System prompt**: 클로드의 기본 지침 프롬프트
- **System tools**: 기본 도구
- **MCP Tools**: MCP 서버 도구
- **Custom agents**: 커스텀 Subagent
- **Memory files**: CLAUDE.md 등 메모리 파일 (2,000 토큰 이하 권장)
- **Skills**: 클로드 스킬
- **Messages**: 대화 내용
- **Free space**: 남은 공간
- **Autocompact buffer**: 대화 압축을 위한 버퍼

## Statusline 꾸미기

`/statusline`: 클로드 코드의 상태바를 커스텀합니다.

프롬프트 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/01/prompts/statusline.md
