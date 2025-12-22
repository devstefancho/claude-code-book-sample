"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ColumnHeader } from "./ColumnHeader";
import { AddCardButton } from "./AddCardButton";
import { Card } from "./Card";
import { EmptyState } from "@/components/common/EmptyState";
import type { Column as ColumnType, Card as CardType } from "@/types";

interface ColumnProps {
  column: ColumnType;
  onAddCard: () => void;
  onEditCard: (card: CardType) => void;
  onDeleteCard: (cardId: string) => void;
}

/**
 * 컬럼 컴포넌트 (드롭 가능)
 * 헤더, 카드 추가 버튼, 카드 리스트 렌더링
 */
export function Column({ column, onAddCard, onEditCard, onDeleteCard }: ColumnProps) {
  // 카드를 order로 정렬
  const sortedCards = [...column.cards].sort((a, b) => a.order - b.order);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <section
      ref={setNodeRef}
      className={`bg-gray-100 rounded-lg p-4 min-h-[500px] flex flex-col transition-colors ${
        isOver ? "bg-blue-50 border-2 border-blue-300" : ""
      }`}
      aria-label={`${column.title} 칼럼`}
    >
      <ColumnHeader title={column.title} count={column.cards.length} status={column.id} />

      <AddCardButton onClick={onAddCard} columnTitle={column.title} />

      {/* 카드 리스트 (정렬 가능) */}
      <SortableContext
        items={sortedCards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 flex-1">
          {sortedCards.length === 0 ? (
            <EmptyState message="카드가 없습니다" />
          ) : (
            sortedCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onEdit={() => onEditCard(card)}
                onDelete={() => onDeleteCard(card.id)}
              />
            ))
          )}
        </div>
      </SortableContext>
    </section>
  );
}
