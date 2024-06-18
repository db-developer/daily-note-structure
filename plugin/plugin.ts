import { App, Plugin, PluginSettingTab, Setting, addIcon }    from 'obsidian';
import { executeDefault }                                     from "../actions"
import { I18N }                                               from "../i18n";
import { SVG, setDefaultSVGAttributes }                       from "../utils";
import { DailyNoteStructurePluginSettings, DEFAULT_SETTINGS } from "../settings";

/**
 *  Class DailyNoteStructurePluginTab
 */
class DailyNoteStructurePluginTab extends PluginSettingTab {
  /* CSS class to be used by the ribbon action icon */
  static #ribbonHTMLClass = "dly-nt-strct-action-ribbon-class";
  /* */
  #plugin: DailyNoteStructurePlugin;

  /**
   *  Constructor of DailyNoteStructurePluginTab
   * 
   *  @param {App}                      app 
   *  @param {DailyNoteStructurePlugin} plugin 
   */
	constructor( app: App, plugin: DailyNoteStructurePlugin ) {
		super( app, plugin );
		this.#plugin = plugin;
	}

  /**
   *  Called to display the setting tab GUI
   */
	display(): void {
		const { containerEl } = this;
            containerEl.empty();

		new Setting( containerEl )
        .setName( I18N( "Hide obsidians daily notes icon." ))
        .setDesc( I18N( "Hides obsidians default icon for daily notes." ))
        .addToggle( toggle => toggle.setValue( this.#plugin.settings.hideClassicDailiesIcon )
                                    .onChange(( value ) => {
                                                this.#plugin.settings.hideClassicDailiesIcon = value;
                                                this.#plugin.saveData( this.#plugin.settings );
                                                this.refresh();
                                    }));
		new Setting( containerEl )
        .setName( I18N( "Hide the plugins daily notes icon." ))
        .setDesc( I18N( "Hides the plugins icon for daily notes." ))
        .addToggle( toggle => toggle.setValue( this.#plugin.settings.hidePluginsDailiesIcon )
                                    .onChange(( value ) => {
                                                this.#plugin.settings.hidePluginsDailiesIcon = value;
                                                this.#plugin.saveData( this.#plugin.settings );
                                                this.refresh();
                                    }));
    const structureEl = new Setting( containerEl )
        .setName( I18N( "Describe the daily notes structure." ))
        .setDesc( I18N( "Insert a json description of the 'daily notes structure'" ))
        .addTextArea(( area ) => {
                      area.inputEl.setAttribute( "rows", "20" );
                      area.inputEl.setAttribute( "cols", "60" );
                      area.setValue( this.#plugin.settings.structure )
                          .onChange(( value ) => {
                                      try { 
                                        JSON.parse( value );
                                        structureEl.settingEl.classList.remove( "error" );
                                      }
                                      catch( e ) {
                                        structureEl.settingEl.classList.add( "error" );
                                      }
                                      finally {
                                        this.#plugin.settings.structure = value;
                                        this.#plugin.saveData( this.#plugin.settings );
                                      }
                            })
                    });
    try { 
      JSON.parse( this.#plugin.settings.structure );
      structureEl.settingEl.classList.add( "dly-nt-strct-sttngs-strct" );
    } catch( error ) { 
      structureEl.settingEl.classList.add( "dly-nt-strct-sttngs-strct" );
      structureEl.settingEl.classList.add( "error" );
    }
}

  /**
   *  Initialize a GUI refresh.
   */
  refresh() { this.#plugin.updateStyle()}
}

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
export class DailyNoteStructurePlugin extends Plugin {
  /* CSS class to be added to Obsidians body element for hiding obsidians 'daily note' default icon */
  static #bodyDefaultHTMLClass = "dly-nt-strct-no-daily-deflt-icon";
  /* CSS class to be added to Obsidians body element for hiding the plugins 'daily note structure' icon */
  static #bodyPluginHTMLClass = "dly-nt-strct-no-daily-plugin-icon";
  /* CSS class to be used by the ribbon action icon */
  static #ribbonHTMLClass = "dly-nt-strct-action-ribbon-class";
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
		this.#ribbonElement = this.addRibbonIcon( DailyNoteStructurePlugin.#ribbonName, I18N( "Create a daily note within its folder structure." ), ( evt: MouseEvent ) => {
      executeDefault( this.app, this.settings );
    });
		// Perform additional things with the ribbon
		this.#ribbonElement.addClass( this.ribbonHTMLClass );
    const elements = this.#ribbonElement.getElementsByTagName( SVG );
    for ( let i = 0; i < elements.length; ++i ) {
          setDefaultSVGAttributes( elements[i]);
    }
  }

  /**
   *  Return the plugins body CSS class to hide Obsidians 'Daily Note" default icon.
   */
  get bodyDefaultHTMLClass(): string { return DailyNoteStructurePlugin.#bodyDefaultHTMLClass }

  /**
   *  Return the plugins body CSS class to hide the plugins 'Daily Note Structure" icon.
   */
  get bodyPluginHTMLClass(): string { return DailyNoteStructurePlugin.#bodyPluginHTMLClass }

  /**
   *  Return the plugins action button
   */
  get ribbonElement(): HTMLElement { return this.#ribbonElement }

  /**
   *  Return the plugins action button CSS class
   */
  get ribbonHTMLClass(): string { return DailyNoteStructurePlugin.#ribbonHTMLClass }

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

    // Call for updating all styles, to match the settings
    this.updateStyle();
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

    // Call for updating all styles, to match the settings
    this.updateStyle();
  }

  /**
   *  Called upon unloading the plugin
   */
  onunload() { }

  // update the styles (at the start, or as the result of a settings change)
  updateStyle() {
    document.body.classList.toggle( this.bodyDefaultHTMLClass, this.settings.hideClassicDailiesIcon );
    document.body.classList.toggle( this.bodyPluginHTMLClass,  this.settings.hidePluginsDailiesIcon );
  }
}