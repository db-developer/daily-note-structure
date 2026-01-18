// src/test/02.02.execute.default.resolve.test.ts

// imports <for the tests>
import   path            from "path";
import { fileURLToPath } from "url";
import { moment        } from "obsidian";

// imports <for the first describe>
import { resolve }       from "../../lib/actions/execute.default";

/**
 * Tests for resolving all {{format}} patterns in a namepattern string.
 * Focus is correctness, completeness, and proper replacement order:
 *  - Patterns are correctly replaced with Moment.js date components.
 *  - Special week patterns (e.g., {{MOW}}, {{MMMOW}}) are resolved relative to first day of the week.
 *  - Multiple patterns in one string are processed in sequence.
 *  - Strings with no patterns remain unchanged.
 *  - Repeated patterns are replaced multiple times as expected.
 */
describe( `Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  describe("Testing resolve", () => {

    test("should import resolve function successfully", () => {
      expect(resolve).toBeDefined();
      expect(typeof resolve).toBe("function");
    });

    test("should return input string unchanged if no patterns", () => {
      const input = "simple-note.md";
      const output = resolve(input, moment("2026-01-17"));
      expect(output).toBe(input);
    });

    test("should replace a single standard pattern", () => {
      const input = "note-{{YYYY}}.md";
      const output = resolve(input, moment("2026-01-17"));
      expect(output).toBe("note-2026.md");
    });

    test("should replace multiple patterns in order", () => {
      const input = "note-{{YYYY}}-{{MM}}-{{DD}}.md";
      const output = resolve(input, moment("2026-01-17"));
      expect(output).toBe("note-2026-01-17.md");
    });

    test("should handle repeated patterns correctly", () => {
      const input = "note-{{YYYY}}-{{YYYY}}.md";
      const output = resolve(input, moment("2026-01-17"));
      expect(output).toBe("note-2026-2026.md");
    });

    test("should resolve special week patterns correctly", () => {
      const input = "week-{{MOW}}.md";
      const output = resolve(input, moment("2026-01-17")); // Saturday
      expect(output).toBe("week-1.md"); // first day of week is Monday
    });

    test("should handle combination of standard and special patterns", () => {
      const input = "week-{{MOW}}-{{YYYY}}.md";
      const output = resolve(input, moment("2026-01-17"));
      expect(output).toBe("week-1-2026.md");
    });

    test("should handle empty string gracefully", () => {
      const input = "";
      const output = resolve(input, moment("2026-01-17"));
      expect(output).toBe("");
    });

    test("should use pattern.key if pattern cannot be resolved", () => {
      const input = "note-{{UNKNOWN}}.md";
      const output = resolve(input, moment("2026-01-17"));
      // pattern is not in FORMATKEYS or SPECIALWEEKKEYS, so resolved is undefined
      expect(output).toBe("note-{{UNKNOWN}}.md");
    });

  });
});