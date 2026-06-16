# Report Template

리뷰 결과를 문서화합니다.

## File Location

**스크립트로 docs 디렉토리를 생성하고 파일 경로를 확인**하세요:

```bash
REFACTOR_FILE=$(scripts/create-docs-dir.sh "$BRANCH_NAME")
echo "Write refactor document to: $REFACTOR_FILE"
```

## Document Template

```markdown
# Refactoring Plan - {브랜치명}

## Source

- Branch: {브랜치명}
- Based on: /analyze 결과
- Created: {날짜}

## Analysis Input

[입력받은 분석 결과]

## Detailed Review

### [파일명]

- **현재 상태**: [코드 분석]
- **문제점**: [구체적 문제]
- **권장 수정**: [리팩토링 방안]

## Refactoring Plan

1. [ ] [작업 1]
2. [ ] [작업 2]
3. [ ] [작업 3]

## Notes

- [주의사항]
- [Breaking changes]
- [테스트 필요 사항]
```

## User Report Format

작업 완료 후 사용자에게 보고:

```
## Refactor Setup Complete

### Worktree Info
- Branch: {브랜치명}
- Path: ../kanban-board-{branch-name}

### Review Summary
[분석 결과 기반 상세 리뷰 내용 요약]

### Refactoring Steps
1. [구체적인 리팩토링 단계 1]
2. [구체적인 리팩토링 단계 2]
...

### Next Steps
1. 리뷰 내용 확인: ../kanban-board-{branch-name}/docs/{branch-name}/refactor.md
2. 리팩토링 실행: /refactor
```
