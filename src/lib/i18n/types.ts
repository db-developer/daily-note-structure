import "ts-obsidian-i18n";

/**
 * Compile-time registry of all valid i18n translation keys.
 *
 * This object lists **all translation keys** used in the plugin.  
 * The values are markers (`true`) and have **no runtime meaning**.  
 * 
 * It is primarily used for:
 * 1. Deriving the TypeScript type `I18NKeyMap` via `typeof I18NKeys`.
 * 2. Ensuring that all i18n resources provide a translation for each key.
 * 
 * Example usage:
 * ```ts
 * import type { I18NKeyMap } from './types';
 * 
 * type Key = keyof I18NKeyMap; // "error.fail.create.file" | "header.ribbons.and.buttons" | ...
 * ```
 */
export const I18NKeys = {
  "error.fail.create.file": true,
  "error.fail.create.file.content": true,
  "error.fail.create.folder": true,
  "error.fail.parse.settings.structure": true,
  "error.missing.template.file": true,
  "error.settings.structure.unknown.type": true,
  "error.settings.structure.must.be.array": true,
  "error.settings.structure.invalid": true,
  "settings.tab.general": true,
  "settings.tab.general.heading": true,
  "settings.tab.general.infotext.1": true,
  "settings.tab.general.infotext.2": true,
  "settings.tab.general.infotext.3": true,
  "settings.tab.structure": true,
  "settings.tab.structure.ctxhlp.default": true,
  "settings.tab.structure.ctxhlp.namepattern": true,
  "settings.tab.structure.ctxhlp.template": true,
  "settings.tab.structure.ctxhlp.type": true,
  "settings.tab.structure.button.add.root": true,
  "settings.tab.userinterface": true,
  "settings.tab.userinterface.ribbons": true,
  "tooltip.create.daily.note.structure": true
} as const;

/**
 * TypeScript type representing all valid i18n translation keys.
 *
 * This type is derived from `I18NKeys` and includes **exactly the same keys**.
 * It is used for compile-time type checking, ensuring that:
 * - all language resources provide translations for every key, and
 * - only valid keys can be passed to translation functions.
 *
 * Example usage:
 * ```ts
 * import type { I18NKeyMap } from './types';
 * type Key = keyof I18NKeyMap; // "error.fail.create.file" | "header.ribbons.and.buttons" | ...
 * ```
 */
export type I18NKeyMap = typeof I18NKeys;

/**
 * Module augmentation for `ts-obsidian-i18n` to register the plugin's translation keys.
 *
 * This declares that the external module now includes the `I18NKeyMap` type,
 * which corresponds to all keys defined in `I18NKeys`.  
 * It enables TypeScript to enforce key-safety when using i18n functions
 * provided by `ts-obsidian-i18n`.
 *
 * Example usage:
 * ```ts
 * import type { I18NKey, I18NResourcesByLang } from 'ts-obsidian-i18n';
 * 
 * const key: I18NKey<I18NKeyMap> = "error.fail.create.file"; // ✅ allowed
 * const wrong: I18NKey<I18NKeyMap> = "not.a.key";            // ❌ TypeScript error
 * ```
 */
declare module "ts-obsidian-i18n" {
  type I18NKeyMap = typeof I18NKeys;
}