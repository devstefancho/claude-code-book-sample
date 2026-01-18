# Chapter 01. 이 책에서 배우게 되는 것

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md)

## 개요

이 책은 클로드 코드를 사용한 효율적인 리팩터링 방법을 다룹니다.

### 책의 구성
- **Part 01**: 클로드 코드의 기본 사용방법
- **Part 02**: SDD(Spec Driven Development)로 칸반보드 만들기
- **Part 03**: 리팩터링 원칙 소개
- **Part 04**: 코드 리뷰 스킬 만들기
- **Part 05**: 안전하게 리팩터링하는 방법

## 가장 핵심 파트는 코드 리뷰

코드 리뷰를 하면 코드 개선점이 나오고, 거기에서 리팩터링 방향이 자동으로 도출됩니다. 코드의 문제점만 파악하면 적절한 리팩터링은 클로드 코드가 알아서 할 수 있습니다.

## 클로드 코드 버전 범위

책의 내용은 클로드 코드 2 초기버전 기준으로 작성되었습니다.

## 클로드 코드 설치하기

### 시스템 요구사항
- 운영체제: macOS 10.15 이상, Ubuntu 20.04+/Debian 10 이상, Windows 10 이상
- 메모리: 4GB RAM 이상
- 네트워크: 인터넷 연결 필수
- 셸: Bash, Zsh, Fish 권장

### 설치 방법

#### macOS / Linux / WSL

```shell
curl -fsSL https://claude.ai/install.sh | bash
```

#### macOS Homebrew 방식

```shell
brew install --cask claude-code
```

#### Windows PowerShell

```shell
irm https://claude.ai/install.ps1 | iex
```

#### Windows CMD

```shell
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

#### npm을 통한 설치

Node.js 18 이상이 필요합니다.

```shell
npm install -g @anthropic-ai/claude-code
```

## 로그인과 로그아웃

### 로그인 절차

1. 터미널에서 `claude`를 입력합니다.
2. 테마를 선택합니다.
3. 로그인 방식을 선택합니다 (클로드 구독플랜 사용자는 1번 선택).
4. 웹페이지에서 [Authorize]를 눌러 인증합니다.
5. 터미널로 돌아와 [Enter]를 눌러 완료합니다.

### 다른 계정으로 로그인하기

`/login` 커맨드를 사용하면 다른 계정으로 로그인할 수 있습니다.

### 로그아웃 절차

`/logout` 커맨드로 로그아웃할 수 있습니다.
