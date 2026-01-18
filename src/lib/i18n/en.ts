import type { I18NResource } from "ts-obsidian-i18n";
import type { I18NKeyMap   } from "./types";
import { rollupReplace     } from "../utils";

const TOGGLE_RIBBON_BTNS = rollupReplace( __PLUGIN_SETTINGS_RIBBONS_HELP_EN__,       "Toggle Ribbon Buttons EN" );
const NAMEPATTERN_CTXHLP = rollupReplace( __PLUGIN_SETTINGS_NAMEPATTERN_CTXHLP_EN__, "Name Pattern EN" );
const TEMPLATE_CTXHLP    = rollupReplace( __PLUGIN_SETTINGS_TEMPLATE_CTXHLP_EN__,    "Template EN"     );
const TYPE_CTXHLP        = rollupReplace( __PLUGIN_SETTINGS_TYPE_CTXHLP_EN__,        "Type EN"         );

/**
 * Language resource object for a specific locale.
 * (English translation resource)
 *
 * This object provides translations for **all keys defined in `I18NKeys`**.  
 * TypeScript ensures at compile time that every key is present and correctly typed.  
 *
 * Each property corresponds to a single translation key, and its value is the
 * localized string for this language.  
 *
 * Example usage:
 * ```ts
 * import type { I18NKeyMap, I18NResource } from './types';
 * 
 * const de: I18NResource<I18NKeyMap> = { ... }; // German translations
 * const en: I18NResource<I18NKeyMap> = { ... }; // English translations
 * ```
 */
export const en: I18NResource<I18NKeyMap> = {
  "error.fail.create.file": "Failed to create file",
  "error.fail.create.file.content": "Failed to create file content",
  "error.fail.create.folder": "Failed to create folder",
  "error.fail.parse.settings.structure": "Failed to parse settings property 'structure'",
  "error.missing.template.file": "Missing template file",
  "error.settings.structure.unknown.type": "Settings property 'structure' contains unknown type:",
  "error.settings.structure.must.be.array": "Settings property 'structure' must be of type 'array'",
  "error.settings.structure.invalid": "Invalid JSON structure",
  "settings.tab.general": "General",
  "settings.tab.general.heading": "Daily Notes Structure",
  "settings.tab.general.infotext.1": "Technical description of the 'daily notes structure' format using JSON",
  "settings.tab.general.infotext.2": "This translates to JSON folder and JSON file descriptions as follows",
  "settings.tab.general.infotext.3": "The JSON root element must be an Array, because the structure starts with 'children' of the root folder.",
  "settings.tab.structure": "Structure",
  "settings.tab.structure.button.add.root": "Add root element",
  "settings.tab.structure.ctxhlp.default": "",
  "settings.tab.structure.ctxhlp.namepattern": NAMEPATTERN_CTXHLP,
  "settings.tab.structure.ctxhlp.template": TEMPLATE_CTXHLP,
  "settings.tab.structure.ctxhlp.type": TYPE_CTXHLP,
  "settings.tab.userinterface": "UI",
  "settings.tab.userinterface.ribbons": TOGGLE_RIBBON_BTNS,
  "tooltip.create.daily.note.structure": "Create a daily note with folder structure"
};
