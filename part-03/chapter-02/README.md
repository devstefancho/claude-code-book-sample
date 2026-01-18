# Chapter 02. 리팩터링 전략 배우고 샘플 코드 만들기

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md) | 샘플: [samples/](./samples/)

리팩터링 전략들을 키워드로 먼저 알아보고 클로드 코드와 대화하면서 샘플 코드를 만들어봅니다.

## 리팩터링 전략

프로그래밍 언어, 서비스 형태와 상관없이 중요한 리팩터링 원칙들:

- **SRP (Single Responsibility Principle)**: 단일 책임의 원칙
- **DRY (Don't Repeat Yourself)**: 중복하지 말 것
- **Rule of Three**: 섣부른 추상화를 하지 말 것
- **KISS (Keep It Simple, Stupid)**: 단순하게 유지할 것
- **YAGNI (You Ain't Gonna Need It)**: 당장 필요하지 않은 기능은 미리 만들지 말 것
- **SoC (Separation of Concerns)**: 관심사를 분리할 것
- **Meaningful Naming**: 식별 가능한 이름 짓기

## 리팩터링 학습용 Output Style 만들기

Output Style 파일 생성 명령어와 내용은 [code.md](./code.md)를 참고하세요.

파일 링크: https://github.com/devstefancho/claude-code-book-sample/blob/main/.claude/output-styles/learning-refactoring-principle.md

Output Style 선택 방법은 [prompts.md](./prompts.md)를 참고하세요.

## 단일 책임의 원칙 (SRP)

함수나 클래스가 한 가지에 대해서만 책임지도록 작성합니다.

- 코드 수정이 있을 때마다 확인 필요
- 네이밍에 `and` 혹은 `or`가 포함된 경우 의심

## 중복하지 말 것 (DRY)

비슷한 코드들을 반복되지 않게 공통화하여 사용합니다.

- 같은 코드가 여러 군데 있으면 수정 시 놓치는 경우 발생
- 규칙 변경 시 한 곳만 수정하면 됨

## 섣부른 추상화를 하지 말 것 (Rule of Three)

같은 코드가 세 번 작성되었을 때 공통화를 고려합니다.

- 두 번까지는 허용
- 성급한 공통화/추상화를 막기 위한 목적

## 단순하게 유지할 것 (KISS)

과도한 추상화와 복잡한 코드를 피합니다.

- 너무 많은 가능성과 경우의 수 고려 X
- AI도 복잡한 코드에 어려움을 느낌

## 당장 필요하지 않은 기능은 미리 만들지 말 것 (YAGNI)

'나중에 필요할 것 같은데'라는 유혹을 이겨내야 합니다.

- 코드 작성 비용이 제로에 수렴하는 현재, 미리 작성할 필요 없음
- 필요할 때 작성하는 것이 중요

## 관심사를 분리할 것 (SoC)

다른 종류의 작업을 하는 분리 가능한 로직들을 분리합니다.

- 디렉터리 구조와 직접적인 관계
- React 컴포넌트: UI, 데이터 접근 로직, 비즈니스 로직 분리

## 식별 가능한 이름 짓기 (Meaningful Naming)

AI가 잘못된 판단을 하는 것을 방지하는 데 중요한 역할을 합니다.

- `a`, `temp`, `data`와 같은 일반적인 이름 사용 X
- 이름만 보고도 무엇인지 알 수 있도록 작성
