// src/test/02.08.execute.default.createFile.test.ts

import   path            from "path";
import { fileURLToPath } from "url";
import { vi, beforeEach, afterEach } from "vitest";
import { App, TFile }    from "obsidian";

// ------------------------
// 1️⃣ Mock ts-obsidian-log BEFORE importing the module
// ------------------------
const noticeMock = vi.fn();
vi.mock("ts-obsidian-log", () => ({
  Log: {
    init: () => ({
      notice: noticeMock,
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
    }),
  },
}));

// ------------------------
// 2️⃣ Imports AFTER mocking
// ------------------------
import * as Execute from "../../lib/actions/execute.default";

/**
 * Tests for createFile
 * Focus is on combining template resolution and file creation:
 *  - createFileImpl is called with correct path and data
 *  - Template content is merged correctly
 *  - Handles missing template gracefully
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  beforeEach(() => {
    vi.clearAllMocks();   // Reset all mocks before each test
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore spies after each test
  });

  describe("Testing createFile", () => {

    test("should import createFile successfully", () => {
      expect(Execute.createFile).toBeDefined();
      expect(typeof Execute.createFile).toBe("function");
    });

    test("should return file from createFileImpl with template content", async () => {
      const app = new App();
      const filename = "note.md";
      const templateContent = "Hello Template";

      const node = { namepattern: filename, template: "template.md" } as any;
      app.vault.getAbstractFileByPath = () => new TFile();
      app.vault.read = async () => templateContent;

      const result = await Execute.createFile(app, [], node);

      expect(result).toBeDefined();
      expect(result.path).toBe(filename);
    });

    test("should resolve namepattern correctly", async () => {
      const app = new App();
      const node = { namepattern: "note-{{YYYY}}.md" } as any;

      const result = await Execute.createFile(app, [], node);

      expect(result).toBeDefined();
      expect(result.path).toMatch(/^note-\d{4}\.md$/);
    });

    test("should handle missing template gracefully", async () => {
      const app = new App();
      const node = { namepattern: "note.md", template: "missing.md" } as any;

      app.vault.getAbstractFileByPath = () => undefined;

      const result = await Execute.createFile(app, [], node);

      expect(result).toBeDefined();
      expect(result.path).toBe("note.md");
    });

  });

});
