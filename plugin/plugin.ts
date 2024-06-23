import { addIcon }                                  from "obsidian";
import { executeDefault }                           from "../actions"
import { CSSCLS }                                   from "../css";
import { I18N }                                     from "../i18n";
import { SVG, setDefaultSVGAttributes }             from "../utils";
import { DailyNoteStructurePluginSettings,
         DEFAULT_SETTINGS }                         from "../settings";
import { AbstractDailyNoteStructurePlugin }         from "./abstract";
import { DailyNoteStructurePluginTab }              from "./settings";

/**
 *  https://lucide.dev/icons/calendar-fold in v0.315.0 currently unsupported by obsidian
 *  TODO: Remove this, if https://docs.obsidian.md/Plugins/User+interface/Icons states support.
 */
const CALENDARFOLDSVG =(() => {
  let    data  = '<path d="M8 2v4"/><path d="M16 2v4"/>';
         data += '<path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"/>';
         data += '<path d="M3 10h18"/><path d="M15 22v-4a2 2 0 0 1 2-2h4"/>';
  return data;
})();

/**
 *  Class DailyNoteStructurePlugin
 */
export class DailyNoteStructurePlugin extends AbstractDailyNoteStructurePlugin {
  /* Identifier of the ribbon icon */
  static #ribbonName = "calendar-fold";

  /* Left side ribbon action icon */
  #ribbonElement: HTMLElement;

  /* Plugin settings */
	#settings: DailyNoteStructurePluginSettings;

  /**
   *  Adds the plugins ribbon(s) to obsidians GUI
   */
  #addRibbons() {
    // Add yet unsupported icon
    addIcon( DailyNoteStructurePlugin.#ribbonName, CALENDARFOLDSVG );

		// Create the plugins action button in the left ribbon.
    const tooltip = I18N( "Create a daily note within its folder structure." );
		this.#ribbonElement = this.addRibbonIcon( DailyNoteStructurePlugin.#ribbonName, tooltip, ( evt: MouseEvent ) => {
      executeDefault( this.app, this.settings );
    });
    
		// Perform additional things with the ribbon
		this.#ribbonElement.addClass( CSSCLS.PLG_SETTINGS_ACTION_BTN );
    const elements = this.#ribbonElement.getElementsByTagName( SVG );
    for ( let i = 0; i < elements.length; ++i ) {
          setDefaultSVGAttributes( elements[i]);
    }
  }

  /**
   *  Return the plugins action button
   */
  get ribbonElement(): HTMLElement { return this.#ribbonElement }

  /**
   *  Returns the plugins internal settings.
   */
  get settings(): DailyNoteStructurePluginSettings { return this.#settings }

  /**
   *  Simply load the plugins settings file (data.json) and make it available.
   */
  async loadSettings() { this.#settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())}

  /**
   *  Called when the data.json file is modified on disk externally from Obsidian.
   *  This usually means that a Sync service or external program has modified the plugin settings.
   */
  async onExternalSettingsChange() {
    // Re-initialize settings
    await this.loadSettings();
  }

  /**
   *  Called on plugin activation and on any obsidian start with activated plugin.
   */
  async onload() {
    // Initialize settings
    await this.loadSettings();

    // Adds a settings tab so the user can configure aspects of the plugin
    this.addSettingTab( new DailyNoteStructurePluginTab( this.app, this ));

    // Adds the plugins buttons the the ribbons
    this.#addRibbons();
  }

  /**
   *  Called upon unloading the plugin
   */
  onunload() { }
}