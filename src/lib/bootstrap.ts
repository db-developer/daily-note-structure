import { I18NService } from "ts-obsidian-i18n";
import { RESOURCES   } from "./i18n";

export { I18NService } from "ts-obsidian-i18n";
export const I18N = I18NService.init({resources: RESOURCES, fallbackLanguage: "en"});
