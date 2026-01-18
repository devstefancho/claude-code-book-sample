# Chapter 02. 코드 모음

## Output Style 디렉토리 생성

```shell
mkdir .claude/output-styles/
```

## Output Style 파일 생성

```shell
touch .claude/output-styles/learning-refactoring-principle.md
```

## Output Style 파일 내용

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/output-styles/learning-refactoring-principle.md

````markdown
---
name: Learning Refactoring Principles
description: Teaches refactoring principles with insights and code examples
keep-coding-instructions: true
---

# Refactoring Learning Assistant

리팩터링 원칙을 물어보면 다음과 같은 포맷으로 응답하세요.

## 💡 [Principle Name]

**정의**: 한 문장으로 설명

**적용 시점**: 이 리팩터링을 언제 적용하는가

## 📝 예시

**Before:**

```typescript
// 문제가 되는 코드
```

**After:**

```typescript
// 개선된 코드
```

**주요 개선점**: 무엇이 개선되었는지

## ⚠️ 흔히 범하는 오류

- 일반적인 오류 상황 (1-2 items)

**가이드라인**: 코드 샘플에 집중할 것, Before/After 비교에 집중할 것, 간결하게 답변할 것
````

## 단일 책임 원칙 (SRP) 예시

**Before:**

```typescript
// 사용자 관리 + 이메일 발송 + 로깅을 모두 처리
class UserService {
  createUser(userData: UserData) {
    // 1. 사용자 생성
    const user = db.users.create(userData);

    // 2. 환영 이메일 발송
    const emailContent = `Welcome ${user.name}!`;
    smtp.send(user.email, emailContent);

    // 3. 로그 기록
    fs.appendFileSync('app.log', `User created: ${user.id}\n`);

    return user;
  }
}
```

**After:**

```typescript
// 각각의 책임을 분리
class UserService {
  constructor(
    private emailService: EmailService,
    private logger: Logger
  ) {}

  createUser(userData: UserData) {
    const user = db.users.create(userData);
    this.emailService.sendWelcomeEmail(user);
    this.logger.log(`User created: ${user.id}`);
    return user;
  }
}

class EmailService {
  sendWelcomeEmail(user: User) {
    const content = `Welcome ${user.name}!`;
    smtp.send(user.email, content);
  }
}

class Logger {
  log(message: string) {
    fs.appendFileSync('app.log', `${message}\n`);
  }
}
```

## 중복하지 말 것 (DRY) 예시

**Before:**

```typescript
// 사용자 검증 로직이 여러 곳에 중복
function createUser(name: string, email: string) {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (name.length < 2) {
    throw new Error('Name too short');
  }
  // 사용자 생성 로직
}

function updateUser(id: string, name: string, email: string) {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (name.length < 2) {
    throw new Error('Name too short');
  }
  // 사용자 업데이트 로직
}
```

**After:**

```typescript
// 검증 로직을 하나의 함수로 추출
function validateUserData(name: string, email: string) {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (name.length < 2) {
    throw new Error('Name too short');
  }
}

function createUser(name: string, email: string) {
  validateUserData(name, email);
  // 사용자 생성 로직
}

function updateUser(id: string, name: string, email: string) {
  validateUserData(name, email);
  // 사용자 업데이트 로직
}
```

## Rule of Three 예시

**Before:**

```typescript
// 첫 번째 사용
const userEmail = user.email?.toLowerCase().trim() || '';

// 두 번째 사용
const adminEmail = admin.email?.toLowerCase().trim() || '';

// 세 번째 사용 - 이제 리팩터링 시점!
const supportEmail = support.email?.toLowerCase().trim() || '';
```

**After:**

```typescript
function normalizeEmail(email: string | undefined): string {
  return email?.toLowerCase().trim() || '';
}

const userEmail = normalizeEmail(user.email);
const adminEmail = normalizeEmail(admin.email);
const supportEmail = normalizeEmail(support.email);
```

### 컴포넌트 추상화 실전 예시

**섣부른 추상화:**

```tsx
// 두 개의 버튼을 보고 바로 통합
function Button({
  variant,
  icon,
  onClick,
  disabled,
  loading,
  children
}: {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline-primary' | 'outline-secondary';
  icon?: 'left' | 'right' | 'only';
  // ... 계속 늘어나는 props
}) {
  // 복잡한 조건문들...
}
```

**Rule of Three 적용:**

```tsx
// 세 번 이상 사용처를 보고 나서 공통점 추출
function BaseButton({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn('px-4 py-2 rounded transition', className)}
      {...props}
    />
  );
}

// 구체적인 버튼들은 명확한 용도로 분리
function PrimaryButton(props: ButtonProps) {
  return <BaseButton className="bg-blue-500 text-white" {...props} />;
}

function DangerButton(props: ButtonProps) {
  return <BaseButton className="bg-red-500 text-white" {...props} />;
}
```

## 단순하게 유지할 것 (KISS) 예시

**Before:**

