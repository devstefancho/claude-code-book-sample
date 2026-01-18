---
description: Execute refactoring in existing worktree based on code review
argument-hint: [branch-name] [refactoring-task]
model: inherit
---

## Arguments

- `$1`: (선택) 리팩토링 브랜치명 - 미지정 시 현재 브랜치 자동 감지
- `$2`: (선택) 특정 리팩토링 작업 설명 - 미지정 시 worktree의 refactor.md 사용

## Instructions

1. **브랜치명 확인**
   - `$1` 있으면 사용, 없으면 `git branch --show-current`로 감지
   - main/master인 경우 → 에러 출력 후 종료

2. **Worktree 경로 확인**
   - 경로: `../kanban-board-{branch-name}` (슬래시는 하이픈으로 변환)
   - 없으면 → `refactor-setup` 스킬을 먼저 실행하라고 안내

3. **리팩토링 대상 확인**
   - `$2` 있으면 → 해당 작업만 진행
   - `$2` 없으면 → `docs/{브랜치명}/refactor.md`의 Tasks 섹션 사용

4. **리팩토링 실행**: Task tool로 각 작업 수행
   - `.claude/rules/05-coding-conventions.md` 규칙 준수
   - 최소한의 변경으로 목표 달성
   - 기존 테스트 유지

5. **진행 상황 업데이트**: 작업 완료 시 refactor.md 업데이트
   - 완료 작업 체크 `[x]}`, Progress Log 기록

6. **테스트 실행**: `npm run test`
   - 실패 시 → `/test` 커맨드로 자동 수정 시도

7. **최종 보고**: Report Format으로 결과 출력

## refactor.md 형식

```markdown
# Refactoring Plan - {브랜치명}

## Source

- Source branch / Review file / Created / Worktree path

## Tasks

- [ ] 작업 목록

## Progress Log

- 작업 내역
```

## Report Format

```
## Refactoring Complete

### Worktree Info
- Source/Refactor branch, Worktree path

### Changes Summary
| File | Change Type | Description |

### Tasks Completed
- [x] 완료된 작업들

### Test Results
- Total / Passed ✅ / Failed ❌

### Next Steps
1. `git diff {원본}...HEAD` - 변경 검토
2. `git add . && git commit -m "refactor: {설명}"` - 커밋
3. 원본에서 `git merge {브랜치}` - 머지
4. `git worktree remove {path}` - 정리
```

## Notes

- 리팩토링은 기능 변경 없이 코드 구조만 개선
- 한 번에 하나의 작업, 각 작업 후 테스트 확인
- 문제 발생 시 즉시 사용자에게 보고
