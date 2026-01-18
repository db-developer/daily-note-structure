import { App,
         MarkdownRenderer,
         Plugin,
         Setting                           } from "obsidian";
// import bootstrap translation function first
import { I18N                              } from "../../bootstrap";
import type { PluginSettingsRenderContext,
              PluginSettingsSubTab,
              PluginSettingsSubTabIdMap    } from "ts-obsidian-ui-settings";
import { DailyNoteStructurePluginSettings  } from "../../settings";

// Define a constant for the sub-tab ID
const UI = "userinterface" as const;

// Make the UISettingsSubTab available by defining its ID in the global module
declare module "ts-obsidian-ui-settings" {
  interface PluginSettingsSubTabIdMap {
    [UI]: true;
  }
}

export class UISettingsSubTab implements PluginSettingsSubTab<DailyNoteStructurePluginSettings> {
  // Define the unique ID for this sub-tab in case we need it elsewhere
  // TODO: Check if required. Remove if not!
  public readonly id: keyof PluginSettingsSubTabIdMap = UI;
  // TODO: Do wie need an init method?
  public app!: App;
  /**
   * The header text for the General Settings sub-tab as
   * required by the PluginSettingsSubTab interface.
   * 
   * Note:
   * - Implemented as a getter to allow for dynamic localization.
   * @returns The localized header string.
   */
  public get header(): string { return I18N("settings.tab.userinterface")}
  /**
   * Renders the content of the General Settings sub-tab.
   * Required by the PluginSettingsSubTab interface.
   * @param context The rendering context providing necessary utilities and data.
   */
  public render(context: PluginSettingsRenderContext<DailyNoteStructurePluginSettings>): void {
    const { containerEl, settings, saveSettings, plugin } = context;

    containerEl.empty();
    containerEl.addClass("dns-full-height");

    const html = containerEl.createDiv({
      cls: "dns-plugin-html",
    });

    const markdown = I18N("settings.tab.userinterface.ribbons");
    html.empty();
    MarkdownRenderer.render(
      this.app, markdown, html, "", plugin
    );
  }
}