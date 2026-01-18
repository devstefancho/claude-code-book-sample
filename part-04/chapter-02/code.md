# Chapter 02. 코드 모음

## 전략적 코드 리뷰 스킬 디렉터리 구조

```
.claude/skills/strategic-code-reviewer/
├── SKILL.md
└── examples/
    ├── dry.md
    ├── kiss.md
    └── srp.md
```

## 프론트매터

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/strategic-code-reviewer/SKILL.md

```markdown
---
name: strategic-code-reviewer
description: DRY, KISS, SRP 원칙에 대해서 코드 리뷰를 수행합니다. 코드 품질 검토, 리팩터링 기회 식별, 중복 코드 감지, 복잡한 로직 단순화에 특화되어 있습니다.
allowed-tools: Read, Grep, Glob
---
```

## DRY 원칙 예시

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/strategic-code-reviewer/examples/dry.md

### Bad 케이스

```typescript
async function getUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
  return await response.json();
}

async function getPost(id: string) {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
  return await response.json();
}
```

### Good 케이스

```typescript
async function apiCall<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
  return await response.json();
}

async function getUser(id: string) {
  return apiCall(`/api/users/${id}`);
}

async function getPost(id: string) {
  return apiCall(`/api/posts/${id}`);
}
```

## KISS 원칙 예시

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/strategic-code-reviewer/examples/kiss.md

### Bad 케이스 (4단계 중첩)

```typescript
function calculateScore(baseScore: number, level: number, hasCombo: boolean, itemCount: number): number {
  if (baseScore > 0) {
    if (level > 1) {
      if (hasCombo) {
        if (itemCount > 0) {
          return baseScore + (level * 10) + 50 + (itemCount * 5);
        } else {
          return baseScore + (level * 10) + 50;
        }
      } else {
        return baseScore + (level * 10);
      }
    }
  }
  return 0;
}
```

### Good 케이스 (Early Return)

```typescript
function calculateScore(baseScore: number, level: number, hasCombo: boolean, itemCount: number): number {
  if (baseScore <= 0) return 0;
  let score = baseScore;
  if (level > 1) score += level * 10;
  if (hasCombo) score += 50;
  if (itemCount > 0) score += itemCount * 5;
  return score;
}
```

## SRP 원칙 예시

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/skills/strategic-code-reviewer/examples/srp.md
