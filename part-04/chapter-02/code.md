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

파일 링크: [./samples/skills/strategic-code-reviewer/SKILL.md](./samples/skills/strategic-code-reviewer/SKILL.md)

```markdown
---
name: strategic-code-reviewer
description: DRY, KISS, SRP 원칙에 대해서 코드 리뷰를 수행합니다. 코드 품질 검토, 리팩터링 기회 식별, 중복 코드 감지, 복잡한 로직 단순화에 특화되어 있습니다.
allowed-tools: Read, Grep, Glob
---
```

## SKILL.md 본문

````markdown
# 전략적 코드 리뷰

## 세 가지 검토 원칙

### DRY (Don't Repeat Yourself) - 중복 제거
**목표**: 유지보수 비용 감소
- 동일한 코드가 여러 곳에 반복됨
- 심각도: 3회 이상 반복 = 높음, 2회 = 중간
- 개선 방향: 함수 추출 → Hook/모듈화 → 라이브러리화

### KISS (Keep It Simple, Stupid) - 단순화
**목표**: 인지 부하 감소 및 버그 방지
- 깊은 중첩(3단계+), 복잡한 조건식, 매개변수 과다(4개+)
- 심각도: 순환 복잡도 > 10 = 높음, 7-10 = 중간
- 개선 방향: 조기 반환(guard clause) → 룩업 테이블 → 함수 분리

### SRP (Single Responsibility Principle) - 단일 책임 원칙
**목표**: 변경 영향 최소화 및 유지보수성 향상
- 하나의 함수/클래스가 여러 책임 수행 (데이터 처리 + UI 업데이트 + 로깅 등)
- 심각도: 3개 이상 책임 = 높음, 2개 = 중간, 사소한 개선 = 낮음
- 개선 방향: 책임 분리 → 함수/클래스 분할 → 모듈화

### 🔍 이슈 분류

| 심각도 | 설명 |
|--------|------|
| 🔴 높음 | 즉시 수정 필요 (유지보수성 또는 신뢰성 영향) |
| 🟡 중간 | 조만간 개선 필요 (인지 부하 증가) |
| 🟢 낮음 | 선택적 개선 (스타일 및 명확성) |

## Examples
`examples/` 폴더에 각 원칙별 Good/Bad 패턴 예시가 있다.
- `examples/dry.md`: DRY 원칙 위반/준수 예시
- `examples/kiss.md`: KISS 원칙 위반/준수 예시
- `examples/srp.md`: SRP 원칙 위반/준수 예시
````

## DRY 원칙 예시

파일 링크: [./samples/skills/strategic-code-reviewer/examples/dry.md](./samples/skills/strategic-code-reviewer/examples/dry.md)

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

파일 링크: [./samples/skills/strategic-code-reviewer/examples/kiss.md](./samples/skills/strategic-code-reviewer/examples/kiss.md)

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

파일 링크: [./samples/skills/strategic-code-reviewer/examples/srp.md](./samples/skills/strategic-code-reviewer/examples/srp.md)

### Bad 케이스

```typescript
// 🤖 만능 로봇: 커피도 만들고, 청소도 하고, 코딩도 하는 함수
function handleOrder(order: Order) {
  // 1. 커피 만들기
  const coffee = brewCoffee(order.coffeeType);

  // 2. 가격 계산하기
  let price = coffee.basePrice;
  if (order.size === 'large') price *= 1.5;
  if (order.hasMilk) price += 500;

  // 3. 영수증 출력하기
  console.log('=== 영수증 ===');
  console.log(`커피: ${order.coffeeType}`);
  console.log(`가격: ${price}원`);

  // 4. 데이터베이스에 저장하기
  database.save({ orderId: order.id, price, timestamp: Date.now() });

  // 5. 이메일 보내기
  sendEmail(order.email, `주문이 완료되었습니다. 금액: ${price}원`);

  return { coffee, price };
}
```

### Bad 케이스 (예외처리가 붙는 경우)

```typescript
// 🤖 만능 로봇이 예외상황까지 모두 처리하려 하면...
function handleOrder(order: Order) {
  let coffee;
  let price;

  // 1. 커피 만들기 + 예외처리
  try {
    coffee = brewCoffee(order.coffeeType);
  } catch (error) {
    logger.error('커피 제조 실패', { coffeeType: order.coffeeType, error });
    throw new CoffeeBrewError('원두가 부족하거나 기계 오류');
  }

  // 2. 가격 계산하기 + 예외처리
  try {
    price = coffee.basePrice;
    if (order.size === 'large') price *= 1.5;
    if (order.hasMilk) price += 500;
    if (price < 0 || price > 100000) {
      throw new Error('비정상적인 가격');
    }
  } catch (error) {
    logger.error('가격 계산 실패', { order, error });
    throw new PriceCalculationError('가격 정책 오류');
  }

  // 아래 계속 되는 예외처리 상황의 발생...
}
```

### Good 케이스

```typescript
// ☕ 바리스타: 커피만 만듦
function makeCoffee(coffeeType: string): Coffee {
  return brewCoffee(coffeeType);
}

// 💰 계산원: 가격만 계산함
function calculatePrice(order: Order): number {
  let price = order.coffee.basePrice;
  if (order.size === 'large') price *= 1.5;
  if (order.hasMilk) price += 500;
  return price;
}

// 🖨️ 프린터: 영수증만 출력함
function printReceipt(order: Order, price: number): void {
  console.log('=== 영수증 ===');
  console.log(`커피: ${order.coffeeType}`);
  console.log(`가격: ${price}원`);
}

// 💾 데이터 관리자: 저장만 함
function saveOrder(orderId: string, price: number): void {
  database.save({ orderId, price, timestamp: Date.now() });
}

// 📧 알림 담당자: 이메일만 보냄
function notifyCustomer(email: string, price: number): void {
  sendEmail(email, `주문이 완료되었습니다. 금액: ${price}원`);
}

// 🎯 매니저: 팀원들을 조율만 함
function handleOrder(order: Order) {
  const coffee = makeCoffee(order.coffeeType);
  const price = calculatePrice(order);
  printReceipt(order, price);
  saveOrder(order.id, price);
  notifyCustomer(order.email, price);
  return { coffee, price };
}
```

### Good 케이스 (예외처리가 필요한 경우)

```typescript
// ☕ 바리스타: 커피 제조 예외만 처리
function makeCoffee(coffeeType: string): Coffee {
  try {
    return brewCoffee(coffeeType);
  } catch (error) {
    logger.error('커피 제조 실패', { coffeeType, error });
    throw new CoffeeBrewError('원두가 부족하거나 기계 오류');
  }
}
```
