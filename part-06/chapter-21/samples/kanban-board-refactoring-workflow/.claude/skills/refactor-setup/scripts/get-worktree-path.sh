#!/bin/bash
# Usage: ./get-worktree-path.sh <branch-name>
# Returns the absolute path of the worktree for the given branch

BRANCH_NAME="$1"

if [ -z "$BRANCH_NAME" ]; then
  echo "Usage: $0 <branch-name>" >&2
  exit 1
fi

WORKTREE_PATH=$(git worktree list | grep "$BRANCH_NAME" | awk '{print $1}')

if [ -z "$WORKTREE_PATH" ]; then
  echo "Error: Worktree not found for branch '$BRANCH_NAME'" >&2
  exit 1
fi

echo "$WORKTREE_PATH"
