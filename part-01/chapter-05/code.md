# Chapter 05. 코드 모음

## 커스텀 슬래시 커맨드 디렉토리 생성

```shell
mkdir -p .claude/commands
```

## 기본 슬래시 커맨드 생성

```shell
echo "현재 수정된 코드를 분석하고, 세 가지 구체적인 최적화 방안을 제안해 주세요" > .claude/commands/optimize.md
```

## 슬래시 커맨드 프론트매터 예시

```yaml
---
description: 코드 최적화 분석
model: opus
---
현재 수정된 코드를 분석하고, 세 가지 구체적인 최적화 방안을 제안해 주세요
```

## 인자를 받는 슬래시 커맨드

```yaml
---
description: "예시: /optimize \"애니메이션 랜더링\" 3"
argument-hint: <분석할 내용> <방안개수>
---
```

## 스킬 패키지 압축 해제

```shell
unzip pixel-art-ui.skill -d .claude/skills/
```

## chrome-devtools MCP 설정

```shell
cat <<EOF > .mcp.json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}
EOF
```

## MCP 도구 권한 허용 패턴

```
mcp__<MCP 서버명>__*
```

예: `mcp__chrome-devtools__*`
