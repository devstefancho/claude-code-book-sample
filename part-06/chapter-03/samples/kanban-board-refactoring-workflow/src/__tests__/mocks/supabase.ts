import { vi } from "vitest";
import type { DbCard } from "@/types/database";

type MockChainOptions = {
  selectData?: unknown;
  insertData?: unknown;
  updateData?: unknown;
  deleteData?: unknown;
  error?: { code: string; message: string } | null;
};

/**
 * Supabase 클라이언트 모킹 팩토리
 */
export function createMockSupabaseClient() {
  const mockFrom = vi.fn();
  const mockAuth = {
    getUser: vi.fn().mockResolvedValue({
      data: { user: null },
      error: null,
    }),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
  };

  const client = {
    from: mockFrom,
    auth: mockAuth,
  };

  /**
   * 체이닝 메서드 모킹 헬퍼
   */
  const mockChain = (options: MockChainOptions = {}) => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: options.selectData ?? options.insertData ?? null,
        error: options.error ?? null,
      }),
    };

    // Array 결과인 경우 order 메서드가 결과를 반환
    if (Array.isArray(options.selectData)) {
      chain.order = vi.fn().mockResolvedValue({
        data: options.selectData,
        error: options.error ?? null,
      });
    }

    // update/delete는 에러만 반환
    if (options.updateData !== undefined || options.deleteData !== undefined) {
      chain.eq = vi.fn().mockResolvedValue({
        data: null,
        error: options.error ?? null,
      });
    }

    mockFrom.mockReturnValue(chain);
    return chain;
  };

  return {
    client,
    mockFrom,
    mockAuth,
    mockChain,
  };
}

/**
 * 테스트용 DbCard 생성 헬퍼
 */
export function createMockDbCard(overrides?: Partial<DbCard>): DbCard {
  return {
    id: "card-1",
    board_id: "board-1",
    title: "Test Card",
    description: "Test Description",
    status: "todo",
    order: 0,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    ...overrides,
  };
}

/**
 * 테스트용 Board 생성 헬퍼
 */
export function createMockDbBoard(overrides?: Partial<{ id: string; user_id: string }>) {
  return {
    id: "board-1",
    user_id: "user-1",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    ...overrides,
  };
}

/**
 * 테스트용 User 객체
 */
export const mockUser = {
  id: "user-1",
  email: "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "2024-01-01T00:00:00Z",
};
