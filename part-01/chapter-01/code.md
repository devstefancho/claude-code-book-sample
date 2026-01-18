# Chapter 01. 코드 모음

## 클로드 코드 설치

### macOS / Linux / WSL

```shell
curl -fsSL https://claude.ai/install.sh | bash
```

### macOS Homebrew 방식

```shell
brew install --cask claude-code
```

### Windows PowerShell

```shell
irm https://claude.ai/install.ps1 | iex
```

### Windows CMD

```shell
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### npm을 통한 설치

Node.js 18 이상이 필요합니다.

```shell
npm install -g @anthropic-ai/claude-code
```
