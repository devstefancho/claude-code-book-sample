"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/types";
import { DESCRIPTION_PREVIEW_LENGTH } from "@/lib/constants";

interface CardProps {
  card: CardType;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * 카드 컴포넌트 (드래그 가능)
 * 제목, 설명 (일부), 수정/삭제 버튼 표시
 */
export function Card({ card, onEdit, onDelete }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const truncatedDescription =
    card.description.length > DESCRIPTION_PREVIEW_LENGTH
      ? card.description.slice(0, DESCRIPTION_PREVIEW_LENGTH) + "..."
      : card.description;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow group cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-0" : "opacity-100"
      }`}
      aria-label={`카드: ${card.title}`}
    >
      {/* 카드 제목 */}
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{card.title}</h3>

      {/* 카드 설명 */}
      {card.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3 whitespace-pre-wrap">
          {truncatedDescription}
        </p>
      )}

      {/* 액션 버튼 (hover 시 또는 모바일에서 항상 표시) */}
      <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="카드 수정"
        >
          수정
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="카드 삭제"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
