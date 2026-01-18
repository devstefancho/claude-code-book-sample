"use client";

import { useState, useCallback } from "react";
import type { Card, CardStatus } from "@/types";

interface CardFormModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  selectedCard?: Card;
  targetStatus?: CardStatus;
}

interface UseCardFormModalReturn {
  isOpen: boolean;
  mode: "create" | "edit";
  selectedCard?: Card;
  targetStatus?: CardStatus;
  openCreate: (status: CardStatus) => void;
  openEdit: (card: Card) => void;
  close: () => void;
}

/**
 * 카드 폼 모달 상태 관리 Hook
 * - 생성/수정 모드 전환
 * - 모달 열기/닫기
 */
export function useCardFormModal(): UseCardFormModalReturn {
  const [state, setState] = useState<CardFormModalState>({
    isOpen: false,
    mode: "create",
    selectedCard: undefined,
    targetStatus: undefined,
  });

  const openCreate = useCallback((status: CardStatus) => {
    setState({
      isOpen: true,
      mode: "create",
      selectedCard: undefined,
      targetStatus: status,
    });
  }, []);

  const openEdit = useCallback((card: Card) => {
    setState({
      isOpen: true,
      mode: "edit",
      selectedCard: card,
      targetStatus: undefined,
    });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return {
    isOpen: state.isOpen,
    mode: state.mode,
    selectedCard: state.selectedCard,
    targetStatus: state.targetStatus,
    openCreate,
    openEdit,
    close,
  };
}
