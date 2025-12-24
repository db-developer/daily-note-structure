import { Setting }          from "obsidian";
import { CSSCLS }           from "../../css";
import { I18N }             from "../../i18n";
import { BR, DIV }          from "../../html";

const RIBBONS_AND_BUTTONS                 = "Ribbons and Buttons";
const HOW_TO_TOGGLE_RIBBON_BUTTONS_0      = "HOW_TO_TOGGLE_RIBBON_BUTTONS_0";
const HOW_TO_TOGGLE_RIBBON_BUTTONS_0_DFLT = `
As of v1.1.0 of Obsidian, the Obsidians ribbon can be customized via Obsidians 'settings'. 
On the left side select 'Appearence', then scroll on the right side, down to 'Interface'. 
Find 'Ribbon menu configuration' and click on the button 'manage'.
`;
const HOW_TO_TOGGLE_RIBBON_BUTTONS_1      = "HOW_TO_TOGGLE_RIBBON_BUTTONS_1";
const HOW_TO_TOGGLE_RIBBON_BUTTONS_1_DFLT = `
This is the place where Obsidians button for its default app 'daily notes' and the 
plugins button for creating a 'daily folder structure' can be toggled on or off.
`;

/**
 *  Render the plugin settings sub tab, which presents ribbon settings.
 * 
 *  @param  {HTMLElement} containerEl - A container element, which will be used to
 *                                      render and display the ribbon settings.
 */
export function render( containerEl: HTMLElement ) {
  const descriptn = document.createDocumentFragment();
        descriptn.append(
          descriptn.createEl( DIV, undefined, ( div: HTMLDivElement ) => { 
            div.addClass( CSSCLS.DESCRIPTION );
            div.addClass( CSSCLS.SMALL )
            let translation = I18N( HOW_TO_TOGGLE_RIBBON_BUTTONS_0 );
            if ( translation === HOW_TO_TOGGLE_RIBBON_BUTTONS_0 ) {
                 translation = HOW_TO_TOGGLE_RIBBON_BUTTONS_0_DFLT;
            }
            div.append( translation );
            div.append( descriptn.createEl( BR ));
            translation = I18N( HOW_TO_TOGGLE_RIBBON_BUTTONS_1 );
            if ( translation === HOW_TO_TOGGLE_RIBBON_BUTTONS_1 ) {
                 translation = HOW_TO_TOGGLE_RIBBON_BUTTONS_1_DFLT;
            }
            div.append( translation );
          })
        );

  const settingE1 = new Setting( containerEl );
        settingE1.setClass( CSSCLS.PLG_SETTINGS_TEXT );
        settingE1.nameEl.addClass( CSSCLS.H1 );
        settingE1.setName( I18N( RIBBONS_AND_BUTTONS ));

  const settingE2 = new Setting( containerEl );
        settingE2.setClass( CSSCLS.PLG_SETTINGS_CONTROL );
        settingE2.setName( I18N( "Toggle ribbon buttons on and off" ))
                 .setDesc( descriptn );
}