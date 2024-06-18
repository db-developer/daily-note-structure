import { Notice } from "obsidian";

/* String constant */
const PLUGINNAME = "Daily Note Structure:";

/**
 *  Log a debug message to the console.
 *  @param {string[]} message 
 */
export function debug( ...message: string[]) {
  console.debug( PLUGINNAME, ...message );
}

/**
 *  Log an error message to the console.
 *  @param {Error}   error 
 *  @param {string}  [message]
 */
export function error( error: Error, message?: string ) {
  if ( message ) { console.error( PLUGINNAME, message, error )}
  else { console.error( PLUGINNAME, error )}
}

/**
 *  Popup a 'Notice' and debug the message or log the error
 *  to the console.
 * 
 *  @param {string} message 
 *  @param {Error}  error 
 */
export function notice( message: string, e?: Error ) {
  if ( e ) { error( e, message )}
  else { debug( message )}
  new Notice( `${message}${ e ? "\n\r"+ e.toString(): ""}` );
}