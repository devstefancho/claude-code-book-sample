#!/bin/bash
input=$(cat)

# Helper functions
get_model() { echo "$input" | jq -r '.model.display_name'; }
get_dir() { echo "$input" | jq -r '.workspace.current_dir'; }
get_used_pct() { echo "$input" | jq -r '.context_window.used_percentage // 0'; }
get_remain_pct() { echo "$input" | jq -r '.context_window.remaining_percentage // 0'; }

# Extract values
model=$(get_model)
dir=$(get_dir)
used_tok=$(get_used_pct)
remain_tok=$(get_remain_pct)

# 디렉토리 축약
dir_display="${dir/#$HOME/~}"

# CTX 퍼센트 계산
used_pct=$((used_tok * 100 / (used_tok + remain_tok)))

# 프로그레스 바 생성
filled=$((used_pct / 10))
empty=$((10 - filled))
bar="["
for ((i=0; i<filled; i++)); do bar+="█"; done
for ((i=0; i<empty; i++)); do bar+="░"; done
bar+="] ${used_pct}%"

echo "DIR: $dir_display | MODEL: $model | CTX: $bar"

