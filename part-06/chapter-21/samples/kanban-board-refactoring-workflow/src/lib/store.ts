import { create } from "zustand";
import type { KanbanState, Card, CardStatus, Column } from "@/types";
import { INITIAL_COLUMNS } from "./constants";
import { createClient } from "@/lib/supabase/client";
import type { DbCard } from "@/types/database";

/**
 * Convert DbCard to Card
 */
function dbCardToCard(dbCard: DbCard): Card {
  return {
    id: dbCard.id,
    title: dbCard.title,
    description: dbCard.description ?? "",
    status: dbCard.status as CardStatus,
    order: dbCard.order,
    createdAt: new Date(dbCard.created_at ?? "").getTime(),
    updatedAt: new Date(dbCard.updated_at ?? "").getTime(),
  };
}

/**
 * Convert cards array to columns structure
 */
function cardsToColumns(cards: DbCard[]): Record<CardStatus, Column> {
  const columns: Record<CardStatus, Column> = {
    todo: { id: "todo", title: "할 일", cards: [] },
    "in-progress": { id: "in-progress", title: "진행 중", cards: [] },
    done: { id: "done", title: "완료", cards: [] },
  };

  cards.forEach((dbCard) => {
    const card = dbCardToCard(dbCard);
    const status = card.status as CardStatus;
    if (columns[status]) {
      columns[status].cards.push(card);
    }
  });

  // Sort cards by order within each column
  Object.values(columns).forEach((column) => {
    column.cards.sort((a, b) => a.order - b.order);
  });

  return columns;
}

/**
 * Kanban board state store with Supabase synchronization
 */
