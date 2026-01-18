# Chapter 02. 코드 모음

## .env 파일 생성

```shell
echo "secret-key" > .env
```

## .claude/settings.json 권한 설정

```json
{
  "permissions": {
    "deny": ["Read(.env)"]
  }
}
```

## hello 파일 생성

```shell
touch hello.sh hello.txt hello.md
```

## gitignore 파일을 멘션하는 방법

```json
{
  "respectGitignore": false
}
```

## 기본 모델 설정

```json
{
  "model": "Opus"
}
```

## 에디터 설정값 확인

```shell
echo $EDITOR # nvim
```

## VSCode를 외부 에디터로 설정

```json
{
  "env": {
    "EDITOR": "code --wait"
  }
}
```

## verbose 플래그로 실행

```shell
claude --verbose
```
