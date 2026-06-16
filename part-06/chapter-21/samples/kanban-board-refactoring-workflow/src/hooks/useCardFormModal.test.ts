import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCardFormModal } from "./useCardFormModal";
import type { Card } from "@/types";

describe("useCardFormModal", () => {
  const mockCard: Card = {
    id: "card-1",
    title: "Test Card",
    description: "Test Description",
    status: "todo",
    order: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  describe("초기 상태", () => {
    it("isOpen이 false로 시작한다", () => {
      const { result } = renderHook(() => useCardFormModal());
      expect(result.current.isOpen).toBe(false);
    });

    it("mode가 create로 시작한다", () => {
      const { result } = renderHook(() => useCardFormModal());
      expect(result.current.mode).toBe("create");
    });

    it("selectedCard가 undefined로 시작한다", () => {
      const { result } = renderHook(() => useCardFormModal());
      expect(result.current.selectedCard).toBeUndefined();
    });

    it("targetStatus가 undefined로 시작한다", () => {
      const { result } = renderHook(() => useCardFormModal());
      expect(result.current.targetStatus).toBeUndefined();
    });
  });

  describe("openCreate", () => {
    it("isOpen을 true로 설정한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openCreate("todo");
      });

      expect(result.current.isOpen).toBe(true);
    });

    it("mode를 create로 설정한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openCreate("in-progress");
      });

      expect(result.current.mode).toBe("create");
    });

    it("targetStatus를 설정한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openCreate("done");
      });

      expect(result.current.targetStatus).toBe("done");
    });

    it("selectedCard를 undefined로 초기화한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      // 먼저 edit 모드로 열기
      act(() => {
        result.current.openEdit(mockCard);
      });

      // 그 다음 create 모드로 열기
      act(() => {
        result.current.openCreate("todo");
      });

      expect(result.current.selectedCard).toBeUndefined();
    });
  });

  describe("openEdit", () => {
    it("isOpen을 true로 설정한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openEdit(mockCard);
      });

      expect(result.current.isOpen).toBe(true);
    });

    it("mode를 edit로 설정한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openEdit(mockCard);
      });

      expect(result.current.mode).toBe("edit");
    });

    it("selectedCard를 설정한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openEdit(mockCard);
      });

      expect(result.current.selectedCard).toEqual(mockCard);
    });

    it("targetStatus를 undefined로 초기화한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      // 먼저 create 모드로 열기
      act(() => {
        result.current.openCreate("todo");
      });

      // 그 다음 edit 모드로 열기
      act(() => {
        result.current.openEdit(mockCard);
      });

      expect(result.current.targetStatus).toBeUndefined();
    });
  });

  describe("close", () => {
    it("isOpen을 false로 설정한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openCreate("todo");
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it("나머지 상태는 유지한다", () => {
      const { result } = renderHook(() => useCardFormModal());

      act(() => {
        result.current.openEdit(mockCard);
      });

      act(() => {
        result.current.close();
      });

      expect(result.current.mode).toBe("edit");
      expect(result.current.selectedCard).toEqual(mockCard);
    });
  });
});
