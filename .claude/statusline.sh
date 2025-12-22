#!/bin/bash

# Read JSON input from stdin
input=$(cat)

# Debug: Check if input is empty
if [ -z "$input" ]; then
  printf "No JSON input received"
  exit 1
fi

# Extract required fields with fallbacks
model=$(echo "$input" | jq -r '.model.display_name // "unknown"' 2>/dev/null)
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // "unknown"' 2>/dev/null)
# Convert absolute path to ~ relative path
cwd="${cwd/#$HOME/~}"
output_style=$(echo "$input" | jq -r '.output_style.name // "default"' 2>/dev/null)

# Output the status line with pipe separators
printf "%s | %s | %s" "$model" "$cwd" "$output_style"

