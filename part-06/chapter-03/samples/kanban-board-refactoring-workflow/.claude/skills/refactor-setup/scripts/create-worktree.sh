#!/bin/bash
# Usage: ./create-worktree.sh <branch-name>
# Creates a worktree, copies env files, and installs dependencies

BRANCH_NAME="$1"

if [ -z "$BRANCH_NAME" ]; then
  echo "Usage: $0 <branch-name>" >&2
  exit 1
fi

# 브랜치명에서 worktree 디렉토리명 생성 (슬래시를 하이픈으로 변환)
WORKTREE_NAME=$(echo "$BRANCH_NAME" | sed 's/\//-/g')
WORKTREE_DIR="../kanban-board-${WORKTREE_NAME}"

# 1. 브랜치 생성
echo "Creating branch: $BRANCH_NAME"
git branch "$BRANCH_NAME"

# 2. worktree 생성
echo "Creating worktree: $WORKTREE_DIR"
git worktree add "$WORKTREE_DIR" "$BRANCH_NAME"

# 3. .env 파일 복사
echo "Copying env files..."
for env_file in .env .env.local .env.development .env.development.local; do
  if [ -f "$env_file" ]; then
    cp "$env_file" "$WORKTREE_DIR/"
    echo "  Copied: $env_file"
  fi
done

# 4. 의존성 설치
echo "Installing dependencies..."
cd "$WORKTREE_DIR" && npm install

echo "Worktree setup complete: $WORKTREE_DIR"
