import      { en                  } from "./en";
import      { de                  } from "./de";
import type { I18NResourcesByLang } from "ts-obsidian-i18n";
import type { I18NKeyMap          } from "./types";

/**
 * Collection of all language resources indexed by language code.
 *
 * This object aggregates the individual language resources (`en`, `de`, etc.)
 * into a single map that can be passed to the i18n service for runtime translation.
 * TypeScript enforces that each resource provides translations for **all keys** defined
 * in `I18NKeys`.
 *
 * Example usage:
 * ```ts
 * import { resources } from './lang';
 * import { I18NService } from './i18nService';
 * 
 * I18NService.init({ resources });
 * ```
 */
export const RESOURCES: I18NResourcesByLang<I18NKeyMap> = { en, de };