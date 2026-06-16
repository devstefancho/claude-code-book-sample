import { z } from "zod";
import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from "./constants";

/**
 * 카드 데이터 검증 스키마
 */
export const cardSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력하세요")
    .max(TITLE_MAX_LENGTH, `제목은 ${TITLE_MAX_LENGTH}자 이내로 입력하세요`)
    .trim(),
  description: z
    .string()
    .max(DESCRIPTION_MAX_LENGTH, `설명은 ${DESCRIPTION_MAX_LENGTH}자 이내로 입력하세요`)
    .trim(),
});

/**
 * 카드 폼 데이터 타입 (Zod 스키마에서 추론)
 */
export type CardFormData = z.infer<typeof cardSchema>;

/**
 * 카드 데이터 검증 함수
 * @param data - 검증할 카드 데이터
 * @returns 검증 결과 (성공 시 데이터, 실패 시 에러 목록)
 */
export function validateCardData(data: unknown) {
  return cardSchema.safeParse(data);
}
