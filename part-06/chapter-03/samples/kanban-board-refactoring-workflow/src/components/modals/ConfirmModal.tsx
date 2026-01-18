"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

/**
 * 확인 다이얼로그 모달
 * 주로 삭제와 같은 위험한 작업에 사용
 */
export function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} closeOnBackdrop={false}>
      <div className="space-y-4">
        <p className="text-gray-700">{message}</p>

        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="button" variant="danger" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}
