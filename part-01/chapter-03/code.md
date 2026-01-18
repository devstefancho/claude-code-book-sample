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
