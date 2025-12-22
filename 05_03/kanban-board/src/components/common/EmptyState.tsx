interface EmptyStateProps {
  message: string;
}

/**
 * 빈 상태 메시지 컴포넌트
 * 데이터가 없을 때 표시하는 안내 문구
 */
export function EmptyState({ message }: EmptyStateProps) {
  return <p className="text-center text-gray-400 py-8">{message}</p>;
}
