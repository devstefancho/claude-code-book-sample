---
name: refactor-setup
description: 리팩토링 환경 구성. worktree 생성, 코드 리뷰, 리팩토링 계획 문서 작성. "리팩토링 셋업", "리팩토링 준비" 요청 시 사용.
---

# Refactor Setup

/analyze 결과를 기반으로 리팩토링 환경을 구성하고 상세 리뷰를 진행합니다.

## Required Input

사용자에게 다음 정보가 필요합니다:

1. **브랜치명**: 리팩토링용 브랜치 이름 (예: "refactor/split-store")
2. **분석 결과**: /analyze에서 얻은 분석 결과

정보가 누락된 경우 사용자에게 요청:

- 브랜치명 없음 → "리팩토링 브랜치명을 알려주세요. (예: refactor/split-store)"
- 분석 결과 없음 → "먼저 /analyze를 실행하여 리팩토링 대상을 파악하세요."

## Variables

사용자 입력을 받으면 다음 변수를 설정합니다. 이후 모든 문서에서 이 변수를 사용합니다:

```bash
BRANCH_NAME="사용자가_입력한_브랜치명"
```

## Workflow

### Step 1: 입력 확인

브랜치명과 분석 결과가 있는지 확인합니다. 없으면 사용자에게 요청합니다.

### Step 2: Worktree 설정

[worktree.md](worktree.md)의 지침에 따라:

- Git worktree 생성
- 환경 파일 복사
- 의존성 설치

### Step 3: 상세 리뷰

[review.md](review.md)의 지침에 따라:

- 분석 결과 기반 상세 코드 리뷰
- 구체적인 리팩토링 방안 도출

### Step 4: 문서 생성

[report.md](report.md)의 템플릿에 따라:

- `docs/{브랜치명}/refactor.md` 파일 생성
- 사용자에게 결과 보고 (report.md의 User Report Format 사용)
