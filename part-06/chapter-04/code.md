# Chapter 04. 코드 모음

## Plan 에이전트 실행

```shell
claude --agent Plan
```

## 워크플로 실행 단계

| 단계 | 내용 | 도구 |
|------|------|------|
| 1단계 | 코드 분석 | Plan 에이전트 |
| 2단계 | 코드 리뷰 | 리뷰 스킬들 |
| 3단계 | 계획 수립 | 분석 결과 기반 |
| 4단계 | 구현 | 체크포인트, 워크트리 |

## 사용하는 리뷰 스킬

| 스킬 | 검토 내용 |
|------|-----------|
| `strategic-code-reviewer` | DRY, KISS, SRP 원칙 |
| `component-design-reviewer` | React 컴포넌트 |
| `data-model-reviewer` | 데이터 모델 |
