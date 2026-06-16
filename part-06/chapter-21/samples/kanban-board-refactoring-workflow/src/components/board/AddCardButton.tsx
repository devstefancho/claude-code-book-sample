interface AddCardButtonProps {
  onClick: () => void;
  columnTitle: string;
}

/**
 * 카드 추가 버튼 컴포넌트
 * 점선 테두리의 추가 버튼 UI
 */
export function AddCardButton({ onClick, columnTitle }: AddCardButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg p-3 mb-4 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`${columnTitle}에 카드 추가`}
    >
      + 카드 추가
    </button>
  );
}
