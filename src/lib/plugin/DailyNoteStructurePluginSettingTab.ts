import { App                               } from "obsidian";
import { PluginSettingsTabWithSubTabs      } from "ts-obsidian-ui-settings";
import { DailyNoteStructurePlugin          } from "./DailyNoteStructurePlugin";
import { GeneralSettingsSubTab,
         StructureSettingsSubTab,
         UISettingsSubTab                  } from "./tabs";
import { DailyNoteStructurePluginSettings  } from "../settings";
import type { PluginSettingsSubTabIdMap,
              PluginSettingsSubTabRegistry } from "ts-obsidian-ui-settings";

// Make the GeneralSettingsSubTab available by defining its ID in the global module
declare module "ts-obsidian-ui-settings" {
  interface PluginSettingsSubTabIdMap { }
}

const subTabRegistry: PluginSettingsSubTabRegistry<DailyNoteStructurePluginSettings, PluginSettingsSubTabIdMap> = {
  general: new GeneralSettingsSubTab(),
  structure: new StructureSettingsSubTab(),
  userinterface: new UISettingsSubTab()
};

export class DailyNoteStructurePluginSettingTab extends PluginSettingsTabWithSubTabs<
  DailyNoteStructurePluginSettings,
  PluginSettingsSubTabIdMap
> {
  constructor(app: App, plugin: DailyNoteStructurePlugin ) {
    super(app, plugin, subTabRegistry, "general");
    // TODO: igittibäh ... mach' das weg
    (subTabRegistry.general       as any).app = app;
    (subTabRegistry.structure     as any).app = app;
    (subTabRegistry.userinterface as any).app = app;
  }
}