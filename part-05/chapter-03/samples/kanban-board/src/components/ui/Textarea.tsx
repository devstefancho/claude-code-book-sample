import { clsx } from "clsx";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  showCharCount?: boolean;
}

/**
 * 레이블과 문자 수 카운터를 포함하는 텍스트 영역 컴포넌트
 */
export function Textarea({
  label,
  error,
  showCharCount = false,
  className,
  required,
  id,
  maxLength,
  value,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${label.replace(/\s+/g, "-")}`;
  const currentLength = value ? String(value).length : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {showCharCount && maxLength && (
          <span className="text-xs text-gray-500">
            {currentLength} / {maxLength}
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        className={clsx(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors resize-none",
          {
            "border-red-500 focus:ring-red-500": error,
            "border-gray-300 focus:ring-blue-500 focus:border-blue-500": !error,
          },
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        required={required}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
