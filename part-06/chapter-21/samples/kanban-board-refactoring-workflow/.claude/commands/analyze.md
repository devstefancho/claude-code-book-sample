---
description: Analyze codebase for refactoring opportunities
argument-hint: [target-path]
model: inherit
---

## Arguments

$1: (선택) 분석 대상 파일/디렉토리 - 미지정 시 `src/` 전체 분석

## Instructions

1. **대상 확인**: `$1`이 있으면 해당 경로, 없으면 `src/` 전체 분석

2. **병렬 분석**: Task tool로 `code-analyzer` 에이전트 3개 병렬 실행

   | 에이전트 | 분석 대상 | 프롬프트                                                       |
   | -------- | --------- | -------------------------------------------------------------- |
   | 1        | 구조      | `{대상경로} 파일/함수 크기, 단일책임원칙, 중복코드 분석`       |
   | 2        | 타입      | `{대상경로} any 타입, 중복 타입, 타입 안전성 분석`             |
   | 3        | 코드 스멜 | `{대상경로} console.log, TODO, eslint-disable, 깊은 중첩 탐지` |

3. **결과 통합**: 심각도별(High/Medium/Low) 분류

4. **브랜치명 제안**: 문제 그룹별 리팩토링 브랜치명 제안

5. **사용자에게 보고**: 결과 요약 (파일 생성 없음)

## Report Format

```
## Refactoring Analysis

### Recommended Branches

1. **refactor/split-components** (High)
   - KanbanBoard.tsx: 250줄 → 분리 필요
   - Card.tsx: 180줄 → 분리 권장

2. **refactor/fix-types** (Medium)
   - store.ts:45 - any 타입 사용
   - types/index.ts:12 - 중복 타입 정의

3. **refactor/cleanup-code** (Low)
   - hooks/useCardForm.ts - TODO 주석 발견
   - components/Column.tsx - console.log 잔존
```
