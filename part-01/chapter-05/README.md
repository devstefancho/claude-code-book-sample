# Chapter 05. 확장 기능

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md) | 샘플: [samples/](./samples/)

## 커스텀 슬래시 커맨드 제작

### 기본 만들기

```shell
mkdir -p .claude/commands
```

```shell
echo "현재 수정된 코드를 분석하고, 세 가지 구체적인 최적화 방안을 제안해 주세요" > .claude/commands/optimize.md
```

파일 이름이 곧 새로운 명령어가 됩니다: `/optimize`

### 슬래시 커맨드의 프론트매터

프론트매터(Frontmatter)는 마크다운 파일의 맨 위에서 `---`로 감싸서 메타데이터를 담는 영역입니다.

```yaml
---
description: 코드 최적화 분석
model: opus
---
현재 수정된 코드를 분석하고, 세 가지 구체적인 최적화 방안을 제안해 주세요
```

#### 프롬프트 예시

```
[나]: 클로드 코드 문서를 확인해서 커스텀 슬래시 커맨드의 프론트매터 종류를 알려줘
```

### 인자를 받는 슬래시 커맨드

`$ARGUMENTS` 플레이스홀더로 인자를 받을 수 있습니다.

`$1`, `$2`와 같은 형식으로 특정 위치의 인자를 개별적으로 사용할 수 있습니다.

```yaml
---
description: "예시: /optimize \"애니메이션 랜더링\" 3"
argument-hint: <분석할 내용> <방안개수>
---
```

## 서브 에이전트 설계와 활용

### 서브 에이전트의 목적

- 컨텍스트 분리
- 병렬 작업
- 컨텍스트 윈도우 효율적 관리

### 서브 에이전트 만들기

`/agents` 커맨드로 서브 에이전트를 조회, 생성, 수정, 삭제할 수 있습니다.

#### 생성 단계

1. `/agents` 입력
2. [Create new agent] 선택
3. 설치 경로 선택 (Project / Personal)
4. 생성 방법 선택 (Generate with Claude / Manual configuration)
5. 에이전트 목적 작성
6. 도구 선택
7. 모델 선택
8. 색상 선택
9. 최종 검토 및 저장

#### 프롬프트 예시

```
[나]: weather-app에서 security 에이전트로 검사해줘
```

## 플러그인 시스템과 설치 방법

플러그인은 슬래시 커맨드, 스킬, 에이전트, 훅, MCP 서버 등을 하나로 묶어 배포하는 패키징 시스템입니다.

### frontend-design 플러그인 설치하고 사용해보기

1. `/plugin` 커맨드 실행
2. Discover 화면에서 검색
3. `frontend-design` 검색
4. `[Space]`로 선택, `[i]`로 설치
5. 클로드 코드 재시작

#### 프롬프트 예시

```
[나]: weather-app 디렉토리에 html로 된 간단한 날씨앱 만들어줘, 디자인 스킬도 사용해줘
```

## 스킬 만들기

스킬(Skill)은 클로드 코드가 특정 작업을 수행하는 방식을 미리 가르쳐 놓은 재사용 가능한 지침서입니다.

### skill-creator로 스킬 만드는 방법

1. 마켓플레이스 설치

```
/plugin marketplace add anthropics/skills
```

2. example-skills 플러그인 설치

3. 스킬 생성

```
[나]: 스킬 생성에 사용할 수 있는 스킬이 있나요?

[나]: 레트로 감성을 현대적으로 재해석한 픽셀 아트 인터페이스 프론트엔드 디자인 스킬을 만들어줘
```

4. 스킬 패키지 압축 해제

```shell
unzip pixel-art-ui.skill -d .claude/skills/
```

5. 스킬 사용

```
[나]: login 디렉토리에 레트로 스타일 로그인 페이지 만들어줘
```

## 커스텀 훅

훅(Hook)은 클로드 코드의 라이프 사이클에서 특정 지점에 실행되는 쉘 커맨드입니다.

### 훅 이벤트 타입

- **PreToolUse**: 도구 사용 직전
- **PostToolUse**: 도구 사용 직후

### 훅 등록하기

`/hooks` 커맨드로 훅을 등록합니다.

#### 파일 생성 후 로그 남기기 예시

1. `/hooks` 실행
2. `PostToolUse` 선택
3. 도구 선택 (`Write`)
4. 명령어 등록 (예: `echo "$(date) create a new file" >> hooks.log`)
5. 저장 경로 선택

#### 프롬프트 예시

```
[나]: hello.txt를 만들고 Hello World를 작성해줘
```

## MCP 사용하기

MCP(Model Context Protocol)는 클로드 코드가 데이터베이스나 외부 앱을 직접 들여다볼 수 있게 해주는 데이터 통로입니다.

### chrome-devtools MCP 사용하기

1. `.mcp.json` 파일 생성

```shell
cat <<EOF > .mcp.json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}
EOF
```

2. 클로드 코드 실행 및 `/mcp` 커맨드로 확인

3. MCP 사용

```
[나]: MCP로 구글 페이지를 열어줘
```

### MCP 도구 권한 허용하기

`/permissions` 커맨드로 MCP 도구를 항상 허용할 수 있습니다.

패턴: `mcp__<MCP 서버명>__*`

예: `mcp__chrome-devtools__*`
