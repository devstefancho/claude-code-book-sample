# KISS (Keep It Simple, Stupid) 원칙

## Bad: 깊은 중첩으로 인한 가독성 저하
- 문제: 4단계 중첩 if문, 인지 부하 증가
- 영향: 코드 흐름 파악 어려움, 버그 발생 위험

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

## Good: Early Return으로 가독성 개선
- 개선: Guard Clause로 유효하지 않은 케이스 먼저 반환
- 효과: 플랫한 구조, 각 조건의 영향이 명확함

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
