// imports <for the tests>
import   path            from "path";
import { fileURLToPath } from "url";

// imports <for the first describe>
import { patterns      } from "../../lib/actions/execute.default";

/**
 * Test suite for extracting all {{format}} patterns from a namepattern string.
 *
 * This suite verifies:
 * - that the function is exported and callable
 * - correct handling of strings without any patterns
 * - detection of a single {{format}} pattern
 * - detection of multiple different patterns in correct left-to-right order
 * - detection of repeated identical patterns without collapsing or deduplication
 * - full coverage and ordering guarantees in complex mixed strings
 *
 * Design assumptions validated by these tests:
 * - every syntactic occurrence of {{...}} must be detected independently
 * - pattern extraction must be lossless and preserve positional order
 *
 * Explicitly not tested here:
 * - semantic validity of the extracted format keys
 * - resolution of patterns via moment.js or custom logic
 * - interaction with resolve(), resolved(), or any filesystem-related behavior
 *
 * The tests are pure black-box tests and intentionally avoid side effects,
 * external dependencies, or temporal state.
 */
describe( `Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  describe("Testing patterns", () => {

    test("patterns is exported and callable", () => {
      expect(patterns).toBeDefined();
      expect(typeof patterns).toBe("function");
    });

    test("returns an empty array if no patterns are present", () => {
      const result = patterns("no patterns here");
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    test("detects a single pattern", () => {
      const result = patterns("{{YYYY}}");
      expect(result.length).toBe(1);
      expect(result[0]).toEqual({
        key: "{{YYYY}}",
        format: "YYYY",
      });
    });

    test("detects multiple different patterns in correct order", () => {
      const result = patterns("{{YYYY}}-{{MM}}-{{DD}}");

      expect(result.length).toBe(3);
      expect(result.map(p => p.format)).toEqual([
        "YYYY",
        "MM",
        "DD",
      ]);
    });

    test("detects repeated identical patterns individually (completeness check)", () => {
      const input = "{{YYYY}}{{YYYY}}{{YYYY}}";
      const result = patterns(input);

      expect(result.length).toBe(3);
      result.forEach(pattern => {
        expect(pattern).toEqual({
          key: "{{YYYY}}",
          format: "YYYY",
        });
      });
    });

    test("detects all patterns in a complex mixed string (full coverage check)", () => {
      const input = "{{YYYY}}-{{MM}}-{{DD}}_{{YYYY}}{{YYYY}}";
      const result = patterns(input);

      expect(result.length).toBe(5);

      expect(result.map(p => p.format)).toEqual([
        "YYYY",
        "MM",
        "DD",
        "YYYY",
        "YYYY",
      ]);

      expect(result.map(p => p.key)).toEqual([
        "{{YYYY}}",
        "{{MM}}",
        "{{DD}}",
        "{{YYYY}}",
        "{{YYYY}}",
      ]);
    });
  });
});
