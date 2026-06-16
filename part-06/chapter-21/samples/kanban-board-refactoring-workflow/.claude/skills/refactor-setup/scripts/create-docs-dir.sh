#!/bin/bash
# Usage: ./create-docs-dir.sh <branch-name>
# Creates docs directory in worktree and returns the refactor.md path

BRANCH_NAME="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$BRANCH_NAME" ]; then
  echo "Usage: $0 <branch-name>" >&2
  exit 1
fi

# worktree 절대 경로 확인
WORKTREE_PATH=$("$SCRIPT_DIR/get-worktree-path.sh" "$BRANCH_NAME")

if [ -z "$WORKTREE_PATH" ]; then
  exit 1
fi

# 브랜치명에서 디렉토리명 생성
BRANCH_DIR_NAME=$(echo "$BRANCH_NAME" | sed 's/\//-/g')

# docs 디렉토리 생성
DOCS_DIR="${WORKTREE_PATH}/docs/${BRANCH_DIR_NAME}"
mkdir -p "$DOCS_DIR"

# refactor.md 경로 반환
echo "${DOCS_DIR}/refactor.md"
