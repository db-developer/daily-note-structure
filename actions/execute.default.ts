import { App, TFile, moment }               from "obsidian";
import * as path                            from "path";
import { I18N, locale }                     from "../i18n";
import * as log                             from "../log";
import { DailyNoteStructurePluginSettings } from "../settings";
import { FolderStructure }                  from "../structure"

/* configure moment */
moment.locale( locale());

const STRINGS = {
  FILE:   "file",
  FOLDER: "folder"
}

/**
 *  A listing of format options available by moment.js
 */
const FORMATKEYS = [ 
  "M", "Mo", "MM", "MMM",         "MMMM",
  "Q", "Qo",
  "D", "Do", "DD", "DDD", "DDDo", "DDDD",
  "d", "do", "dd", "ddd", "dddd",
  "e", "E",
  "w", "wo", "ww",
  "W", "Wo", "WW",
  "Y",       "YY",                "YYYY",          "YYYYYY",
  "y",
  "N",       "NN", "NNN",         "NNNN", "NNNNN",
             "gg",                "gggg",
             "GG",                "GGGG",
  "A",
  "a",
  "H",       "HH",
  "h",       "hh",
  "k",       "kk",
  "m",       "mm",
  "s",       "ss",
  "S",       "SS", "SSS",         "SSSS", "SSSSS", "SSSSSS",
  "z",       "zz",
  "Z",       "ZZ",
  "x",
  "X"
];

/**
 *  A listing of format options provided by daily-note-structure
 */
const SPECIALWEEKKEYS = [ "MOW", "MoW", "MMOW", "MMMOW", "MMMMOW" ];
const SPECIALWEEKMAP: {[ key: string ]: string } =  {
  MOW:    "M",
  MoW:    "Mo",
  MMOW:   "MM",
  MMMOW:  "MMM",
  MMMMOW: "MMMM"
};

/* Setup a regular expression for matching '{{format}}' patterns */
const reg = new RegExp( "{{(\\w+)}}", "gm" );

/**
 *  Adds the property 'resolvedÄ to 'patterns'
 *  @param {typeof moment} amoment 
 *  @param patterns 
 */
function resolved( amoment: moment.Moment, patterns: Array<{[ key: string ]: string }>) { 
  patterns.forEach(( pattern ) => {
    if ( FORMATKEYS.contains( pattern.format )) {
         pattern.resolved = amoment.format( pattern.format );
    }
    else if ( SPECIALWEEKKEYS.contains( pattern.format )) {
         // Note: Sunday is 0, first day of Week is: 1
         const cday    = amoment.day();
         const delta   = cday < 1 ? 6 : cday - 1;
         const frstday = moment( amoment ).add(((-1) * delta ), "days" );
         const format  = SPECIALWEEKMAP[ pattern.format ];
         pattern.resolved = frstday.format( format );
    }
  });
}

/**
 *  Get all patterns from namepattern supported by {Moment}
 *  @param   {string}         namepattern - A name possibly containing an kind of date/time format patterns
 *  @returns {Array<string>}
 */
function patterns( namepattern: string ): Array<{[ key: string ]: string }> {
  // reset the regular expression
  reg.lastIndex = 0;
  let   match   = undefined;
  const retval  = [];
  while (( match = reg.exec( namepattern )) !== null ) {
          retval.push({ key: match[0], format: match[1]});
  }
  return retval;
}

/**
 *  Resolves a namepattern.
 *  @param   {string}         namepattern - A name possibly containing an kind of date/time format patterns
 *  @param   {moment.Moment}  amoment     - A {Moment} instance to resolve the format patterns
 *  @returns {string}
 */
function resolve( namepattern: string, amoment?: moment.Moment ): string {
  // check for date patterns in 'namepattern' and resolve them
  const pttrns = patterns( namepattern );
                 resolved( amoment ? amoment : moment(), pttrns );
        pttrns.forEach(( pattern ) => {
          const rplce = pattern.resolved ? pattern.resolved : pattern.key;
          namepattern = namepattern.replace( pattern.key, rplce );
        })
  return namepattern;
}

/**
 *  Simply creates a folder inside a vault, using the given properties.
 *  @param   {App}                app               - Obsidian app instance
 *  @param   {readonly string[]}  parents           - Predecessors of the folder
 *  @param   {string}             foldername        - Name of the folder
 *  @returns {Promise<string[]>}
 */
async function createFolderImpl( app: App, parents: readonly string[], foldername: string ): Promise<string[]> {
  const returnvalue = [ ...parents, foldername ];
  const folderpath  = path.join( ...returnvalue );
  const folder      = app.vault.getFolderByPath( folderpath.replaceAll( "\\", "/" ));
  if   ( folder ) { return Promise.resolve( returnvalue )}
  else { return app.vault.createFolder( folderpath ).then(() => { return returnvalue })}
}

/**
 *  Simply creates a file inside a vault, using the given properties.
 *  @param   {App}                app               - Obsidian app instance
 *  @param   {readonly string[]}  parents           - Parent folders of the file
 *  @param   {string}             filename          - Name of the file
 *  @param   {string}             filedata          - Content of the file
 *  @returns {Promise<TFile>}
 */
async function createFileImpl( app: App, parents: readonly string[], filename: string, filedata = "" ): Promise<TFile> {
  const filepatharr = [ ...parents, filename ];
  const filepath    = path.join( ...filepatharr );
  const file        = app.vault.getFileByPath( filepath.replaceAll( "\\", "/" ) );
  if ( file ) { return Promise.resolve( file )}
  else { return app.vault.create( filepath, filedata )}
}

