# Worktree Setup

리팩토링용 Git worktree 환경을 구성합니다.

## Worktree 생성

```bash
scripts/create-worktree.sh "$BRANCH_NAME"
```

스크립트가 수행하는 작업:

1. 브랜치 생성
2. worktree 생성 (`../kanban-board-{branch-name}`)
3. .env 파일 복사
4. npm install 실행

### 경로 규칙

- worktree 경로: `../kanban-board-{branch-name}`
- 슬래시(/)는 하이픈(-)으로 변환
- 예: `refactor/split-store` → `../kanban-board-refactor-split-store`

## Worktree 절대 경로 확인

worktree 생성 후 **스크립트로 절대 경로를 확인**합니다:

```bash
WORKTREE_PATH=$(scripts/get-worktree-path.sh "$BRANCH_NAME")
echo "Worktree created at: $WORKTREE_PATH"
```

**중요**: 이후 모든 파일 작업(Write 도구 등)에서 이 `$WORKTREE_PATH`를 사용하세요.

## Variables

| 변수             | 설명                         | 획득 방법                                                                   |
| ---------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `$BRANCH_NAME`   | 사용자가 입력한 브랜치명     | 사용자 입력                                                                 |
| `$WORKTREE_PATH` | **절대 경로** (Write 도구용) | `.claude/skills/refactor-setup/scripts/get-worktree-path.sh "$BRANCH_NAME"` |
