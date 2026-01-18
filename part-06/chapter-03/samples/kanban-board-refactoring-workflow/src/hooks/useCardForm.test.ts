import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCardForm } from "./useCardForm";
import type { Card } from "@/types";

describe("useCardForm", () => {
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
    it("create 모드에서 빈 값으로 초기화한다", () => {
      const { result } = renderHook(() => useCardForm({ mode: "create", isOpen: true }));

      expect(result.current.title).toBe("");
      expect(result.current.description).toBe("");
      expect(result.current.errors).toEqual({});
    });

    it("edit 모드에서 card 데이터로 초기화한다", () => {
      const { result } = renderHook(() =>
        useCardForm({ mode: "edit", card: mockCard, isOpen: true })
      );

      expect(result.current.title).toBe("Test Card");
      expect(result.current.description).toBe("Test Description");
      expect(result.current.errors).toEqual({});
    });

    it("isOpen이 false면 초기화하지 않는다", () => {
      const { result } = renderHook(() =>
        useCardForm({ mode: "edit", card: mockCard, isOpen: false })
      );

      expect(result.current.title).toBe("");
      expect(result.current.description).toBe("");
    });
  });

  describe("setTitle / setDescription", () => {
    it("setTitle로 제목을 업데이트한다", () => {
      const { result } = renderHook(() => useCardForm({ mode: "create", isOpen: true }));

      act(() => {
        result.current.setTitle("New Title");
      });

      expect(result.current.title).toBe("New Title");
    });

    it("setDescription으로 설명을 업데이트한다", () => {
      const { result } = renderHook(() => useCardForm({ mode: "create", isOpen: true }));

      act(() => {
        result.current.setDescription("New Description");
      });

      expect(result.current.description).toBe("New Description");
    });
  });

  describe("validate", () => {
    it("유효한 데이터에서 success: true를 반환한다", () => {
      const { result } = renderHook(() => useCardForm({ mode: "create", isOpen: true }));

      act(() => {
        result.current.setTitle("Valid Title");
        result.current.setDescription("Valid Description");
      });

      let validateResult: ReturnType<typeof result.current.validate>;
      act(() => {
        validateResult = result.current.validate();
      });

      expect(validateResult!.success).toBe(true);
      if (validateResult!.success) {
        expect(validateResult!.data.title).toBe("Valid Title");
        expect(validateResult!.data.description).toBe("Valid Description");
      }
      expect(result.current.errors).toEqual({});
    });

    it("빈 제목에서 success: false를 반환하고 errors를 설정한다", () => {
      const { result } = renderHook(() => useCardForm({ mode: "create", isOpen: true }));

      let validateResult: ReturnType<typeof result.current.validate>;
      act(() => {
        validateResult = result.current.validate();
      });

      expect(validateResult!.success).toBe(false);
      expect(result.current.errors.title).toBeDefined();
    });

    it("검증 성공 시 errors를 초기화한다", () => {
      const { result } = renderHook(() => useCardForm({ mode: "create", isOpen: true }));

      // 먼저 에러 상태 만들기
      act(() => {
        result.current.validate();
      });
      expect(result.current.errors.title).toBeDefined();

      // 유효한 값으로 변경 후 검증
      act(() => {
        result.current.setTitle("Valid Title");
      });

      act(() => {
        result.current.validate();
      });

      expect(result.current.errors).toEqual({});
    });
  });

  describe("reset", () => {
    it("모든 필드를 초기화한다", () => {
      const { result } = renderHook(() => useCardForm({ mode: "create", isOpen: true }));

      act(() => {
        result.current.setTitle("Some Title");
        result.current.setDescription("Some Description");
        result.current.validate(); // errors 설정
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.title).toBe("");
      expect(result.current.description).toBe("");
      expect(result.current.errors).toEqual({});
    });
  });

  describe("isOpen 변경에 따른 동작", () => {
    it("모달이 열릴 때 edit 모드면 card 데이터로 초기화한다", () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useCardForm({ mode: "edit", card: mockCard, isOpen }),
        { initialProps: { isOpen: false } }
      );

      expect(result.current.title).toBe("");

      rerender({ isOpen: true });

      expect(result.current.title).toBe("Test Card");
      expect(result.current.description).toBe("Test Description");
    });

    it("모달이 열릴 때 create 모드면 빈 값으로 초기화한다", () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useCardForm({ mode: "create", isOpen }),
        { initialProps: { isOpen: false } }
      );

      act(() => {
        result.current.setTitle("Dirty Title");
      });

      rerender({ isOpen: true });

      expect(result.current.title).toBe("");
    });

    it("모달이 열릴 때 errors를 초기화한다", () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useCardForm({ mode: "create", isOpen }),
        { initialProps: { isOpen: true } }
      );

      act(() => {
        result.current.validate(); // errors 설정
      });

      expect(result.current.errors.title).toBeDefined();

      rerender({ isOpen: false });
      rerender({ isOpen: true });

      expect(result.current.errors).toEqual({});
    });
  });
});
