/**
 *  String constants for reuse.
 */
export const STRINGS: {[ key: string ]: string } = {
  FSLASH:   "/",
  MDSUFFIX: ".md"
} as const;

/**
 *  A listing of format options available by moment.js
 */
export const FORMATKEYS = [
  "M", "Mo", "MM", "MMM",         "MMMM",
  "Q", "Qo",
  "D", "Do", "DD", "DDD", "DDDo", "DDDD",
  "d", "do", "dd", "ddd", "dddd",
  "e", "E",
  "w", "wo", "ww",
  "W", "Wo", "WW",
  "Y",       "YY",                "YYYY",          "YYYYYY",
  "y",
  "N",       "NN", "NNN",         "NNNN", "NNNNN",
             "gg",                "gggg",
             "GG",                "GGGG",
  "A",
  "a",
  "H",       "HH",
  "h",       "hh",
  "k",       "kk",
  "m",       "mm",
  "s",       "ss",
  "S",       "SS", "SSS",         "SSSS", "SSSSS", "SSSSSS",
  "z",       "zz",
  "Z",       "ZZ",
  "x",
  "X"
];

/**
 * Mapping of special weekly format keys to their corresponding Moment.js
 * format strings.
 *
 * This object is the single source of truth for all supported
 * "special week" placeholders (e.g. {{MOW}}, {{MMMOW}}).
 *
 * Typing rationale:
 * - Declared as a `const` object with `as const` to preserve literal key
 *   and value types.
 * - `keyof typeof SPECIALWEEKMAP` is used to derive the `SpecialWeekKey`
 *   union type, ensuring at compile time that every supported key has
 *   a corresponding format entry.
 * - No index signature (`{ [key: string]: string }`) is used on purpose,
 *   as it would erase literal key information and break the completeness
 *   guarantee.
 *
 * Any change to this map automatically propagates to:
 * - the `SpecialWeekKey` type
 * - the `SPECIALWEEKKEYS` list
 * - all consumers relying on these keys
 *
 * This design makes missing or mismatched special week formats
 * impossible at compile time.
 */
export const SPECIALWEEKMAP = {
  MOW:    "M",
  MoW:    "Mo",
  MMOW:   "MM",
  MMMOW:  "MMM",
  MMMMOW: "MMMM"
} as const;

/**
 * Union type of all supported special week format keys.
 *
 * This type is derived directly from {@link SPECIALWEEKMAP} using
 * `keyof typeof`, making the map the single source of truth.
 *
 * As a result:
 * - Only keys that actually exist in `SPECIALWEEKMAP` are allowed.
 * - Adding or removing entries in the map automatically updates this type.
 * - Mismatches between declared keys and available formats are impossible
 *   at compile time.
 */

export type SpecialWeekKey = keyof typeof SPECIALWEEKMAP;

/**
 * Runtime list of all supported special week format keys.
 *
 * This array is derived from {@link SPECIALWEEKMAP} and therefore always
 * reflects its current set of keys.
 *
 * Typing notes:
 * - The array is typed as `SpecialWeekKey[]` to restrict its elements to
 *   valid keys of `SPECIALWEEKMAP`.
 * - The type assertion is required because `Object.keys()` returns `string[]`
 *   and cannot preserve literal key types.
 *
 * This constant is intended for runtime checks (e.g. `includes()`) while
 * keeping compile-time guarantees in sync with the underlying map.
 */
export const SPECIALWEEKKEYS = Object.keys(
  SPECIALWEEKMAP
) as SpecialWeekKey[];