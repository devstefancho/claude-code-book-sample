# Chapter 03. Plan 에이전트로 안전하게 분석하기

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md) | 샘플: [samples/](./samples/)

Plan 에이전트를 사용하여 코드를 건드리지 않고 분석하고 계획을 세우는 방법을 알아봅니다.

## 메인 에이전트와 서브 에이전트의 협업 구조

- **메인 에이전트**: 총괄 셰프, 전체 흐름 지휘
- **서브 에이전트**: 전문 요리사, 각자의 전공 분야 담당

## 빌트인 서브 에이전트의 종류와 역할

`@agent-` 입력 또는 `/agents` 명령어로 확인 가능

- **general-purpose**: 일반적인 작업 (sonnet 모델)
- **Plan**: 코드 분석과 작업 계획 (읽기 전용, 현재 모델 따름)
- **Explore**: 코드베이스 탐색 (haiku 모델)
- **statusline-setup**: 상태 표시줄 설정 (sonnet 모델)
- **claude-code-guide**: 클로드 코드 문서 검색 (haiku 모델)

## 서브 에이전트 사용하기

각 서브 에이전트 사용 프롬프트는 [prompts.md](./prompts.md)를 참고하세요.

## Plan 에이전트를 메인 에이전트로 사용하기

명령어는 [code.md](./code.md)를 참고하세요.

## 안전한 리팩터링 환경을 만드는 방법들

1. **체크포인팅 (CheckPointing)**: 프롬프트의 시간을 되돌림
2. **Git 워크트리 (Git Worktree)**: 공간 분리로 여러 시나리오 테스트
3. **Plan 에이전트**: 코드 수정 없는 안전한 분석
