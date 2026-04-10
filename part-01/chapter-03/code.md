# Chapter 03. 코드 모음

## dontAsk 모드로 실행

```shell
claude --permission-mode dontAsk
```

## bypassPermissions 모드로 실행

```shell
claude --permission-mode bypassPermissions
```

또는

```shell
claude --dangerously-skip-permissions
```

## 기본 모드 설정하기

```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

## 세부 권한 설정

```json
{
  "permissions": {
    "allow": [
      "Bash(ls:*)"
    ],
    "ask": [
      "Bash(ls:*)"
    ],
    "deny": [
      "Bash(rm -r *)",
      "Bash(rm -rf *)"
    ]
  }
}
```

## Read 권한 설정

```json
{
  "permissions": {
    "deny": [
      "Read(.env)"
    ]
  }
}
```

## Write/Edit 권한 설정

```json
{
  "permissions": {
    "deny": ["Write(*)", "Edit(*)"]
  }
}
```

## WebFetch 권한 설정

```json
{
  "permissions": {
    "allow": [
      "WebFetch(domain:news.ycombinator.com)"
    ]
  }
}
```

## Skill 권한 설정

```json
{
  "permissions": {
    "allow": ["Skill(hello)"]
  }
}
```

## 저장한 세션 선택하여 재개

```shell
claude -r
```

## 세션 이름으로 바로 재개

```shell
claude -r hello
```

## 세션 이름 지정하여 시작

```shell
claude --name greeting-exchange
```

## 상태바 statusLine 설정 (settings.json)

```json
{
  "statusLine": {
    "type": "command",
    "command": "/Users/사용자명/.claude/statusline.sh"
  }
}
```
