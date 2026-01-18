# Chapter 01. 코드 모음

## 실습 환경 준비

```shell
mkdir ~/claude-checkpoint-demo
cd ~/claude-checkpoint-demo
git init
```

## sum 함수 (초기 버전)

```javascript
function sum(a, b) {
  return a + b;
}

module.exports = { sum };
```

## sum 함수 (수정 버전)

```javascript
function sum(a, b, c) {
  return a + b + c;
}

module.exports = { sum };
```

## 파일 히스토리 확인

```shell
cat ~/.claude/file-history/c49a7f96-d782-4448-9e99-3f9cc0bc69b4/85c8d7dad31e120b@v2
```
