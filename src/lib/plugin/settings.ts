import { App, PluginSettingTab }            from "obsidian";
import { CSSCLS }                           from "../css";
import { DIV, NAV }                         from "../html";
import { I18N }                             from "../i18n";
import { SettingSubTabs }                   from "../settings";
import { AbstractDailyNoteStructurePlugin } from "./abstract";
import { renderTab }                        from "./tabs";

/**
 *  Class DailyNoteStructurePluginTab
 */
export class DailyNoteStructurePluginTab extends PluginSettingTab {
  /* Back-reference to enable accessing the plugin*/
  #plugin: AbstractDailyNoteStructurePlugin;

  /* HTML container element for displaying content, depending on the selected tab */
  #tab!: HTMLElement;

  /**
   *  Constructor of DailyNoteStructurePluginTab
   * 
   *  @param {App}                      app 
   *  @param {DailyNoteStructurePlugin} plugin 
   */
	constructor( app: App, plugin: AbstractDailyNoteStructurePlugin ) {
		super( app, plugin );
		this.#plugin = plugin;
	}

  /**
   *  Called to display the setting tab GUI
   */
	display(): void {
		const { containerEl } = this;
            containerEl.empty();

    const tabBar = containerEl.createEl( NAV, { cls: CSSCLS.PLG_SETTINGS_TAB_BAR });

    for( const tabId in SettingSubTabs ) {
         const tabElem = tabBar.createEl( DIV,  { cls: CSSCLS.PLG_SETTINGS_TAB });
                         tabElem.createEl( DIV, { cls: CSSCLS.PLG_SETTINGS_TAB_NAME, text: I18N( tabId )});

         if ( this.#plugin.settings.tabid.toLocaleLowerCase() === tabId.toLocaleLowerCase()) {
              tabElem.addClass( CSSCLS.PLG_SETTINGS_ACTIVE_TAB );
         }

         tabElem.addEventListener( "click", () => {
            this.#plugin.settings.tabid = tabId.toLocaleLowerCase();
            this.#plugin.saveData( this.#plugin.settings );

            // @ts-ignore
            for ( const tabEl of tabBar.children ) {
                  tabEl.removeClass( CSSCLS.PLG_SETTINGS_ACTIVE_TAB );
            }
            tabElem.addClass( CSSCLS.PLG_SETTINGS_ACTIVE_TAB );

            this.#tab.empty();
            renderTab( this.#plugin, this.#tab );            
        });
    }
    this.#tab = containerEl.createDiv({ cls: CSSCLS.PLG_SETTINGS_PAGE });
    this.#tab.empty();
    renderTab( this.#plugin, this.#tab ); 
  }
}
