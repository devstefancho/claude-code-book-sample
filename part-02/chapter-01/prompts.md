# Chapter 01. 프롬프트 모음

## 모델 전환

```
/model
```

## Git 프로젝트 생성하기

```
[나]: kanban-app 디렉터리를 생성하고 git 초기화해줘.
기본 브랜치는 main으로 설정하고, README.md와 .gitignore도 생성한 후 첫 커밋까지 생성해줘

[AI]: Bash(git add . && git commit -m "Initial commit: Setup project structure…)
[main (root-commit) 03eef68] Initial commit: Setup project structure
  2 files changed, 37 insertions(+)
  create mode 100644 .gitignore
  create mode 100644 README.md

[나]: /exit
```

## 스펙 커맨드 만들기

프롬프트 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/prompts/sdd/spec.txt

```
[나]: <metadata>
- purpose: 커스텀 커맨드 만들기
- command name: sdd:spec
- custom command language: English
- frontmatter: argument-hint, description, model
- IMPORTANT: spec command의 문서 구조는 반드시 template을 따를 것
</metadata>

<template>
## Arguments
$1 (한글/영문 지원)

## Instructions
1. **분석**: 제공된 요구 사항을 세밀하게 분석
2. **`docs/{current_branch}/spec.md` 생성**:
   - Original Requirements (사용자 입력 그대로)
   - Overview (간단한 요약)
   - Goals (명확한 목표)
   - User Stories (사용자 관점 시나리오)
   - Functional Requirements (해야 할 일)
   - Non-Functional Requirements (성능, 보안, 접근성)
   - Constraints & Assumptions (제약사항과 가정)
   - Success Criteria (성공 기준)

## Report
1. 핵심 내용을 요약해서 보여줌
2. 다음 단계로 `/sdd:plan [tech-stack]` 실행하도록 안내

## Quality
- 명확하고 모호하지 않으며 완전함
- 테스트 가능하고 측정 가능함
- 사용자 요구 사항과 일치함
</template>
```

## 스펙 커맨드로 spec.md 생성하기

```
[나]: /sdd:spec "kanban-app 칸반 보드 웹 서비스를 만들려고 한다. 상태는 할 일, 진행 중, 완료 이렇게 3가지가 있으며, Drag & Drop 방식으로 카드를 옮기고 옮긴 위치에 따라 상태가 변경되어야 한다."
```

### spec.md 내용 요약 요청

```
[나]: @docs/frontend-setup/spec.md 내용에 대해서 한국어로 간략히 요약해줘.
```

## 플랜 커맨드 만들기

프롬프트 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/prompts/sdd/plan.txt

```
[나]: <metadata>
- purpose: 커스텀 커맨드 만들기
- command name: sdd:plan
- custom command language: English
- frontmatter: argument-hint, description, model
- IMPORTANT: plan command의 문서 구조는 반드시 template을 따를 것
</metadata>

<template>
## Arguments
$1 (선택사항, 한글/영문 지원)

## Instructions
1. **`docs/{current_branch}/spec.md` 읽기**: 기능 요구 사항 파악
2. **기술스택 결정**:
   - 사용자 제공시 해당 스택 사용
   - 미제공시 프로젝트 구조 분석 후 적절한 기술 선택
3. **`docs/{current_branch}/plan.md` 생성**:
   - Original Tech Stack Request (사용자 입력 기록)
   - Technology Stack (사용할 기술, 프레임워크, 라이브러리)
   - Architecture Overview (고수준 시스템 설계)
   - Data Models (DB 스키마, 데이터 구조)
   - API Design (엔드포인트, 요청/응답, 해당시)
   - Component Structure (컴포넌트 계층, 해당시)
   - State Management (데이터 흐름)
   - Security Considerations (인증, 인가, 데이터 보호)
   - Testing Strategy (단위/통합/E2E 테스트)
   - Deployment Plan (빌드, 환경 구성)
   - Dependencies (패키지와 버전)

## Report
1. 기술 선택 근거와 주요 아키텍처 결정사항 요약
2. 다음 단계로 `/sdd:tasks` 실행하도록 안내

## Quality
- 기술적으로 실현 가능하고 명세서와 일치
- 구현에 충분히 상세하고 모범 사례 준수
</template>
```

