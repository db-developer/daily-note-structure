import { Plugin }                             from 'obsidian';
import { DailyNoteStructurePluginSettings }   from "../settings";

/**
 *  DailyNoteStructurePlugin interface
 */
export abstract class AbstractDailyNoteStructurePlugin extends Plugin {
  /**
   *  Returns the plugins settings
   */
  abstract get settings(): DailyNoteStructurePluginSettings;
  /**
   *  Reloads the plugins settings
   */
  abstract loadSettings(): void;
}