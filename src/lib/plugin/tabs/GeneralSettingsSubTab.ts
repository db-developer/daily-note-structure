import { App,
         MarkdownRenderer                  } from "obsidian";
// import bootstrap translation function first
import { I18N                              } from "../../bootstrap";
import type { PluginSettingsRenderContext,
              PluginSettingsSubTab,
              PluginSettingsSubTabIdMap    } from "ts-obsidian-ui-settings";
import { DailyNoteStructurePluginSettings  } from "../../settings";
import { rollupReplace                     } from "../../utils"

// Define a constant for the sub-tab ID
const GENERAL = "general" as const;

// Make the GeneralSettingsSubTab available by defining its ID in the global module
declare module "ts-obsidian-ui-settings" {
  interface PluginSettingsSubTabIdMap {
    [GENERAL]: true;
  }
}

export class GeneralSettingsSubTab implements PluginSettingsSubTab<DailyNoteStructurePluginSettings> {
  // Define the unique ID for this sub-tab in case we need it elsewhere
  // TODO: Check if required. Remove if not!
  public readonly id: keyof PluginSettingsSubTabIdMap = GENERAL;
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
  public get header(): string { return I18N("settings.tab.general")}
  /**
   * Renders the content of the General Settings sub-tab.
   * Required by the PluginSettingsSubTab interface.
   * @param context The rendering context providing necessary utilities and data.
   */
  public render(context: PluginSettingsRenderContext<DailyNoteStructurePluginSettings>): void {
    const { containerEl, settings, saveSettings, plugin } = context;

    containerEl.empty();
    containerEl.addClass("dns-full-height");

    const name        = rollupReplace(__PLUGIN_NAME__,        "Plugin");
    const description = rollupReplace(__PLUGIN_DESCRIPTION__, "");
    const version     = rollupReplace(__PLUGIN_VERSION__,     "unknown");
    const author      = rollupReplace(__PLUGIN_AUTHOR__,      "unknown");
    const authorUrl   = rollupReplace(__PLUGIN_AUTHOR_URL__,  "");
    const repository  = rollupReplace(__PLUGIN_REPOSITORY__,  "");
    const readme      = rollupReplace(__PLUGIN_README_MD__,   "");

    const metaContainer = containerEl.createDiv({
      cls: "dns-general-meta, dns-plugin-html",
    });

    metaContainer.createEl("h2", {
      cls: "plugin-settings-title",
      text: name,
    });

    if (description) {
      metaContainer.createEl("p", { text: description });
    }

    const metaList = metaContainer.createEl("ul");

    metaList.createEl("li", {
      text: `Version: ${version}`,
    });

    const authorItem = metaList.createEl("li");
    authorItem.appendText("Von: ");

    if (authorUrl) {
      authorItem.createEl("a", {
        text: author,
        href: authorUrl,
      });
    } else {
      authorItem.appendText(author);
    }

    if (repository) {
      const repoItem = metaList.createEl("li");
      repoItem.appendText("Repository: ");
      repoItem.createEl("a", {
        text: repository,
        href: repository,
      });
    }

    metaContainer.createEl("br");

    if (readme) {
      const readmeContainerWrap = containerEl.createDiv({
        cls: "dns-general-readme-container",
      });

      const readmeContainer = readmeContainerWrap.createDiv({
        cls: "dns-plugin-html",
      });

      readmeContainer.empty();
      MarkdownRenderer.render(
        this.app, readme, readmeContainer, "", plugin
      );
    }
  }

}