/**
 *  Create a {FolderStructure} from a folder node, that will be used as 'folder note'.
 *  @param   {App}                app               - Obsidian app instance
 *  @param   {FolderStructure}    node              - A structure describing a folder.
 *  @param   {string}             node.type         - Must be of value "folder"
 *  @param   {string}             node.namepattern  - Folder name, possibly containing patterns.
 *  @param   {string}             node.template     - Filepath to a file template
 *  @param   {string}             node.description  - A description for this folder (ignored)
 *  @param   {undefined}          node.children     - Property for folders (ignored).
 *  @returns {FolderStructure} for a 'folder note' (file)
 */
function createFolderStructure( app: App, node: FolderStructure ): FolderStructure {
  return { type: "file", namepattern: node.namepattern + ".md", template: node.template }
}

/**
 *  Creates file data based on a {FolderStructure}s 'template' property.
 *  @param   {App}                app               - Obsidian app instance
 *  @param   {FolderStructure}    node              - A structure describing a folder or file.
 *  @param   {string}             node.type         - Must be of value "folder" or "file".
 *  @param   {string}             node.namepattern  - Namepattern of the "folder" or "file".
 *  @param   {string}             node.template     - Filepath to a 'file' or 'folder note' template.
 *  @param   {string}             node.description  - A description for this folder or file (ignored).
 *  @param   {undefined}          node.children     - Property for folders (ignored).
 *  @returns {string|undefined} 
 */
async function createFileData( app: App, node: FolderStructure ): Promise<string|undefined> {
  if ( ! node.template ) { return Promise.resolve( undefined )}
  else {
    const file = this.app.vault.getAbstractFileByPath( node.template );
    if ( ! ( file instanceof TFile )) {
         const error = new Error( `${ I18N( "Missing template file" )} '${ node.template }'` );
         log.notice( I18N( "Failed to create file content" ), error );
         return Promise.resolve( undefined );
    }
    else { return this.app.vault.read( file )}
  }
}

/**
 *  Create a folder with a name following a name pattern.
 *  Additionally it may create a 'folder note' and the folders children, if specified.
 *  @param   {App}                app               - Obsidian app instance
 *  @param   {readonly [string]}  parents           - The folders predecessors
 *  @param   {FolderStructure}    node              - A structure describing the folder that is to be created
 *  @param   {string}             node.type         - Must be of value "folder"
 *  @param   {string}             node.namepattern  - Filename possibly containing patterns and file suffix
 *  @param   {string}             node.template     - Filepath to a file template
 *  @param   {string}             node.description  - A description for this file (ignored)
 *  @param   {undefined}          node.children     - Property is ignored for type 'file'
 */
async function createFolder( app: App, parents: readonly string[], node: FolderStructure ) {
  const foldername  = resolve( node.namepattern );
  const newparents  = await createFolderImpl( app, parents, foldername ).then( undefined, ( error ) => {
                        log.error( error, I18N( "Failed to create folder" ) + ` '${foldername}'` );
                        return undefined;
                      });
  if ( newparents && node.template ) { createFile( app, newparents, createFolderStructure( app, node ))}
  if ( newparents && node.children ) { build( app, newparents, node.children ) }
}

/**
 *  Merges file content and file from {FolderStructure} 'node' into a resulting file.
 *  If 'node' provides a 'template' property with a valid path to a template, the referenced
 *  template will be used to fill the file with data. This feature can be used to trigger
 *  the 'templater' plugin.
 * 
 *  @param   {App}                app 
 *  @param   {readonly string[]}  parents 
 *  @param   {FolderStructure}    node              - File leaf of a folder structure
 *  @param   {string}             node.type         - Must be of value "file"
 *  @param   {string}             node.namepattern  - Filename possibly containing patterns and file suffix
 *  @param   {string}             node.template     - Filepath to a file template
 *  @param   {string}             node.description  - A description for this file (ignored)
 *  @param   {undefined}          node.children     - Property is ignored for type 'file'
 */
async function createFile( app: App, parents: readonly string[], node: FolderStructure ) {
  const filename  = resolve( node.namepattern );
  const template  = await createFileData( app, node );
  const file      = await createFileImpl( app, parents, filename, template ).then( undefined, ( error ) => {
                      log.error( error, I18N( "Failed to create file" ) + ` '${filename}'.` );
                      return undefined;
                    });
  return file;
}

/**
 *  Build a folder structure based on an array of FolderStructure nodes.
 * 
 *  @param {readonly string[]} parents
 *  @param {FolderStructure[]}  structure 
 */
function build( app: App, parents: readonly string[], structure: FolderStructure[]) {
  structure.forEach(( node: FolderStructure ) =>{
    if      ( node.type === STRINGS.FILE   ) { createFile( app, parents, node )}
    else if ( node.type === STRINGS.FOLDER ) { createFolder( app, parents, node )}
    else { log.notice( `${ I18N( "Settings property 'structure' contains unknown type:" )} '${ node.type }'` )}
  });
}

/**
 *  JSON parse the structure passed in as string.
 *  @param    {string}  structure - A string matching a JSON object.
 *  @returns  {FolderStructure[]} depending on the validity of 'structure'.
 */
function parseStructure( structure: string ): FolderStructure[] {
  let obj = undefined;
  try { obj= JSON.parse( structure )}
  catch( error ) { log.notice( I18N( "Failed to parse settings property 'structure'" ), error )}
  if ( ! Array.isArray( obj )) { 
       log.notice( I18N( "Settings property 'structure' must be of type 'array'" ));
       return [];
  }
  else return obj as FolderStructure[];
}

/**
 *  Execute plugins default action
 *  @param {App}                              app 
 *  @param {DailyNoteStructurePluginSettings} settings 
 */
export function executeDefault( app: App, settings: DailyNoteStructurePluginSettings ): void {
  const structure = parseStructure( settings.structure );
  if ( ! structure ) { return }
  else { build( app, [], structure )}
}