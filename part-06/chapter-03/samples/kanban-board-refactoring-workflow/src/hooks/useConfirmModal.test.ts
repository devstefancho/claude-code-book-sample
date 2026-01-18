import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useConfirmModal } from "./useConfirmModal";

describe("useConfirmModal", () => {
  describe("초기 상태", () => {
    it("isOpen이 false로 시작한다", () => {
      const { result } = renderHook(() => useConfirmModal());
      expect(result.current.isOpen).toBe(false);
    });

    it("targetId가 null로 시작한다", () => {
      const { result } = renderHook(() => useConfirmModal());
      expect(result.current.targetId).toBeNull();
    });
  });

  describe("open", () => {
    it("isOpen을 true로 설정한다", () => {
      const { result } = renderHook(() => useConfirmModal());

      act(() => {
        result.current.open("card-1");
      });

      expect(result.current.isOpen).toBe(true);
    });

    it("targetId를 설정한다", () => {
      const { result } = renderHook(() => useConfirmModal());

      act(() => {
        result.current.open("card-1");
      });

      expect(result.current.targetId).toBe("card-1");
    });
  });

  describe("close", () => {
    it("isOpen을 false로 설정한다", () => {
      const { result } = renderHook(() => useConfirmModal());

      act(() => {
        result.current.open("card-1");
      });

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it("targetId를 null로 설정한다", () => {
      const { result } = renderHook(() => useConfirmModal());

      act(() => {
        result.current.open("card-1");
      });

      act(() => {
        result.current.close();
      });

      expect(result.current.targetId).toBeNull();
    });
  });

  describe("confirm", () => {
    it("targetId가 있으면 콜백을 호출한다", () => {
      const { result } = renderHook(() => useConfirmModal());
      const mockCallback = vi.fn();

      act(() => {
        result.current.open("card-1");
      });

      act(() => {
        result.current.confirm(mockCallback);
      });

      expect(mockCallback).toHaveBeenCalledWith("card-1");
    });

    it("콜백 호출 후 close를 실행한다", () => {
      const { result } = renderHook(() => useConfirmModal());
      const mockCallback = vi.fn();

      act(() => {
        result.current.open("card-1");
      });

      act(() => {
        result.current.confirm(mockCallback);
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.targetId).toBeNull();
    });

    it("targetId가 null이면 콜백을 호출하지 않는다", () => {
      const { result } = renderHook(() => useConfirmModal());
      const mockCallback = vi.fn();

      act(() => {
        result.current.confirm(mockCallback);
      });

      expect(mockCallback).not.toHaveBeenCalled();
    });
  });
});
