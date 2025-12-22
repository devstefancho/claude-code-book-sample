"use client";

import { useState, useCallback } from "react";

interface UseConfirmModalReturn {
  isOpen: boolean;
  targetId: string | null;
  open: (id: string) => void;
  close: () => void;
  confirm: (onConfirm: (id: string) => void) => void;
}

/**
 * 확인 모달 상태 관리 Hook
 * - 삭제 등 확인이 필요한 액션에 사용
 */
export function useConfirmModal(): UseConfirmModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const open = useCallback((id: string) => {
    setTargetId(id);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTargetId(null);
  }, []);

  const confirm = useCallback(
    (onConfirm: (id: string) => void) => {
      if (targetId) {
        onConfirm(targetId);
        close();
      }
    },
    [targetId, close]
  );

  return {
    isOpen,
    targetId,
    open,
    close,
    confirm,
  };
}
