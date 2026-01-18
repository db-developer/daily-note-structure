// src/test/02.07.execute.default.createFileData.test.ts

import   path            from "path";
import { fileURLToPath } from "url";
import { vi }            from "vitest";

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
import { createFileData } from "../../lib/actions/execute.default";
import { App, TFile }     from "obsidian";

/**
 * Tests for createFileData
 * Focus is on handling template files:
 * - Returns file content if template exists
 * - Returns undefined and logs notice if template file is missing
 * - Handles node without template gracefully
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  describe("Testing createFileData", () => {

    test("should import createFileData successfully", () => {
      expect(createFileData).toBeDefined();
      expect(typeof createFileData).toBe("function");
    });

    test("should return undefined if node.template is missing", async () => {
      const app = new App();
      const node = {} as any;

      const result = await createFileData(app, node);

      expect(result).toBeUndefined();
    });

    test("should return file content if template exists", async () => {
      const app = new App();
      const templatePath = "template.md";
      const fileContent = "Hello Template";

      // Mock vault.getAbstractFileByPath and read
      const mockFile = new TFile();
      mockFile.path = templatePath;

      app.vault.getAbstractFileByPath = (p: string) =>
        p === templatePath ? mockFile : undefined;
      app.vault.read = async (file: TFile) => fileContent;

      const node = { template: templatePath } as any;
      const result = await createFileData(app, node);

      expect(result).toBe(fileContent);
    });

  });

});
