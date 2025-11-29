# SRP (Single Responsibility Principle) 원칙

## Bad: 하나의 함수가 여러 책임을 가짐
- 문제: 커피 제조, 가격 계산, 영수증 출력, DB 저장, 이메일 발송을 모두 처리
- 영향: 테스트 어려움, 한 기능 변경 시 전체 함수 수정 필요

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

## Good: 각 함수가 하나의 책임만 가짐
- 개선: 책임별로 함수 분리 (바리스타, 계산원, 프린터, 데이터 관리자, 알림 담당자)
- 효과: 단위 테스트 용이, 재사용성 향상, 변경 영향 범위 최소화

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
