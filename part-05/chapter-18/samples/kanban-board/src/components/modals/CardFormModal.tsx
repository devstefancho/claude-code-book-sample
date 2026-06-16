"use client";

import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useKanbanStore } from "@/lib/store";
import { useCardForm } from "@/hooks";
import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from "@/lib/constants";
import type { Card, CardStatus } from "@/types";

interface CardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  card?: Card;
  status?: CardStatus;
}

/**
 * 카드 생성 및 수정을 위한 통합 폼 모달
 */
export function CardFormModal({ isOpen, onClose, mode, card, status }: CardFormModalProps) {
  const { addCard, updateCard } = useKanbanStore();
  const form = useCardForm({ mode, card, isOpen });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = form.validate();
    if (!result.success) return;

    if (mode === "create" && status) {
      addCard({
        title: result.data.title,
        description: result.data.description,
        status,
      });
    } else if (mode === "edit" && card) {
      updateCard(card.id, {
        title: result.data.title,
        description: result.data.description,
      });
    }

    form.reset();
    onClose();
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={mode === "create" ? "새 카드 추가" : "카드 수정"}
      closeOnBackdrop={false}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="제목"
          value={form.title}
          onChange={(e) => form.setTitle(e.target.value)}
          error={form.errors.title}
          required
          maxLength={TITLE_MAX_LENGTH}
          placeholder="카드 제목을 입력하세요"
        />

        <Textarea
          label="설명"
          value={form.description}
          onChange={(e) => form.setDescription(e.target.value)}
          error={form.errors.description}
          maxLength={DESCRIPTION_MAX_LENGTH}
          rows={5}
          showCharCount
          placeholder="카드 설명을 입력하세요 (선택사항)"
        />

        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            취소
          </Button>
          <Button type="submit" variant="primary">
            {mode === "create" ? "추가" : "저장"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
