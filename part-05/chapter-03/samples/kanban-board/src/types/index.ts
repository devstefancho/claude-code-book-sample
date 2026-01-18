/**
 * 카드 상태 (컬럼 타입)
 */
export type CardStatus = "todo" | "in-progress" | "done";

/**
 * 카드 엔티티
 */
export interface Card {
  /** UUID로 생성된 고유 ID */
  id: string;
  /** 제목 (필수, 1-200자) */
  title: string;
  /** 설명 (선택, 0-2000자) */
  description: string;
  /** 현재 상태 (컬럼) */
  status: CardStatus;
  /** 컬럼 내 순서 (0부터 시작) */
  order: number;
  /** 생성 시각 (Unix timestamp) */
  createdAt: number;
  /** 수정 시각 (Unix timestamp) */
  updatedAt: number;
}

/**
 * 컬럼 정의
 */
export interface Column {
  /** 컬럼 고유 ID (status와 동일) */
  id: CardStatus;
  /** 컬럼 제목 (한글) */
  title: string;
  /** 컬럼에 속한 카드 배열 (order로 정렬) */
  cards: Card[];
}

/**
 * 전역 Kanban 상태
 */
export interface KanbanState {
  /** 3개 컬럼 (todo, in-progress, done) */
  columns: Record<CardStatus, Column>;
  /** 현재 보드 ID */
  boardId: string | null;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;

  /** 보드 로드 (없으면 생성) */
  loadBoard: () => Promise<void>;
  /** 새 카드 추가 */
  addCard: (card: Omit<Card, "id" | "createdAt" | "updatedAt" | "order">) => Promise<void>;
  /** 카드 수정 */
  updateCard: (id: string, updates: Partial<Pick<Card, "title" | "description">>) => Promise<void>;
  /** 카드 삭제 */
  deleteCard: (id: string) => Promise<void>;
  /** 카드를 다른 컬럼으로 이동 */
  moveCard: (cardId: string, targetStatus: CardStatus, targetOrder: number) => Promise<void>;
  /** 같은 컬럼 내에서 순서 변경 */
  reorderCard: (cardId: string, newOrder: number) => Promise<void>;
  /** 에러 클리어 */
  clearError: () => void;
}
