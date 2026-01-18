---
description: Run tests and auto-fix failures with subagent
argument-hint: (optional) specific test file or pattern
model: inherit
---

## Arguments

$1: (optional) specific test file or pattern (e.g., `Card.test.tsx`, `hooks/`)

## Instructions

1. **테스트 실행**: `npm run test` (또는 `npm run test -- $1`)

2. **결과 분석**: 테스트 결과를 분석합니다.
   - 모든 테스트 통과 시 → 성공 메시지 출력 후 종료
   - 실패한 테스트가 있는 경우 → 3단계로 진행

3. **실패 테스트 수정**: 반드시 subagent를 실행하여 테스트를 수정합니다.

   subagent 프롬프트:

   ```
   다음 테스트 실패를 분석하고 수정해주세요:

   [실패한 테스트 출력 내용]

   수정 방침:
   1. 테스트 코드가 잘못된 경우 → 테스트 코드 수정
   2. 구현 코드가 잘못된 경우 → 구현 코드 수정
   3. 수정 후 해당 테스트만 다시 실행하여 통과 확인

   참고사항:
   - .claude/rules/05-coding-conventions.md의 규칙 준수
   - 최소한의 변경으로 문제 해결
   ```

4. **재실행**: 수정 후 전체 테스트 재실행 (최대 3회 반복)

## Report Format

```
## Test Results

### Summary
- Total: [총 테스트 수]
- Passed: [통과 수] ✅
- Failed: [실패 수] ❌ (수정됨/미수정)

### Fixed Issues (if any)
1. [파일명]: [수정 내용 요약]
2. ...

### Remaining Issues (if any)
1. [파일명]: [실패 원인]
   - 수동 확인 필요

### Next Steps
- [다음 권장 조치]
```

## Notes

- 최대 자동 수정: 3회
- 수정 불가 시 수동 확인 요청
