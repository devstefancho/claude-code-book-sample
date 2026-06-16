import { describe, it, expect, beforeEach, vi } from "vitest";
import { useKanbanStore } from "./store";
import { INITIAL_COLUMNS } from "./constants";
import { createClient } from "@/lib/supabase/client";
import {
  createMockSupabaseClient,
  createMockDbCard,
  createMockDbBoard,
  mockUser,
} from "@/__tests__/mocks/supabase";

vi.mock("@/lib/supabase/client");

describe("useKanbanStore", () => {
  let mockSupabase: ReturnType<typeof createMockSupabaseClient>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Store 상태 초기화
    useKanbanStore.setState({
      columns: INITIAL_COLUMNS,
      boardId: null,
      isLoading: false,
      error: null,
    });

    // Supabase 모킹
    mockSupabase = createMockSupabaseClient();
    vi.mocked(createClient).mockReturnValue(mockSupabase.client as ReturnType<typeof createClient>);
  });

  describe("초기 상태", () => {
    it("초기 columns가 INITIAL_COLUMNS와 같다", () => {
      const state = useKanbanStore.getState();
      expect(state.columns).toEqual(INITIAL_COLUMNS);
    });

    it("초기 boardId는 null이다", () => {
      const state = useKanbanStore.getState();
      expect(state.boardId).toBeNull();
    });

    it("초기 isLoading은 false이다", () => {
      const state = useKanbanStore.getState();
      expect(state.isLoading).toBe(false);
    });

    it("초기 error는 null이다", () => {
      const state = useKanbanStore.getState();
      expect(state.error).toBeNull();
    });
  });

  describe("addCard", () => {
    beforeEach(() => {
      useKanbanStore.setState({ boardId: "board-1" });
    });

    it("boardId가 없으면 카드를 추가하지 않는다", async () => {
      useKanbanStore.setState({ boardId: null });

      await useKanbanStore.getState().addCard({
        title: "New Card",
        description: "",
        status: "todo",
      });

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards).toHaveLength(0);
    });

    it("Optimistic UI로 즉시 카드를 추가한다", async () => {
      const mockDbCard = createMockDbCard({ id: "real-id" });
      mockSupabase.mockChain({ insertData: mockDbCard });

      const addCardPromise = useKanbanStore.getState().addCard({
        title: "New Card",
        description: "Description",
        status: "todo",
      });

      // Optimistic 업데이트 확인 (임시 ID로 추가됨)
      const immediateState = useKanbanStore.getState();
      expect(immediateState.columns.todo.cards).toHaveLength(1);
      expect(immediateState.columns.todo.cards[0].id).toMatch(/^temp-/);

      await addCardPromise;

      // DB 저장 후 실제 ID로 교체
      const finalState = useKanbanStore.getState();
      expect(finalState.columns.todo.cards).toHaveLength(1);
      expect(finalState.columns.todo.cards[0].id).toBe("real-id");
    });

    it("order를 현재 컬럼의 카드 수로 설정한다", async () => {
      const existingCard = createMockDbCard({ id: "existing-1", order: 0 });
      useKanbanStore.setState({
        boardId: "board-1",
        columns: {
          ...INITIAL_COLUMNS,
          todo: {
            ...INITIAL_COLUMNS.todo,
            cards: [
              {
                id: "existing-1",
                title: "Existing",
                description: "",
                status: "todo",
                order: 0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              },
            ],
          },
        },
      });

      const mockDbCard = createMockDbCard({ id: "real-id", order: 1 });
      mockSupabase.mockChain({ insertData: mockDbCard });

      await useKanbanStore.getState().addCard({
        title: "New Card",
        description: "",
        status: "todo",
      });

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards).toHaveLength(2);
      expect(state.columns.todo.cards[1].order).toBe(1);
    });

    it("DB 저장 실패 시 롤백한다", async () => {
      mockSupabase.mockChain({
        insertData: null,
        error: { code: "ERROR", message: "Insert failed" },
      });

      // insert().select().single()이 에러를 반환하도록 설정
      const chain = {
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { code: "ERROR", message: "Insert failed" },
        }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().addCard({
        title: "New Card",
        description: "",
        status: "todo",
      });

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards).toHaveLength(0);
      expect(state.error).toBe("Failed to add card");
    });
  });

  describe("updateCard", () => {
    const existingCard = {
      id: "card-1",
      title: "Original Title",
      description: "Original Description",
      status: "todo" as const,
      order: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    beforeEach(() => {
      useKanbanStore.setState({
        boardId: "board-1",
        columns: {
          ...INITIAL_COLUMNS,
          todo: { ...INITIAL_COLUMNS.todo, cards: [existingCard] },
        },
      });
    });

    it("Optimistic UI로 카드를 즉시 업데이트한다", async () => {
      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      const updatePromise = useKanbanStore.getState().updateCard("card-1", {
        title: "Updated Title",
      });

      // Optimistic 업데이트 확인
      const immediateState = useKanbanStore.getState();
      expect(immediateState.columns.todo.cards[0].title).toBe("Updated Title");

      await updatePromise;

      const finalState = useKanbanStore.getState();
      expect(finalState.columns.todo.cards[0].title).toBe("Updated Title");
    });

    it("DB 저장 실패 시 원본으로 롤백한다", async () => {
      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({
          data: null,
          error: { code: "ERROR", message: "Update failed" },
        }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().updateCard("card-1", {
        title: "Updated Title",
      });

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards[0].title).toBe("Original Title");
      expect(state.error).toBe("Failed to update card");
    });

    it("존재하지 않는 카드는 업데이트하지 않는다", async () => {
      await useKanbanStore.getState().updateCard("non-existent", {
        title: "Updated Title",
      });

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards[0].title).toBe("Original Title");
    });
  });

  describe("deleteCard", () => {
    const card1 = {
      id: "card-1",
      title: "Card 1",
      description: "",
      status: "todo" as const,
      order: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const card2 = {
      id: "card-2",
      title: "Card 2",
      description: "",
      status: "todo" as const,
      order: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    beforeEach(() => {
      useKanbanStore.setState({
        boardId: "board-1",
        columns: {
          ...INITIAL_COLUMNS,
          todo: { ...INITIAL_COLUMNS.todo, cards: [card1, card2] },
        },
      });
    });

    it("Optimistic UI로 카드를 즉시 삭제한다", async () => {
      const chain = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
        update: vi.fn().mockReturnThis(),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      const deletePromise = useKanbanStore.getState().deleteCard("card-1");

      // Optimistic 업데이트 확인
      const immediateState = useKanbanStore.getState();
      expect(immediateState.columns.todo.cards).toHaveLength(1);
      expect(immediateState.columns.todo.cards[0].id).toBe("card-2");

      await deletePromise;
    });

    it("삭제 후 남은 카드의 order를 재계산한다", async () => {
      const chain = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
        update: vi.fn().mockReturnThis(),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().deleteCard("card-1");

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards[0].order).toBe(0);
    });

    it("DB 삭제 실패 시 카드를 원래 위치에 복원한다", async () => {
      const chain = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({
          data: null,
          error: { code: "ERROR", message: "Delete failed" },
        }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().deleteCard("card-1");

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards).toHaveLength(2);
      expect(state.columns.todo.cards[0].id).toBe("card-1");
      expect(state.error).toBe("Failed to delete card");
    });
  });

  describe("moveCard", () => {
    const todoCard = {
      id: "card-1",
      title: "Card 1",
      description: "",
      status: "todo" as const,
      order: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    beforeEach(() => {
      useKanbanStore.setState({
        boardId: "board-1",
        columns: {
          ...INITIAL_COLUMNS,
          todo: { ...INITIAL_COLUMNS.todo, cards: [todoCard] },
        },
      });
    });

    it("카드를 다른 컬럼으로 이동한다", async () => {
      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().moveCard("card-1", "in-progress", 0);

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards).toHaveLength(0);
      expect(state.columns["in-progress"].cards).toHaveLength(1);
      expect(state.columns["in-progress"].cards[0].status).toBe("in-progress");
    });

    it("카드 이동 후 order를 재계산한다", async () => {
      // 이동 대상 컬럼에 기존 카드 추가
      useKanbanStore.setState({
        boardId: "board-1",
        columns: {
          ...INITIAL_COLUMNS,
          todo: { ...INITIAL_COLUMNS.todo, cards: [todoCard] },
          "in-progress": {
            ...INITIAL_COLUMNS["in-progress"],
            cards: [
              {
                id: "card-2",
                title: "Card 2",
                description: "",
                status: "in-progress" as const,
                order: 0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              },
            ],
          },
        },
      });

      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().moveCard("card-1", "in-progress", 0);

      const state = useKanbanStore.getState();
      expect(state.columns["in-progress"].cards[0].order).toBe(0);
      expect(state.columns["in-progress"].cards[1].order).toBe(1);
    });

    it("DB 저장 실패 시 원래 상태로 롤백한다", async () => {
      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockRejectedValue(new Error("Move failed")),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().moveCard("card-1", "in-progress", 0);

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards).toHaveLength(1);
      expect(state.columns["in-progress"].cards).toHaveLength(0);
      expect(state.error).toBe("Move failed");
    });

    it("존재하지 않는 카드는 이동하지 않는다", async () => {
      await useKanbanStore.getState().moveCard("non-existent", "in-progress", 0);

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards).toHaveLength(1);
      expect(state.columns["in-progress"].cards).toHaveLength(0);
    });
  });

  describe("reorderCard", () => {
    const card1 = {
      id: "card-1",
      title: "Card 1",
      description: "",
      status: "todo" as const,
      order: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const card2 = {
      id: "card-2",
      title: "Card 2",
      description: "",
      status: "todo" as const,
      order: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const card3 = {
      id: "card-3",
      title: "Card 3",
      description: "",
      status: "todo" as const,
      order: 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    beforeEach(() => {
      useKanbanStore.setState({
        boardId: "board-1",
        columns: {
          ...INITIAL_COLUMNS,
          todo: { ...INITIAL_COLUMNS.todo, cards: [card1, card2, card3] },
        },
      });
    });

    it("같은 컬럼 내에서 카드 순서를 변경한다", async () => {
      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().reorderCard("card-1", 2);

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards[0].id).toBe("card-2");
      expect(state.columns.todo.cards[1].id).toBe("card-3");
      expect(state.columns.todo.cards[2].id).toBe("card-1");
    });

    it("순서 변경 후 order를 재계산한다", async () => {
      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().reorderCard("card-1", 2);

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards[0].order).toBe(0);
      expect(state.columns.todo.cards[1].order).toBe(1);
      expect(state.columns.todo.cards[2].order).toBe(2);
    });

    it("DB 저장 실패 시 원래 순서로 롤백한다", async () => {
      const chain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockRejectedValue(new Error("Reorder failed")),
      };
      mockSupabase.mockFrom.mockReturnValue(chain);

      await useKanbanStore.getState().reorderCard("card-1", 2);

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards[0].id).toBe("card-1");
      expect(state.columns.todo.cards[1].id).toBe("card-2");
      expect(state.columns.todo.cards[2].id).toBe("card-3");
      expect(state.error).toBe("Reorder failed");
    });

    it("존재하지 않는 카드는 재정렬하지 않는다", async () => {
      await useKanbanStore.getState().reorderCard("non-existent", 0);

      const state = useKanbanStore.getState();
      expect(state.columns.todo.cards[0].id).toBe("card-1");
    });
  });

  describe("clearError", () => {
    it("error 상태를 null로 초기화한다", () => {
      useKanbanStore.setState({ error: "Some error" });

      useKanbanStore.getState().clearError();

      const state = useKanbanStore.getState();
      expect(state.error).toBeNull();
    });
  });
});
