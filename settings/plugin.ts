/**
 *  Interface DailyNoteStructurePluginSettings
 *  defines which plugin settings are expected to be available.
 */
export interface DailyNoteStructurePluginSettings {
  hideClassicDailiesIcon: boolean;
  hidePluginsDailiesIcon: boolean;
  structure: string;
}

/**
 *  Object literal, which defines a set of default values for
 *  all properties defined by DailyNoteStructurePluginSettings.
 */
export const DEFAULT_SETTINGS: DailyNoteStructurePluginSettings = {
	hideClassicDailiesIcon: false,
  hidePluginsDailiesIcon: false,
  structure: ""
}