```typescript
// 과도한 추상화
interface DataProcessor<T> {
  process(data: T): T;
}

class UserDataProcessorFactory {
  createProcessor(type: string): DataProcessor<User> {
    // 실제로는 한 가지만 사용
    return new DefaultUserProcessor();
  }
}

function updateUser(user: User) {
  const factory = new UserDataProcessorFactory();
  const processor = factory.createProcessor('default');
  return processor.process(user);
}
```

**After:**

```typescript
// 단순한 접근
function updateUser(user: User) {
  return {
    ...user,
    updatedAt: new Date()
  };
}
```

## 당장 필요하지 않은 기능은 미리 만들지 말 것 (YAGNI) 예시

**Before:**

```typescript
// 미래를 대비한 과도한 설계
interface UserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByPhone(phone: string): Promise<User>;  // 아직 사용 안 함
  findByAddress(address: string): Promise<User>;  // 아직 사용 안 함
  findByAge(age: number): Promise<User[]>;  // 아직 사용 안 함
}

class ConfigManager {
  private config: Config;
  private cache: Map<string, any>;  // 나중을 위한 캐싱
  private validators: Map<string, Function>;  // 나중을 위한 검증

  get(key: string): string {
    // 실제로는 단순 조회만 필요함
    return this.config[key];
  }
}
```

**After:**

```typescript
// 현재 필요한 것만 구현
interface UserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  // 실제로 필요할 때 추가
}

class ConfigManager {
  private config: Config;

  get(key: string): string {
    return this.config[key];
  }
  // 캐싱이나 검증이 실제로 필요해지면 그때 추가
}
```

### YAGNI + KISS 예시

**YAGNI도 위반, KISS도 위반:**

```tsx
class ConfigurableButton {
  constructor(
    private themes: Theme[] = [],
    private animations: Animation[] = [],
    private validators: Validator[] = [],
    private middlewares: Middleware[] = []
  ) {}
  // 100줄의 복잡한 설정 로직...
  // 실제로는 기본 버튼만 필요한 상황
}
```

**YAGNI 준수 + KISS 준수:**

```tsx
function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
// 필요한 기능만, 단순하게
```

## 관심사 분리 (SoC) 예시

### 디렉터리 구조 예시

**Before:**

```
src/
├── HomePage.tsx
├── ProductPage.tsx
├── CartPage.tsx
├── LoginPage.tsx
├── Button.tsx
├── Input.tsx
├── ProductCard.tsx
├── CartItem.tsx
├── useProducts.ts
├── useCart.ts
├── useAuth.ts
├── productApi.ts
├── cartApi.ts
├── authApi.ts
└── types.ts
```

**After:**

```
src/
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.tsx
│   ├── ProductPage.tsx
│   ├── CartPage.tsx
│   └── LoginPage.tsx
├── features/           # 기능별 모듈
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── useProducts.ts
│   │   └── productApi.ts
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── useCart.ts
│   │   └── cartApi.ts
│   └── auth/
│       ├── useAuth.ts
│       └── authApi.ts
└── shared/             # 공통 컴포넌트
    ├── Button.tsx
    ├── Input.tsx
    └── types.ts
```

### React 컴포넌트 예시

**Before:**

```tsx
// UserProfile 컴포넌트가 데이터 fetching, 비즈니스 로직, UI 렌더링을 모두 처리
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 데이터 접근 로직
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  // 비즈니스 로직
  const displayName = user
    ? `${user.firstName} ${user.lastName}`.toUpperCase()
    : 'Loading...';

  const isVIP = user?.orderCount > 100;

  // UI 로직
  return (
    <div className={isVIP ? 'vip-user' : 'normal-user'}>
      <h1>{displayName}</h1>
      <p>Orders: {user?.orderCount}</p>
    </div>
  );
}
```

**After:**

```tsx
// 데이터 접근 로직 분리
function useUser(userId: string) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return user;
}

// 비즈니스 로직 분리
function formatUserDisplayName(user: User | null): string {
  if (!user) return 'Loading...';
  return `${user.firstName} ${user.lastName}`.toUpperCase();
}

function isVIPUser(user: User | null): boolean {
  return user?.orderCount > 100;
}

// UI 로직만 담당
function UserProfile({ userId }: { userId: string }) {
  const user = useUser(userId);
  const displayName = formatUserDisplayName(user);
  const isVIP = isVIPUser(user);

  return (
    <div className={isVIP ? 'vip-user' : 'normal-user'}>
      <h1>{displayName}</h1>
      <p>Orders: {user?.orderCount}</p>
    </div>
  );
}
```

## 식별 가능한 이름 짓기 (Meaningful Naming) 예시

**Before:**

```tsx
const [isProcessing, setIsProcessing] = useState(false);

return (
  <button disabled={isProcessing}>
    {isProcessing ? 'Processing...' : 'Submit'}
  </button>
);
```

**After:**

```tsx
const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

return (
  <button disabled={isSubmittingPayment}>
    {isSubmittingPayment ? 'Processing Payment...' : 'Submit Payment'}
  </button>
);
```
