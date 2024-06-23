import { SettingSubTabs }                   from "../../settings";
import { AbstractDailyNoteStructurePlugin } from "../abstract";
import { render as renderGeneral }          from "./general";
import { render as renderRibbon  }          from "./ribbon";

/**
   *  Will display the plugins settings "sub" tab.
   *  @param  {string} tabId
   */
export function renderTab( plugin: AbstractDailyNoteStructurePlugin, containerEl: HTMLElement ) {
		switch ( plugin.settings.tabid.toLocaleLowerCase()) {
             case SettingSubTabs.Ribbons:
                  renderRibbon( containerEl );
                  break;
             case SettingSubTabs.General:
             default:
                  renderGeneral( plugin, containerEl );
    }
	}
