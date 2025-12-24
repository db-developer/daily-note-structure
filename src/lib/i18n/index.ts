import DE from "./de-DE.json";

const EMPTY = "";
const LANGUAGE = "language";
const DFLTLANG = "en";

/* A mapping between language keys and translation mappings */
const LANGUAGES: {[ key: string ]: {[ key: string ]: string }} = {
  "de": DE
}

/**
 *  Returns obsidians current locale setting
 *  @returns {sting|null}
 */
function getLocale(): string|null {
  return window.localStorage.getItem( LANGUAGE );
}

/**
 *  Returns the internationalization support for the language selected
 *  in obsidians settings.
 * 
 *  @returns {[ key: string ]: string } a key to translation mapping for
 *           the language selected in obsidians settings.
 */
function getI18NSupport():  {[ key: string ]: string } {
  const lang = getLocale() || EMPTY;
  return LANGUAGES[ lang ] || { };
}

/* 
 * Note: Obsidians Language support is static. If the language is changed, obsidian
 *       must be restarted. In case this might be changed, I18NSupport may become
 *       dynamic.
 */
/* Internationalization support for the language selected in obsidians settings. */
const I18NSUPPORT: {[ key: string ]: string } = getI18NSupport();

/**
 *  Internationalization support, which returns translations for supported languages.
 *
 *  @param   {string}  key - The phrase which is to be translated.
 *  @returns the translated {string}
 */
export function I18N( key: string ): string { return I18NSUPPORT[ key ] || key }

/**
 *  Returns the locale as set by obsidian settings page.
 *  (Required to correctly initialize 'momentjs')
 *  @returns {string} which defaults to "en"
 */
export function locale( dflt = DFLTLANG ) : string {
  const locale = getLocale();
  return locale ? locale : ( dflt || DFLTLANG );
}