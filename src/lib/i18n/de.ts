import type { I18NResource } from "ts-obsidian-i18n";
import type { I18NKeyMap   } from "./types";
import { rollupReplace     } from "../utils";

const TOGGLE_RIBBON_BTNS = rollupReplace( __PLUGIN_SETTINGS_RIBBONS_HELP_DE__,       "Toggle Ribbon Buttons DE" );
const NAMEPATTERN_CTXHLP = rollupReplace( __PLUGIN_SETTINGS_NAMEPATTERN_CTXHLP_DE__, "Name Pattern DE" );
const TEMPLATE_CTXHLP    = rollupReplace( __PLUGIN_SETTINGS_TEMPLATE_CTXHLP_DE__,    "Template DE"     );
const TYPE_CTXHLP        = rollupReplace( __PLUGIN_SETTINGS_TYPE_CTXHLP_DE__,        "Type DE"         );

/**
 * Language resource object for a specific locale.
 * (German translation resource)
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
export const de: I18NResource<I18NKeyMap> = {
  "error.fail.create.file": "Die folgende Datei konnte nicht erzeugt werden:",
  "error.fail.create.file.content": "Eine Datei wurde ohne Inhalt erstellt.",
  "error.fail.create.folder": "Der folgende Ordner konnte nicht erzeugt werden:",
  "error.fail.parse.settings.structure": "Das Parsen der in den Plugin-Settings festgelegten Struktur schlug fehl.",
  "error.missing.template.file": "Das folgende Template fehlt:",
  "error.settings.structure.unknown.type": "Die Eigenschaft 'structure' in den Plugin-Einstellungen enthält einen unbekannten 'type'.",
  "error.settings.structure.must.be.array": "Die Eigenschaft 'structure' in den Plugin-Einstellungen muss ein Array enthalten.",
  "error.settings.structure.invalid": "Fehlerhafte JSON structure",
  "settings.tab.general": "Allgemein",
  "settings.tab.general.heading": "Daily Notes Struktur",
  "settings.tab.general.infotext.1": "Technische Beschreibung des 'daily notes structure' formats mittels JSON",
  "settings.tab.general.infotext.2": "Dies lässt sich wie folgt in JSON Ordner- und JSON Datei-Beschreibungen übersetzen",
  "settings.tab.general.infotext.3": "Das JSON Wurzelelement muss ein Array sein, da die Struktur mit den 'Kindknoten' des Wurzelknotens beginnt.",
  "settings.tab.structure": "Struktur",
  "settings.tab.structure.button.add.root": "Root-Element hinzufügen",
  "settings.tab.structure.ctxhlp.default": "",
  "settings.tab.structure.ctxhlp.namepattern": NAMEPATTERN_CTXHLP,
  "settings.tab.structure.ctxhlp.template": TEMPLATE_CTXHLP,
  "settings.tab.structure.ctxhlp.type": TYPE_CTXHLP,
  "settings.tab.userinterface": "UI",
  "settings.tab.userinterface.ribbons": TOGGLE_RIBBON_BTNS,
  "tooltip.create.daily.note.structure": "Erzeuge eine 'Daily Note' mit Ordnerstruktur"
};
