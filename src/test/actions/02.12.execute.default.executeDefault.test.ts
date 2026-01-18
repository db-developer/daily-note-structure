// src/test/02.12.execute.default.executeDefault.test.ts

// imports <for the tests>
import   path            from "path";
import { fileURLToPath } from "url";
import { App, TFile, normalizePath } from "obsidian";

// imports <for the first describe>
import { executeDefault } from "../../lib/actions/execute.default";
import { DailyNoteStructurePluginSettings } from "../../lib/settings";

/**
 * Tests for executeDefault function
 * Ensures that executeDefault runs without throwing errors
 * and properly handles parsed structures from settings.
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  describe("Testing executeDefault", () => {

    test("should run without errors for empty structure", async () => {
      const app = new App();
      const settings: DailyNoteStructurePluginSettings = {
        structure: "[]", // empty structure
      } as any;

      await expect(executeDefault(app, settings)).resolves.not.toThrow();
    });

    test("should run without errors for a valid structure", async () => {
      const app = new App();
      const settings: DailyNoteStructurePluginSettings = {
        structure: JSON.stringify([
          { namepattern: "file1.md", type: "FILE" },
          { namepattern: "folder1", type: "FOLDER", children: [] },
          { namepattern: "file2.md", type: "FILE" }
        ])
      } as any;

      await expect(executeDefault(app, settings)).resolves.not.toThrow();
    });

    test("should return gracefully if structure JSON is invalid", async () => {
      const app = new App();
      const settings: DailyNoteStructurePluginSettings = {
        structure: "{ invalid json }"
      } as any;

      await expect(executeDefault(app, settings)).resolves.not.toThrow();
    });

  });

});