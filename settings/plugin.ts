/**
 *  Interface DailyNoteStructurePluginSettings
 *  defines which plugin settings are expected to be available.
 */
export interface DailyNoteStructurePluginSettings {
  hideClassicDailiesIcon: boolean;
  hidePluginsDailiesIcon: boolean;
  structure: string;
  tabid: string;
}

/**
 *  Object literal, which defines a set of default values for
 *  all properties defined by DailyNoteStructurePluginSettings.
 */
export const DEFAULT_SETTINGS: DailyNoteStructurePluginSettings = {
	hideClassicDailiesIcon: false,
  hidePluginsDailiesIcon: false,
  structure: "",
  tabid: "general"
}

/**
 *  Defines a set of sub-tabs, that can be found on the plugins settings tabs
 */
export enum SettingSubTabs {
  General = "general",
  Ribbons = "ribbons"
}
