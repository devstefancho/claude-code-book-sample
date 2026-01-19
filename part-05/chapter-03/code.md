# Chapter 03. 코드 모음

## general-purpose 서브 에이전트 사용하기

```shell
# 실습용 폴더 다운로드
npx degit devstefancho/claude-code-book-sample/part-05/chapter-02/samples/claude-refactor-demo ~/claude-refactor-demo-1

# git 초기화
cd ~/claude-refactor-demo-1
git init && git add . && git commit -m "Initial commit"
```

## Plan 서브 에이전트 사용하기

```shell
# 실습용 폴더 다운로드
npx degit devstefancho/claude-code-book-sample/part-05/chapter-02/samples/claude-refactor-demo ~/claude-refactor-demo-2

# git 초기화
cd ~/claude-refactor-demo-2
git init && git add . && git commit -m "Initial commit"
```

## Explore 서브 에이전트 사용하기

```shell
# 실습용 폴더 다운로드
npx degit devstefancho/claude-code-book-sample/part-05/chapter-02/samples/claude-refactor-demo ~/claude-refactor-demo-3

# git 초기화
cd ~/claude-refactor-demo-3
git init && git add . && git commit -m "Initial commit"
```

## Plan 에이전트를 메인 에이전트로 사용하기

```shell
claude --agent Plan
```

```shell
# 실습용 폴더 다운로드
npx degit devstefancho/claude-code-book-sample/part-05/chapter-02/samples/claude-refactor-demo ~/claude-refactor-demo-4

# git 초기화
cd ~/claude-refactor-demo-4
git init && git add . && git commit -m "Initial commit"

# Plan 에이전트 실행
claude --agent Plan
```

## 세션 이어서 실행하기

```shell
claude -c
```
