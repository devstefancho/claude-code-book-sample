---
description: Analyze requirements and generate specification document
argument-hint: requirement-description (Korean/English)
model: inherit
---

## Arguments

$1: requirement-description (Korean/English support)

## Instructions

1. **분석 (Analysis)**: 제공된 요구 사항을 세밀하게 분석합니다.
   - 사용자가 제공한 요구사항 `$1`을 정확히 이해
   - 명시적/암묵적 요구사항 파악
   - 핵심 기능과 부가 기능 구분
   - 기술적 제약사항 및 비즈니스 맥락 고려

2. **`docs/{current_branch}/spec.md` 생성**: 다음 구조로 상세한 명세서를 작성합니다.

   ### 문서 구조 (Document Structure)

   #### 1. Original Requirements

   사용자가 입력한 요구사항을 그대로 기록합니다.

   ```
   ## Original Requirements

   [사용자 입력 내용을 그대로 복사]
   ```

   #### 2. Overview

   프로젝트/기능에 대한 간단하고 명확한 요약을 작성합니다.
   - 무엇을 만드는지 (What)
   - 왜 필요한지 (Why)
   - 누가 사용하는지 (Who)

   #### 3. Goals

   명확하고 측정 가능한 목표를 나열합니다.
   - 각 목표는 구체적이고 달성 가능해야 함
   - SMART 원칙 적용 (Specific, Measurable, Achievable, Relevant, Time-bound)

   #### 4. User Stories

   사용자 관점에서 시나리오를 작성합니다.

   ```
   As a [user type],
   I want to [action],
   So that [benefit/goal].
   ```

   - 최소 3-5개의 핵심 사용자 스토리
   - 각 스토리는 비즈니스 가치를 명확히 표현

   #### 5. Functional Requirements

   시스템이 해야 할 일을 구체적으로 정의합니다.
   - FR-001, FR-002 등으로 번호 매기기
   - 각 요구사항마다 Acceptance Criteria 포함
   - 우선순위 표시 (Must-have, Should-have, Nice-to-have)

   예시:

   ```
   **FR-001: User Authentication** (Must-have)
   - Acceptance Criteria:
     - [ ] Users can register with email and password
     - [ ] Passwords must be at least 8 characters
     - [ ] Users can log in with valid credentials
   ```

   #### 6. Non-Functional Requirements

   성능, 보안, 접근성 등 품질 속성을 정의합니다.
   - **Performance**: 응답 시간, 처리량, 확장성
   - **Security**: 인증, 권한, 데이터 보호
   - **Accessibility**: WCAG 준수, 키보드 네비게이션
   - **Usability**: 사용자 경험, 학습 용이성
   - **Compatibility**: 브라우저, 디바이스 지원
   - **Maintainability**: 코드 품질, 문서화

   #### 7. Constraints & Assumptions

   프로젝트의 제약사항과 가정을 명시합니다.
   - **Technical Constraints**: 기술 스택, 플랫폼 제한
   - **Business Constraints**: 예산, 일정, 리소스
   - **Assumptions**: 사용자 환경, 데이터 가용성 등

   #### 8. Success Criteria

   프로젝트 성공을 측정할 수 있는 기준을 정의합니다.
   - 정량적 지표 (사용자 수, 성능 메트릭 등)
   - 정성적 지표 (사용자 만족도, 코드 품질 등)
   - 체크리스트 형식으로 작성

## Report

명세서 작성 완료 후 다음 내용을 사용자에게 보고합니다:

1. **핵심 내용 요약**:
   - 주요 목표 (2-3개)
   - 핵심 기능 요구사항 개수
   - 중요한 비기능 요구사항
   - 주요 제약사항

2. **다음 단계 안내**:

   ```
   ✅ Specification document created: docs/{current_branch}/spec.md

   📋 Summary:
   - Goals: [주요 목표 나열]
   - Functional Requirements: [개수]
   - Non-Functional Requirements: [주요 항목]

   🚀 Next Step:
   Run `/sdd:plan [tech-stack]` to generate technical implementation plan.

   Example:
   /sdd:plan React, TypeScript, Node.js
   /sdd:plan React, TypeScript (한글로 작성 시)
   ```

## Quality Checklist

생성된 명세서가 다음 기준을 만족하는지 확인합니다:

- [ ] **명확성 (Clarity)**: 모호하지 않고 명확하게 작성됨
- [ ] **완전성 (Completeness)**: 모든 필수 섹션이 포함됨
- [ ] **테스트 가능성 (Testability)**: 각 요구사항이 테스트 가능함
- [ ] **측정 가능성 (Measurability)**: Success Criteria가 측정 가능함
- [ ] **일관성 (Consistency)**: 요구사항 간 충돌이 없음
- [ ] **추적 가능성 (Traceability)**: 각 요구사항이 고유 ID를 가짐
- [ ] **우선순위화 (Prioritization)**: 요구사항의 중요도가 명시됨
- [ ] **사용자 중심 (User-Centric)**: 사용자 관점이 반영됨

## Notes

- 사용자 입력이 한글인 경우, 한글로 명세서 작성
- 사용자 입력이 영어인 경우, 영어로 명세서 작성
- 명세서는 기술 구현 방법이 아닌 **무엇을 만들 것인지**에 집중
- 구체적인 기술 스택 선택은 `/sdd:plan` 단계에서 결정
