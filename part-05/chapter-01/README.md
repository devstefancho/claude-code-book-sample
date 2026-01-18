# Chapter 01. checkpoint로 리팩터링 되돌리기

> 프롬프트: [prompts.md](./prompts.md) | 코드: [code.md](./code.md)

체크포인팅(checkpointing) 시스템을 사용하여 프롬프트 단위로 작업 상태를 되돌리는 방법을 알아봅니다.

## 체크포인트 사용하는 방법

1. `/rewind` 명령어 입력
2. 단축키 `[Esc] + [Esc]`

## 체크포인트 데이터가 저장되는 방식

- 파일 히스토리: `~/.claude/file-history/{Session ID}/`
- 프롬프트 히스토리: `~/.claude/projects/{프로젝트 경로}/{Session ID}.jsonl`

## 간단한 예시로 체크포인팅 시스템 이해하기

실습 환경 준비, 파일 생성/수정 코드는 [code.md](./code.md)를 참고하세요.

프롬프트 예시는 [prompts.md](./prompts.md)를 참고하세요.

## /rewind 명령어로 특정 시점 복구하기

### 복구 옵션

1. **Restore code and conversation**: 코드와 대화 내용을 모두 해당 시점으로 되돌림
2. **Restore conversation**: 코드는 그대로 두고 대화 맥락만 되돌림
3. **Restore code**: 대화는 유지하고 코드만 해당 시점으로 되돌림
4. **Never mind**: 작업 취소
