# Chapter 04. 리팩터링 워크플로 실행하기

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md)

준비된 환경에서 실제 리팩터링 워크플로를 실행합니다.

## 워크플로 실행 단계

### 1단계: 코드 분석

Plan 에이전트를 사용한 안전한 분석 (명령어는 [code.md](./code.md) 참고)

### 2단계: 코드 리뷰

스킬을 사용한 코드 리뷰:
- `strategic-code-reviewer`: DRY, KISS, SRP 원칙 검토
- `component-design-reviewer`: React 컴포넌트 검토
- `data-model-reviewer`: 데이터 모델 검토

### 3단계: 리팩터링 계획 수립

분석 결과를 바탕으로 리팩터링 계획 작성

### 4단계: 구현

계획에 따른 단계별 구현:
- 체크포인트 활용
- 워크트리로 실험
- 테스트 실행

## 워크플로 자동화

SDD 커맨드 활용은 [prompts.md](./prompts.md)를 참고하세요.

## 워크플로 완료 후 검증

1. 모든 테스트 통과 확인
2. 코드 리뷰 스킬 재실행
3. 커밋 및 PR 생성
