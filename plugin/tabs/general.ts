import { Setting }                          from "obsidian";
import { CSSCLS }                           from "../../css";
import { I18N }                             from "../../i18n";
import { BR, DIV, SPAN }                    from "../../html";
import { AbstractDailyNoteStructurePlugin } from "../abstract";


export function render( plugin: AbstractDailyNoteStructurePlugin, containerEl: HTMLElement,  ) {
  const descriptn = document.createDocumentFragment();
        descriptn.append(
          descriptn.createEl( DIV, undefined, ( div: HTMLDivElement ) => { 
            div.addClass( CSSCLS.DESCRIPTION );
            div.append( I18N( "Insert a json description of the 'daily notes structure'" ));
            div.append( descriptn.createEl( BR ));
          }),
          descriptn.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
            div.addClass( CSSCLS.DECLARATION );
            div.append(
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.HEADER );
                div.append(
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.KEYWORD );
                    span.append( "interface" );
                  }),
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.CLASSNAME );
                    span.append( " FolderStructure " );
                  }),
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.CODEBLOCK );
                    span.append( "{" );
                  }),
                );
              }),
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.BODY );
                div.append(
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.KEY );
                        span.append( "type" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"file\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( " | " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"folder\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( ";" );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.KEY );
                        span.append( "namepattern" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TYPE );
                        span.append( "string" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( ";" );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.KEY );
                        span.append( "template" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( "?: " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TYPE );
                        span.append( "string" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( ";" );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.KEY );
                        span.append( "description" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( "?: " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TYPE );
                        span.append( "string" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( ";" );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.KEY );
                        span.append( "children" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( "?: " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.CLASSNAME );
                        span.append( "FolderStructure" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( "[]" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( ";" );
                      })
                    );
                  })
                );
              }),
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.FOOTER );
                div.append(
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.CODEBLOCK );
                    span.append( "}" );
                  })
                );
              })
            );
          }),
          descriptn.createEl( DIV, undefined, ( div: HTMLDivElement ) => { 
            div.addClass( CSSCLS.DESCRIPTION );
            div.append( I18N( "This translates to JSON folder and JSON file descriptions as follows" ));
          }),
          descriptn.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
            div.addClass( CSSCLS.DECLARATION );
            div.append(
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.HEADER );
                div.append(
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.CODEBLOCK );
                    span.append( "{" );
                  })
                );
              }),
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.BODY );
                div.append(
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"type\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"folder\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( "," );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"namepattern\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"{{YYYY}}\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( "," );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"template\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"Path/to/Template/folder_note_template.md\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( "," );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"children\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( "[" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.CLASSNAME );
                        span.append( " ... any number of further JSON file or folder object literals ... " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( "]" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( "," );
                      })
                    );
                  })
                );
              }),
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.FOOTER );
                div.append(
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.CODEBLOCK );
                    span.append( "}" );
                  })
                );
              })
            );
          }),
          descriptn.createEl( BR ),
          descriptn.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
            div.addClass( CSSCLS.DECLARATION );
            div.append(
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.HEADER );
                div.append(
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.CODEBLOCK );
                    span.append( "{" );
                  })
                );
              }),
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.BODY );
                div.append(
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"type\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"file\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( "," );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"namepattern\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"{{YYYY}}-{{MM}}-{{DD}}" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.setAttribute( "style", "color: red" );
                        span.append( ".md" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( "," );
                      })
                    );
                  }),
                  div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                    div.addClass( CSSCLS.CODE );
                    div.append(
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"template\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.OPERATOR );
                        span.append( ": " );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.STRING );
                        span.append( "\"Path/to/Template/file_daily_template.md\"" );
                      }),
                      div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                        span.addClass( CSSCLS.TOKEN );
                        span.append( "," );
                      })
                    );
                  }),
                );
              }),
              div.createEl( DIV, undefined, ( div: HTMLDivElement ) => {
                div.addClass( CSSCLS.FOOTER );
                div.append(
                  div.createEl( SPAN, undefined, ( span: HTMLSpanElement ) => {
                    span.addClass( CSSCLS.CODEBLOCK );
                    span.append( "}" );
                  })
                );
              }),
            );
          }),
          descriptn.createEl( DIV, undefined, ( div: HTMLDivElement ) => { 
            div.addClass( CSSCLS.DESCRIPTION );
            div.append( I18N( "Because the JSON structure starts with 'children' of the root folder, the JSON root element must be an Array." ));
          })
        );

  const settingEl = new Setting( containerEl );
        settingEl.setClass( CSSCLS.PLG_SETTINGS_TEXT )
        settingEl.setName( I18N( "Daily Notes Structure" ))
                 .setDesc( descriptn );

  const strctreEl = new Setting( containerEl )
        strctreEl.addTextArea(( area ) => {
                                area.inputEl.setAttribute( "rows", "20" );
                                area.inputEl.setAttribute( "cols", "60" );
                                area.setValue( plugin.settings.structure )
                                    .onChange(( value ) => {
                                                try { 
                                                  JSON.parse( value );
                                                  strctreEl.settingEl.classList.remove( CSSCLS.ERROR );
                                                }
                                                catch( e ) {
                                                  strctreEl.settingEl.classList.add( CSSCLS.ERROR );
                                                }
                                                finally {
                                                  plugin.settings.structure = value;
                                                  plugin.saveData( plugin.settings );
                                                }
                                      })
                              });
  try {
    JSON.parse( plugin.settings.structure );
    strctreEl.settingEl.classList.add( CSSCLS.PLG_SETTINGS_STRUCTURE );
  } catch( error ) { 
    strctreEl.settingEl.classList.add( CSSCLS.PLG_SETTINGS_STRUCTURE );
    strctreEl.settingEl.classList.add( CSSCLS.ERROR );
  }                 
}
