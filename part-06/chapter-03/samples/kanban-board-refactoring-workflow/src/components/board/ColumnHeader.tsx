import { clsx } from "clsx";
import { STATUS_COLOR_CLASSES } from "@/lib/constants";
import type { CardStatus } from "@/types";

interface ColumnHeaderProps {
  title: string;
  count: number;
  status: CardStatus;
}

/**
 * 컬럼 헤더 컴포넌트
 * 컬럼 제목과 카드 개수 뱃지 표시
 */
export function ColumnHeader({ title, count, status }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <span
        className={clsx(
          "px-2 py-1 text-sm font-medium rounded-full border",
          STATUS_COLOR_CLASSES[status]
        )}
      >
        {count}
      </span>
    </div>
  );
}
