# Chapter 14. 코드 모음

## 개선 대상 스킬 다운로드

챕터 13에서 만든 `component-design-reviewer` 스킬을 임시 디렉터리에 설치합니다.

```shell
mkdir ~/claude-skill-creator

npx degit devstefancho/claude-code-book-sample/part-04/chapter-13/samples/skills/component-design-reviewer .claude/skills/component-design-reviewer --force
```

## 워크스페이스 디렉터리 구조

평가 기반으로 스킬을 개선하면 `component-design-reviewer-workspace/` 아래에 모든 파일이 생성됩니다. `feedback.json` 외 나머지는 모두 클로드 코드가 자동으로 생성합니다.

```
component-design-reviewer-workspace/   # 격리된 작업 공간
├── skill-snapshot/                     # 기존 스킬의 복사본
├── improved-skill/                     # 개선된 스킬 버전
├── iteration-1/                        # 1차 개선 (반복마다 iteration-N 생성)
│   ├── eval-0/
│   │   ├── old_skill/                  # 기존 스킬 실행 결과
│   │   └── with_skill/                 # 개선 스킬 실행 결과
│   ├── eval-1/
│   ├── eval-2/
│   └── feedback.json                   # 추가 피드백을 줄 때만 생성
├── test-fixtures/                      # 테스트 대상 샘플 코드
├── benchmark.json                      # 전체 점수 요약
└── review.html                         # 평가 결과 비교 및 피드백 작성 웹페이지
```
