import { App,
         addIcon,
         PluginManifest                     } from "obsidian";
import { AbstractObsidianPluginWithSettings } from "ts-obsidian-plugin"
import { I18N,
         I18NService                        } from "../bootstrap";
import { executeDefault                     } from "../actions"
import { CALENDARFOLDSVG,
         SVG, 
         setDefaultSVGAttributes            } from "../utils";
import { DailyNoteStructurePluginSettings,
         DEFAULT_SETTINGS                   } from "../settings";
import { DailyNoteStructurePluginSettingTab } from "./DailyNoteStructurePluginSettingTab";

/**
 *  Class DailyNoteStructurePlugin
 */
export class DailyNoteStructurePlugin extends AbstractObsidianPluginWithSettings<
  DailyNoteStructurePluginSettings
> {
  /* Identifier of the ribbon icon */
  private static ribbonName = "calendar-fold";

  /* Left side ribbon action icon */
  private ribbon!: HTMLElement;

  public constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
    I18NService.init({ app });
  }

  public getDefaultSettings(): DailyNoteStructurePluginSettings {
    return DEFAULT_SETTINGS;
  }

  /**
   *  Adds the plugins ribbon(s) to obsidians GUI
   */
  private addRibbons() {
    // Add yet unsupported icon
    addIcon( DailyNoteStructurePlugin.ribbonName, CALENDARFOLDSVG );

		// Create the plugins action button in the left ribbon.
    const tooltip = I18N( "tooltip.create.daily.note.structure" );
		this.ribbon = this.addRibbonIcon( DailyNoteStructurePlugin.ribbonName, tooltip, ( evt: MouseEvent ) => {
      executeDefault( this.app, this.settings );
    });
    
		// Perform additional things with the ribbon
		this.ribbon.addClass( "dly-nt-strct-action-ribbon-class" );
    const elements = this.ribbon.getElementsByTagName( SVG );
    for ( let i = 0; i < elements.length; ++i ) {
          setDefaultSVGAttributes( elements[i]);
    }
  }

  /**
   *  Return the plugins action button
   */
  get ribbonElement(): HTMLElement { return this.ribbon }

  /**
   *  Called on plugin activation and on any obsidian start with activated plugin.
   */
  async onload() {
    // Initialize settings
    await this.loadSettings();

    // Adds a settings tab so the user can configure aspects of the plugin
    this.addSettingTab( new DailyNoteStructurePluginSettingTab( this.app, this ));

    // Adds the plugins buttons the the ribbons
    this.addRibbons();
  }

  /**
   *  Called upon unloading the plugin
   */
  onunload() { }
}