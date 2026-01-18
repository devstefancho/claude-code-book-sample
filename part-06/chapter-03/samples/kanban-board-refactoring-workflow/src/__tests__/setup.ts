import "@testing-library/jest-dom";
import { vi } from "vitest";

// Supabase 클라이언트 글로벌 모킹
vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(),
}));
