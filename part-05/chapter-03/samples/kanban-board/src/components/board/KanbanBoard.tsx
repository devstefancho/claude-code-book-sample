"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from "./Column";
import { Card as CardComponent } from "./Card";
import { CardFormModal } from "@/components/modals/CardFormModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { useKanbanStore } from "@/lib/store";
import { useCardFormModal, useConfirmModal } from "@/hooks";
import { COLUMNS } from "@/lib/constants";
import type { Card, CardStatus } from "@/types";

/**
 * 칸반 보드 루트 컴포넌트
 * DndContext, 3개 컬럼, 모달 상태 관리
 */
export function KanbanBoard() {
  const { columns, deleteCard, moveCard, reorderCard, loadBoard, isLoading, error, clearError } =
    useKanbanStore();

  // 보드 로드
  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  // 드래그 센서 설정 (마우스, 터치, 키보드)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이동 후 드래그 시작 (클릭과 구분)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 드래그 상태
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  // 모달 상태 (Custom Hooks)
  const cardFormModal = useCardFormModal();
  const confirmModal = useConfirmModal();

  // 드래그 시작
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;

    // 드래그 중인 카드 찾기
    for (const status in columns) {
      const column = columns[status as CardStatus];
      const card = column.cards.find((card) => card.id === activeId);
      if (card) {
        setActiveCard(card);
        break;
      }
    }
  };

  // 드래그 종료
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // 카드가 속한 컬럼 찾기
    let sourceStatus: CardStatus | null = null;
    let targetStatus: CardStatus | null = null;

    for (const status in columns) {
      const column = columns[status as CardStatus];
      if (column.cards.some((card) => card.id === activeId)) {
        sourceStatus = status as CardStatus;
      }
      // overId가 컬럼 ID인지 확인
      if (status === overId) {
        targetStatus = status as CardStatus;
      }
      // overId가 카드 ID인지 확인
      if (column.cards.some((card) => card.id === overId)) {
        targetStatus = status as CardStatus;
      }
    }

    if (!sourceStatus) return;

    // 같은 컬럼 내에서 이동
    if (sourceStatus === targetStatus && activeId !== overId) {
      const column = columns[sourceStatus];
      const oldIndex = column.cards.findIndex((card) => card.id === activeId);
      const newIndex = column.cards.findIndex((card) => card.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderCard(activeId, newIndex);
      }
    }
    // 다른 컬럼으로 이동
    else if (targetStatus && sourceStatus !== targetStatus) {
      const targetColumn = columns[targetStatus];
      const targetOrder = targetColumn.cards.length; // 마지막에 추가
      moveCard(activeId, targetStatus, targetOrder);
    }

    // 드래그 종료 후 activeCard 초기화
    setActiveCard(null);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">보드를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 에러 토스트 */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex justify-between items-center">
          <span>{error}</span>
          <button onClick={clearError} className="text-red-500 hover:text-red-700 font-medium">
            닫기
          </button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveCard(null)}
      >
        {/* 보드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((columnDef) => {
            const column = columns[columnDef.id];
            return (
              <Column
                key={column.id}
                column={column}
                onAddCard={() => cardFormModal.openCreate(column.id)}
                onEditCard={cardFormModal.openEdit}
                onDeleteCard={confirmModal.open}
              />
            );
          })}
        </div>

        {/* 카드 폼 모달 */}
        <CardFormModal
          isOpen={cardFormModal.isOpen}
          onClose={cardFormModal.close}
          mode={cardFormModal.mode}
          card={cardFormModal.selectedCard}
          status={cardFormModal.targetStatus}
        />

        {/* 삭제 확인 모달 */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={confirmModal.close}
          onConfirm={() => confirmModal.confirm(deleteCard)}
          title="카드 삭제"
          message="정말 이 카드를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        />

        {/* 드래그 오버레이 - 마우스를 따라다니는 카드 */}
        <DragOverlay>
          {activeCard ? (
            <div className="cursor-grabbing">
              <CardComponent card={activeCard} onEdit={() => {}} onDelete={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
