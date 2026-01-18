// minimal mock for ts-obsidian-log
import { vi } from "vitest";

export const Log = {
  init: () => ({
    notice: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  }),
};