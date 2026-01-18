// mocks

// imports <für das erste describe>
import   path               from "path";
import { fileURLToPath    } from "url";
import { moment           } from "obsidian";
import { SpecialWeekKey, 
         SPECIALWEEKKEYS, 
         SPECIALWEEKMAP   } from "../../lib/actions/constants";
import { resolved, 
         patterns         } from "../../lib/actions/execute.default";

/**
 * Test suite for the `resolved` function.
 *
 * Ensures that patterns are correctly transformed into their resolved string
 * representations, for both standard Moment.js formats and special week keys.
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {
  describe("Testing resolved", () => {
    test("Function exists and is callable", () => {
      expect(typeof resolved).toBe("function");
    });

    test("Resolves standard Moment.js formats", () => {
      const now = moment("2026-01-17");
      const pttrns = patterns("{{YYYY}}-{{MM}}-{{DD}}");
      resolved(now, pttrns);

      pttrns.forEach((p) => {
        expect(p.resolved).toBe(now.format(p.format));
      });
    });

    test("Resolves SpecialWeekKeys correctly", () => {
      const now = moment("2026-01-17"); // Saturday
      const pttrns: Array<{ key: string; format: string; resolved?: string }> = SPECIALWEEKKEYS.map((key) => ({ key: `{{${key}}}`, format: key }));

      resolved(now, pttrns);

      pttrns.forEach((p) => {
        const cday = now.day();
        const delta = cday < 1 ? 6 : cday - 1;
        const frstday = moment(now).add(-delta, "days");
        const expected = frstday.format(SPECIALWEEKMAP[p.format as SpecialWeekKey]);
        expect(p.resolved).toBe(expected);
      });
    });

    test("Leaves unknown patterns unresolved", () => {
      const now = moment();
      const pttrns = [{ key: "{{UNKNOWN}}", format: "UNKNOWN" }];
      resolved(now, pttrns);
      expect(pttrns[0].resolved).toBeUndefined();
    });

    test("Mixed standard and special patterns", () => {
      const now = moment("2026-01-17");
      const pttrns = [
        { key: "{{YYYY}}", format: "YYYY" },
        { key: "{{MOW}}", format: "MOW" },
      ];
      resolved(now, pttrns);

      expect(pttrns[0].resolved).toBe(now.format("YYYY"));

      const cday = now.day();
      const delta = cday < 1 ? 6 : cday - 1;
      const frstday = moment(now).add(-delta, "days");
      expect(pttrns[1].resolved).toBe(frstday.format(SPECIALWEEKMAP["MOW"]));
    });

    test("SpecialWeekKeys resolve correctly for all weekdays", () => {
      // map of weekday numbers to moment dates in the same week
      const weekdays = {
        0: "2026-01-18", // Sunday
        1: "2026-01-12", // Monday
        2: "2026-01-13", // Tuesday
        3: "2026-01-14", // Wednesday
        4: "2026-01-15", // Thursday
        5: "2026-01-16", // Friday
        6: "2026-01-17", // Saturday
      };

      Object.entries(weekdays).forEach(([wd, date]) => {
        const now = moment(date);
        const pttrns: Array<{ key: string; format: string; resolved?: string }> = SPECIALWEEKKEYS.map((key) => ({ key: `{{${key}}}`, format: key }));

        resolved(now, pttrns);

        pttrns.forEach((p) => {
          const cday = now.day();
          const delta = cday < 1 ? 6 : cday - 1;
          const frstday = moment(now).add(-delta, "days");
          const expected = frstday.format(SPECIALWEEKMAP[p.format as SpecialWeekKey]);
          expect(p.resolved).toBe(expected);
        });
      });
    });

  });
});
