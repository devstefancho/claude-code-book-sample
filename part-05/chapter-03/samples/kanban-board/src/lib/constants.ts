import type { CardStatus, Column } from "@/types";

/**
 * 상태별 색상 클래스
 */
export const STATUS_COLOR_CLASSES: Record<CardStatus, string> = {
  todo: "bg-todo-light text-todo-dark border-todo",
  "in-progress": "bg-in-progress-light text-in-progress-dark border-in-progress",
  done: "bg-done-light text-done-dark border-done",
};

/**
 * 컬럼 정의 (3개 고정 컬럼)
 */
export const COLUMNS: Readonly<{ id: CardStatus; title: string }[]> = [
  { id: "todo", title: "할 일" },
  { id: "in-progress", title: "진행 중" },
  { id: "done", title: "완료" },
] as const;

/**
 * 카드 제목 최대 길이
 */
export const TITLE_MAX_LENGTH = 200;

/**
 * 카드 설명 최대 길이
 */
export const DESCRIPTION_MAX_LENGTH = 2000;

/**
 * 카드 설명 미리보기 길이
 */
export const DESCRIPTION_PREVIEW_LENGTH = 100;

/**
 * 최대 카드 개수 (성능 고려)
 */
export const MAX_CARDS = 100;

/**
 * 초기 컬럼 상태 (COLUMNS에서 파생)
 */
export const INITIAL_COLUMNS = COLUMNS.reduce(
  (acc, col) => {
    acc[col.id] = { ...col, cards: [] };
    return acc;
  },
  {} as Record<CardStatus, Column>
);
