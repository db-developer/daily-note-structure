// src/test/02.11.execute.default.parseStructure.test.ts

import   path            from "path";
import { fileURLToPath } from "url";
import { vi, beforeEach, afterEach } from "vitest";

// Mocks
import { App } from "obsidian";

// Imports NACH Mocks
import * as Execute from "../../lib/actions/execute.default";

/**
 * Tests for parseStructure
 * Focus is on:
 *  - Correctly parsing valid JSON strings
 *  - Returning empty array on invalid JSON
 *  - Returning empty array if parsed object is not an array
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Testing parseStructure", () => {

    test("should import parseStructure successfully", () => {
      expect(Execute.parseStructure).toBeDefined();
      expect(typeof Execute.parseStructure).toBe("function");
    });

    test("should parse valid JSON array string correctly", () => {
      const json = '[{"namepattern":"file1.md","type":"FILE"},{"namepattern":"folder1","type":"FOLDER"}]';
      const result = Execute.parseStructure(json);
      expect(result).toEqual([
        { namepattern: "file1.md", type: "FILE" },
        { namepattern: "folder1", type: "FOLDER" }
      ]);
    });

    test("should return empty array on invalid JSON string", () => {
      const json = '{invalid json}';
      const result = Execute.parseStructure(json);
      expect(result).toEqual([]);
    });

    test("should return empty array if parsed object is not an array", () => {
      const json = '{"namepattern":"file1.md","type":"FILE"}'; // Object instead of array
      const result = Execute.parseStructure(json);
      expect(result).toEqual([]);
    });

    test("should handle empty string gracefully", () => {
      const json = '';
      const result = Execute.parseStructure(json);
      expect(result).toEqual([]);
    });

  });

});
