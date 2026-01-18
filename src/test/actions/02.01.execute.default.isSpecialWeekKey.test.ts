// mocks
// imports <für die Tests>
import { describe, test, expect } from "vitest";

// imports <für das erste describe>
import   path                from "path";
import { fileURLToPath     } from "url";
import { SPECIALWEEKMAP,
         SPECIALWEEKKEYS, 
         SpecialWeekKey    } from "../../lib/actions/constants";
import { isSpecialWeekKey  } from "../../lib/actions/execute.default";

/**
 * Test suite for the `isSpecialWeekKey` type guard.
 *
 * Ensures that only valid keys from SPECIALWEEKMAP are recognized as SpecialWeekKey,
 * and all invalid strings are correctly rejected.
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {
  describe("Testing isSpecialWeekKey", () => {
    test("Function exists and is callable", () => {
      expect(typeof isSpecialWeekKey).toBe("function");
    });

    test("Recognizes all valid SPECIALWEEKKEYS", () => {
      SPECIALWEEKKEYS.forEach((key: SpecialWeekKey) => {
        expect(isSpecialWeekKey(key)).toBe(true);
      });
    });

    test("Rejects invalid strings", () => {
      const invalidKeys = ["INVALID", "", "Mow", "mow", "123", "MMMM"]; // add any edge cases
      invalidKeys.forEach((key) => {
        expect(isSpecialWeekKey(key)).toBe(false);
      });
    });

    test("Type narrowing works", () => {
      const key: string = "MOW";
      if (isSpecialWeekKey(key)) {
        // inside this block, TS knows key is SpecialWeekKey
        const format = SPECIALWEEKMAP[key];
        expect(typeof format).toBe("string");
      }
    });
  });
});