export const useKanbanStore = create<KanbanState>()((set, get) => ({
  columns: INITIAL_COLUMNS,
  boardId: null,
  isLoading: false,
  error: null,

  /**
   * Load board from Supabase, create if not exists
   */
  loadBoard: async () => {
    set({ isLoading: true, error: null });

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        set({ isLoading: false, error: "User not authenticated" });
        return;
      }

      // Try to get existing board (get the oldest one to preserve data)
      const { data: existingBoards, error: boardError } = await supabase
        .from("boards")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1);

      if (boardError) {
        set({ isLoading: false, error: boardError.message });
        return;
      }

      let board = existingBoards?.[0] ?? null;

      if (!board) {
        // No board found, create one
        const { data: newBoard, error: createError } = await supabase
          .from("boards")
          .insert({ user_id: user.id })
          .select()
          .single();

        if (createError) {
          set({ isLoading: false, error: createError.message });
          return;
        }
        board = newBoard;
      }

      if (!board) {
        set({ isLoading: false, error: "Failed to load or create board" });
        return;
      }

      // Load cards for this board
      const { data: cards, error: cardsError } = await supabase
        .from("cards")
        .select("*")
        .eq("board_id", board.id)
        .order("order", { ascending: true });

      if (cardsError) {
        set({ isLoading: false, error: cardsError.message });
        return;
      }

      const columns = cardsToColumns(cards ?? []);
      set({ columns, boardId: board.id, isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  /**
   * Add a new card with Supabase sync
   */
  addCard: async (card) => {
    const { boardId, columns } = get();
    if (!boardId) return;

    const column = columns[card.status];
    const order = column.cards.length;

    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempCard: Card = {
      ...card,
      id: tempId,
      order,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    set((state) => ({
      columns: {
        ...state.columns,
        [card.status]: {
          ...column,
          cards: [...column.cards, tempCard],
        },
      },
    }));

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cards")
        .insert({
          board_id: boardId,
          title: card.title,
          description: card.description,
          status: card.status,
          order,
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to add card:", error);
        throw error;
      }

      // Replace temp card with real card
      set((state) => ({
        columns: {
          ...state.columns,
          [card.status]: {
            ...state.columns[card.status],
            cards: state.columns[card.status].cards.map((c) =>
              c.id === tempId ? dbCardToCard(data) : c
            ),
          },
        },
      }));
    } catch (error) {
      // Rollback on error
      set((state) => ({
        columns: {
          ...state.columns,
          [card.status]: {
            ...state.columns[card.status],
            cards: state.columns[card.status].cards.filter((c) => c.id !== tempId),
          },
        },
        error: error instanceof Error ? error.message : "Failed to add card",
      }));
    }
  },

  /**
   * Update card with Supabase sync
   */
  updateCard: async (id, updates) => {
    const { columns } = get();
    let originalCard: Card | null = null;
    let cardStatus: CardStatus | null = null;

    // Find the card and store original
    for (const status in columns) {
      const card = columns[status as CardStatus].cards.find((c) => c.id === id);
      if (card) {
        originalCard = { ...card };
        cardStatus = status as CardStatus;
        break;
      }
    }

    if (!originalCard || !cardStatus) return;

    // Optimistic update
    set((state) => {
      const newColumns = { ...state.columns };
      newColumns[cardStatus!] = {
        ...newColumns[cardStatus!],
        cards: newColumns[cardStatus!].cards.map((c) =>
          c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
        ),
      };
      return { columns: newColumns };
    });

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("cards")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      // Rollback on error
      set((state) => {
        const newColumns = { ...state.columns };
        newColumns[cardStatus!] = {
          ...newColumns[cardStatus!],
          cards: newColumns[cardStatus!].cards.map((c) => (c.id === id ? originalCard! : c)),
        };
        return {
          columns: newColumns,
          error: error instanceof Error ? error.message : "Failed to update card",
        };
      });
    }
  },

  /**
   * Delete card with Supabase sync
   */
  deleteCard: async (id) => {
    const { columns } = get();
    let originalCard: Card | null = null;
    let cardStatus: CardStatus | null = null;
    let cardIndex: number = -1;

    // Find the card and store original
    for (const status in columns) {
      const idx = columns[status as CardStatus].cards.findIndex((c) => c.id === id);
      if (idx !== -1) {
        originalCard = { ...columns[status as CardStatus].cards[idx] };
        cardStatus = status as CardStatus;
        cardIndex = idx;
        break;
      }
    }

    if (!originalCard || !cardStatus) return;

    // Optimistic update
    set((state) => {
      const newColumns = { ...state.columns };
      const updatedCards = newColumns[cardStatus!].cards.filter((c) => c.id !== id);
      // Recalculate order
      updatedCards.forEach((card, idx) => {
        card.order = idx;
      });
      newColumns[cardStatus!] = {
        ...newColumns[cardStatus!],
        cards: updatedCards,
      };
      return { columns: newColumns };
    });

    try {
      const supabase = createClient();
      const { error } = await supabase.from("cards").delete().eq("id", id);

      if (error) throw error;

      // Update order of remaining cards in the database
      const { columns: currentColumns } = get();
      const remainingCards = currentColumns[cardStatus!].cards;

      if (remainingCards.length > 0) {
        const updates = remainingCards.map((card, idx) => ({
          id: card.id,
          order: idx,
        }));

        for (const update of updates) {
          await supabase.from("cards").update({ order: update.order }).eq("id", update.id);
        }
      }
    } catch (error) {
      // Rollback on error
      set((state) => {
        const newColumns = { ...state.columns };
        const cards = [...newColumns[cardStatus!].cards];
        cards.splice(cardIndex, 0, originalCard!);
        // Recalculate order
        cards.forEach((card, idx) => {
          card.order = idx;
        });
        newColumns[cardStatus!] = {
          ...newColumns[cardStatus!],
          cards,
        };
        return {
          columns: newColumns,
          error: error instanceof Error ? error.message : "Failed to delete card",
        };
      });
    }
  },

  /**
   * Move card to another column with Supabase sync
   */
  moveCard: async (cardId, targetStatus, targetOrder) => {
    const { columns } = get();
    let cardToMove: Card | null = null;
    let sourceStatus: CardStatus | null = null;
    const originalColumns = JSON.parse(JSON.stringify(columns));

    // Find card
    for (const status in columns) {
      const card = columns[status as CardStatus].cards.find((c) => c.id === cardId);
      if (card) {
        cardToMove = { ...card };
        sourceStatus = status as CardStatus;
        break;
      }
    }

    if (!cardToMove || !sourceStatus) return;

    // Optimistic update
    set((state) => {
      const newColumns = { ...state.columns };

      // Remove from source
      newColumns[sourceStatus!] = {
        ...newColumns[sourceStatus!],
        cards: newColumns[sourceStatus!].cards.filter((c) => c.id !== cardId),
      };

      // Update card status
      const movedCard = { ...cardToMove!, status: targetStatus, updatedAt: Date.now() };

      // Insert into target
      const targetCards = [...newColumns[targetStatus].cards];
      targetCards.splice(targetOrder, 0, movedCard);

      // Recalculate orders
      newColumns[sourceStatus!].cards.forEach((card, idx) => {
        card.order = idx;
      });
      targetCards.forEach((card, idx) => {
        card.order = idx;
      });

      newColumns[targetStatus] = {
        ...newColumns[targetStatus],
        cards: targetCards,
      };

      return { columns: newColumns };
    });

    try {
      const supabase = createClient();
      const { columns: currentColumns } = get();

      // Update moved card
      await supabase
        .from("cards")
        .update({
          status: targetStatus,
          order: targetOrder,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cardId);

      // Update orders of cards in target column
      const targetCards = currentColumns[targetStatus].cards;
      for (const card of targetCards) {
        if (card.id !== cardId) {
          await supabase.from("cards").update({ order: card.order }).eq("id", card.id);
        }
      }

      // Update orders of cards in source column (if different)
      if (sourceStatus !== targetStatus) {
        const sourceCards = currentColumns[sourceStatus!].cards;
        for (const card of sourceCards) {
          await supabase.from("cards").update({ order: card.order }).eq("id", card.id);
        }
      }
    } catch (error) {
      // Rollback on error
      set({
        columns: originalColumns,
        error: error instanceof Error ? error.message : "Failed to move card",
      });
    }
  },

  /**
   * Reorder card within the same column with Supabase sync
   */
  reorderCard: async (cardId, newOrder) => {
    const { columns } = get();
    let cardStatus: CardStatus | null = null;
    const originalColumns = JSON.parse(JSON.stringify(columns));

    // Find card
    for (const status in columns) {
      if (columns[status as CardStatus].cards.find((c) => c.id === cardId)) {
        cardStatus = status as CardStatus;
        break;
      }
    }

    if (!cardStatus) return;

    // Optimistic update
    set((state) => {
      const newColumns = { ...state.columns };
      const cards = [...newColumns[cardStatus!].cards];
      const cardIndex = cards.findIndex((c) => c.id === cardId);

      if (cardIndex !== -1) {
        const [removed] = cards.splice(cardIndex, 1);
        cards.splice(newOrder, 0, removed);

        // Recalculate orders
        cards.forEach((card, idx) => {
          card.order = idx;
        });

        newColumns[cardStatus!] = {
          ...newColumns[cardStatus!],
          cards,
        };
      }

      return { columns: newColumns };
    });

    try {
      const supabase = createClient();
      const { columns: currentColumns } = get();
      const cards = currentColumns[cardStatus!].cards;

      // Update all cards order in this column
      for (const card of cards) {
        await supabase.from("cards").update({ order: card.order }).eq("id", card.id);
      }
    } catch (error) {
      // Rollback on error
      set({
        columns: originalColumns,
        error: error instanceof Error ? error.message : "Failed to reorder card",
      });
    }
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
