# Chapter 05. 프롬프트 모음

## 데이터 모델 스킬 확인

```
[나]: 데이터 모델 관련 스킬이 있어?

[AI]: 네, 데이터 모델 관련 스킬이 있습니다! data-model-reviewer 스킬이 등록되어 있네요.
```

## 데이터 모델 리뷰 요청

```
[나]: 칸반보드 데이터 카드의 데이터 모델을 리뷰해줘

[AI]: 칸반보드의 카드 데이터 모델을 리뷰하기 위해 먼저 코드베이스를 탐색하겠습니다.

Card 데이터 모델 리뷰 결과

요약
| 항목         | 상태 |
|--------------|------|
| SSOT         | ⚠️   |
| Type Safety  | ✅   |
| Relationship | ✅   |

발견된 이슈
[심각도: Medium] 컬럼 title 정의 중복 (SSOT 위반)
- 파일: src/lib/constants.ts:15-19 및 src/lib/constants.ts:49-64
- 문제: 컬럼 제목('할 일', '진행 중', '완료')이 COLUMNS와 INITIAL_COLUMNS에 각각 정의되어 있어 수정 시 두 곳을 동시에 변경해야 함
- 제안: 하나의 Source of Truth에서 파생하도록 리팩터링

이 이슈를 수정하시겠습니까?
```

## 수정 진행

```
[나]: 수정 진행해줘

[AI]: 수정을 시작하겠습니다.

Card 데이터 모델 SSOT 리팩터링 계획
목표: 데이터 모델 리뷰에서 발견된 SSOT 위반 이슈 2건 수정

수정 사항
1. src/lib/constants.ts - 컬럼 title 중복 제거 (Medium)
2. src/lib/validation.ts - 매직 넘버 통합 (Low)

SSOT 리팩터링 완료

수정 내역
| 파일                      | 변경 내용                                        |
|---------------------------|--------------------------------------------------|
| src/lib/constants.ts:49-55| INITIAL_COLUMNS를 COLUMNS에서 파생하도록 변경    |
| src/lib/validation.ts:1-16| TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH 상수 적용|

개선 효과
1. 컬럼 제목 변경 시: 이제 COLUMNS 한 곳만 수정하면 됨
2. 값이 제한 변경 시: constants.ts의 상수만 수정하면 됨
```