## 플랜 커맨드로 plan.md 생성하기

```
[나]: /sdd:plan "frontend는 Nextjs, dnd-kit, Tailwindcss를 사용하고 안정적인 버전을 선택하도록 한다. 상태 관리는 localStorage를 활용한다. backend와 배포는 이번 작업에서는 구현하지 않는다."
```

### plan.md 기술 설명 요청

```
[나]: @docs/frontend-setup/plan.md 에 있는 기술들에 대해서 이해하기 쉽게 간략히 설명해줘
```

## 태스크 커맨드 만들기

프롬프트 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/prompts/sdd/tasks.txt

```
[나]: <metadata>
- purpose: 커스텀 커맨드 만들기
- command name: sdd:tasks
- custom command language: English
- frontmatter: argument-hint, description, model
- IMPORTANT: tasks command의 문서 구조는 반드시 template을 따를 것
</metadata>

<template>
## Arguments
$1 (선택사항, 한글/영문 지원)

## Instructions
1. **문서 읽기**: `docs/{current_branch}/spec.md`, `docs/{current_branch}/plan.md` 읽어서 이해
2. **`docs/{current_branch}/tasks.md` 생성**:
   - Task Groups로 그룹화
   - 각 작업은 **T-001**, **T-002** 형식
   - 각 작업에 Purpose, Required(Yes/No) 포함
   - 작업은 원자적이고 테스트 가능하게
   - 의존성 고려하여 순서 정렬

## Report
1. 총 작업 수, 그룹 수, 각 작업 요약(ID, 설명, 목적, 필수여부), 각 그룹의 복잡도(Low/Medium/High)
2. 다음 단계로 `/sdd:implement [--all]` 실행하도록 안내

## Quality
- 명세와 계획의 모든 측면 포괄
- 현실적 범위로 명확하게 작성
</template>
```

## 태스크 커맨드로 tasks.md 생성하기

```
[나]: /sdd:tasks
```

### 태스크 추가 요구사항 예시

```
[나]: /sdd:tasks "이번에는 테스트 코드를 작성하지 말아줘"
```

### tasks.md 수정 요청

```
[나]: @docs/frontend-setup/tasks.md 에서 이번에는 테스트 코드는 작성하지 않도록 수정해줘
```

## 임플먼트 커맨드 만들기

프롬프트 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/prompts/sdd/implement.txt

```
[나]: <metadata>
- purpose: 커스텀 커맨드 만들기
- command name: sdd:implement
- custom command language: English
- frontmatter: argument-hint, description, model
- IMPORTANT: implement command의 문서 구조는 반드시 template을 따를 것
</metadata>

<template>
## Arguments
`--all` (선택사항, 일괄 구현 플래그)

## Instructions
1. **`docs/{current_branch}/tasks.md` 읽기**: 작업 목록과 순서 파악
2. **`docs/{current_branch}/spec.md`, `docs/{current_branch}/plan.md` 참조**: 요구사항과 기술 결정사항 확인
3. **구현 전략**:
   - `--all` 있으면: 모든 작업 일괄 구현
   - `--all` 없으면: 그룹별로 구현 후 사용자 승인 대기
4. **각 작업마다**:
   - 진행중으로 표시
   - 기능 구현 (깨끗한 코드, 기존 패턴 준수)
   - 작동 테스트
   - 완료로 표시

## Report
   - 구현된 내용
   - 생성/수정된 파일
   - 테스트 방법 (수동 테스트 단계, 테스트 명령어, 예상 결과, 엣지 케이스)
   - 다음 단계 (--all 미사용시)
</template>
```

## 임플먼트 커맨드로 코드 구현하기

```
[나]: /sdd:implement --all
```

### 서버 실행 요청

```
[나]: 서버 실행해줘
```
