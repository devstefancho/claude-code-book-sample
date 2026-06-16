"use client";

import { useState, useEffect, useCallback } from "react";
import { cardSchema } from "@/lib/validation";
import type { Card } from "@/types";

interface CardFormErrors {
  title?: string;
  description?: string;
}

interface UseCardFormOptions {
  mode: "create" | "edit";
  card?: Card;
  isOpen: boolean;
}

interface UseCardFormReturn {
  title: string;
  description: string;
  errors: CardFormErrors;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  validate: () =>
    | { success: true; data: { title: string; description: string } }
    | { success: false };
  reset: () => void;
}

/**
 * 카드 폼 상태 관리 Hook
 * - 폼 필드 상태 관리
 * - Zod 기반 유효성 검증
 * - 모달 열림/닫힘 시 자동 초기화
 */
export function useCardForm({ mode, card, isOpen }: UseCardFormOptions): UseCardFormReturn {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<CardFormErrors>({});

  // 편집 모드일 때 초기 데이터 설정 또는 모달 닫힘 시 리셋
  useEffect(() => {
    if (isOpen && mode === "edit" && card) {
      setTitle(card.title);
      setDescription(card.description);
    } else if (isOpen && mode === "create") {
      setTitle("");
      setDescription("");
    }
    setErrors({});
  }, [mode, card, isOpen]);

  const validate = useCallback(() => {
    const result = cardSchema.safeParse({ title, description });

    if (!result.success) {
      const fieldErrors: CardFormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as "title" | "description";
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return { success: false as const };
    }

    setErrors({});
    return { success: true as const, data: result.data };
  }, [title, description]);

  const reset = useCallback(() => {
    setTitle("");
    setDescription("");
    setErrors({});
  }, []);

  return {
    title,
    description,
    errors,
    setTitle,
    setDescription,
    validate,
    reset,
  };
}
