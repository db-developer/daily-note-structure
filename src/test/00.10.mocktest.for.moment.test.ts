// src/test/00.10.mocktest.for.moment.test.ts

// imports <for the tests>
import   path            from "path";
import { fileURLToPath } from "url";
import { moment        } from "obsidian";

/**
 * Tests for verifying that the moment import (mock or real) behaves correctly.
 * Focus:
 *  - The import produces an object that can be called as a function.
 *  - Instances can be created using moment("datestring").
 *  - Instances have a working .format() method.
 *  - Optional: check basic date manipulation methods like .day() and .add().
 */
describe( `Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  describe("Testing moment mock / import", () => {

    test("should import moment successfully", () => {
      expect(moment).toBeDefined();
      expect(typeof moment).toBe("function");
    });

/*    
    test("should expose moment.Moment type on moment", () => {
      expect(moment.Moment).toBeDefined();
      expect(typeof moment.Moment).toBe("function");

      const m = moment("2026-01-17");
      expect(m instanceof moment.Moment).toBe(true);
    });    
*/

    test("should create a moment instance from a date string", () => {
      const m = moment("2026-01-17");
      expect(m).toBeDefined();
      expect(typeof m.format).toBe("function");
    });

    test("should return correct YYYY format", () => {
      const m = moment("2026-01-17");
      expect(m.format("YYYY")).toBe("2026");
    });

    test("should have day() method returning a number", () => {
      const m = moment("2026-01-17");
      const d = m.day();
      expect(typeof d).toBe("number");
    });

    test("should have add() method returning a moment instance", () => {
      const m = moment("2026-01-17");
      const m2 = m.add(1, "days");
      expect(m2).toBeDefined();
      expect(typeof m2.format).toBe("function");
    });

  });

});
