import { App, TFile, moment, normalizePath } from "obsidian";
import { Log                               } from "ts-obsidian-log"
import { I18N,
         I18NService                       } from "../bootstrap";
import { STRINGS,
         FORMATKEYS,
         SPECIALWEEKKEYS,
         SpecialWeekKey,
         SPECIALWEEKMAP                    } from "./constants";
import { DailyNoteStructurePluginSettings  } from "../settings";
import { FILE, 
         FOLDER, 
         FolderStructure                   } from "../types"


/* configure moment *//* TODO! */
moment.locale(I18NService.language || /* istanbul ignore next */ undefined);

/* configure Log */
const log = Log.init();

/* Setup a regular expression for matching '{{format}}' patterns */
const reg = new RegExp( "{{(\\w+)}}", "gm" );

/**
 * Type guard to determine whether a given string is a valid `SpecialWeekKey`.
 *
 * This function checks if the input `key` exists in the {@link SPECIALWEEKKEYS}
 * array. If true, TypeScript will narrow the type of `key` to `SpecialWeekKey`,
 * allowing safe access to {@link SPECIALWEEKMAP} without casts or runtime errors.
 * 
 * Note:
 *   - ✅ 1.3.0 fully tested (02.01.execute.default.isSpecialWeekKey.test.ts)
 *
 * @param key - The string to check.
 * @returns `true` if `key` is a valid `SpecialWeekKey`, otherwise `false`.
 *
 * Usage example:
 * ```ts
 * if (isSpecialWeekKey(pattern.format)) {
 *   // pattern.format is now typed as SpecialWeekKey
 *   const format = SPECIALWEEKMAP[pattern.format];
 * }
 * ```
 */
export function isSpecialWeekKey(key: string): key is SpecialWeekKey {
  return SPECIALWEEKKEYS.includes(key as SpecialWeekKey);
}

/**
 * Resolves template patterns into actual string values based on a Moment.js date.
 *
 * This function iterates over an array of pattern objects (each with a `format` key),
 * and adds a `resolved` property to each object representing the computed string value.
 *
 * Resolution logic:
 * 1. **Standard Moment.js formats**:  
 *    If `pattern.format` is included in `FORMATKEYS`, the value is computed using
 *    `amoment.format(pattern.format)`.
 *
 * 2. **Special week keys**:  
 *    If `pattern.format` is included in `SPECIALWEEKKEYS`, it represents a week-based
 *    pattern (like "MOW", "MMMOW"). The function computes the **first day of the current
 *    week (Monday)** relative to the given date `amoment`, then formats it using the
 *    corresponding entry in `SPECIALWEEKMAP`.
 *
 *    Calculation:
 *      - `cday = amoment.day()`  // 0=Sunday, 1=Monday, …, 6=Saturday
 *      - `delta = cday < 1 ? 6 : cday - 1`  // days to subtract to reach Monday
 *      - `frstday = amoment.clone().add(-delta, "days")`
 *      - `pattern.resolved = frstday.format(SPECIALWEEKMAP[pattern.format])`
 *
 * 3. **Unknown patterns**:  
 *    If `pattern.format` is neither in `FORMATKEYS` nor `SPECIALWEEKKEYS`, the
 *    `resolved` property is left `undefined`.
 *
 * Note:
 *   - ✅ 1.3.0 fully tested (02.01.execute.default.resolved.test.ts)
 *   - TypeScript considerations:
 *     - The `patterns` array is expected to contain objects with at least:
 *       ```ts
 *         { key: string; format: string; resolved?: string }
 *       ```
 *     - `resolved` is added in-place, so no return value is produced.
 *
 * Example usage:
 * ```ts
 * const now = moment("2026-01-17");
 * const pttrns = patterns("{{YYYY}}-{{MOW}}");
 * resolved(now, pttrns);
 * // pttrns[0].resolved = "2026"
 * // pttrns[1].resolved = "1"  // first day of the week formatted as "M"
 * ```
 *
 * @param {moment.Moment} amoment - The Moment.js date (from obsidian import) used for pattern resolution.
 * @param {Array<{ key: string; format: string; resolved?: string }>} patterns - 
 *   Array of pattern objects to resolve. Each object will be mutated to include `resolved`.
 */
export function resolved(
  amoment: moment.Moment,
  patterns: Array<{ [key: string]: string }>
): void {
  patterns.forEach((pattern) => {
    if (FORMATKEYS.includes(pattern.format)) {
      pattern.resolved = amoment.format(pattern.format);
    } else if ( isSpecialWeekKey(pattern.format)) {
      const cday = amoment.day();
      const delta = cday < 1 ? 6 : cday - 1;
      const frstday = moment(amoment).add(-delta, "days");
      const format = SPECIALWEEKMAP[pattern.format];
      pattern.resolved = frstday.format(format);
    }
  });
}

/**
 * Extract all template patterns from a name pattern string.
 *
 * This function scans a given string for placeholders wrapped in double curly braces,
 * e.g., `{{YYYY}}`, `{{MM}}`, `{{DD}}`, which are intended to be replaced with dynamic
 * values such as date components or custom formats. It returns an array of objects
 * representing each found pattern, including its original key (the string matched
 * including braces) and the raw format identifier inside the braces.
 *
 * The order of patterns in the returned array corresponds to the order of appearance
 * in the input string. Duplicate patterns are preserved, enabling repeated replacements
 * if necessary.
 *
 * This function does **not** resolve the patterns to actual values; it only detects
 * and lists them. Use the `resolved()` function in conjunction with `patterns()` to
 * compute the actual string replacements.
 *
 * Completeness:
 *  - Detects all {{format}} placeholders, including all standard Moment.js formats.
 *  - Detects special weekly placeholders like {{MOW}}, {{MMMOW}}, which are mapped
 *    to the first day of the week for the specified month format.
 *  - Preserves the original order for sequential replacement to avoid accidental
 *    overwrites in multi-pattern strings.
 * 
 * Note:
 *   - ✅ 1.3.0 fully tested (02.01.execute.default.patterns.test.ts)
 *
 * @param {string} namepattern - A string potentially containing one or more template patterns.
 * @returns {Array<{ key: string; format: string }>} An array of objects, each containing:
 *   - `key`: the exact matched substring including `{{` and `}}`
 *   - `format`: the inner pattern identifier (e.g., "YYYY", "MM", "MOW")
 */
export function patterns(namepattern: string): Array<{[key: string]: string }> {
  reg.lastIndex = 0;
  let match: RegExpExecArray | null;
  const retval: Array<{ [key: string]: string }> = [];

  while ((match = reg.exec(namepattern)) !== null) {
    retval.push({ key: match[0], format: match[1] });
  }
  return retval;
}

/**
 * Resolves all template patterns in a string into their corresponding string values.
 *
 * This function scans the provided `namepattern` string for placeholders of the form
 * `{{format}}` and replaces them with the computed values based on a given Moment.js date.
 * It handles both standard Moment.js date formats and custom special week keys.
 *
 * Resolution logic:
 * 1. Extracts all patterns using `patterns(namepattern)` → returns an array of objects:
 *      { key: "{{format}}", format: "format" }
 * 2. Calls `resolved(amoment, pttrns)` which computes `pattern.resolved` for:
 *      - Standard Moment.js formats (contained in `FORMATKEYS`)
 *      - Special week keys (contained in `SPECIALWEEKKEYS` and mapped via `SPECIALWEEKMAP`)
 * 3. Replaces each pattern in the string sequentially, using:
 *      ```ts
 *      const rplce = pattern.resolved ?? pattern.key;
 *      namepattern = namepattern.replace(pattern.key, rplce);
 *      ```
 *      - If `pattern.resolved` is undefined (unknown pattern), the original `pattern.key` remains in the string.
 *
 * Note:
 *   - Multiple patterns in the string are replaced **in order of appearance**.
 *   - Repeated patterns are replaced multiple times.
 *   - Unknown patterns are left unchanged (fallback to `pattern.key`).
 *   - Special week keys (e.g., "MOW", "MMMOW") are resolved to the **first day of the current week** 
 *     using `SPECIALWEEKMAP` formatting.
 *   - ✅ 1.3.0 fully tested (02.01.execute.default.resolve.test.ts)
 *
 * Example usage:
 * ```ts
 * const now = moment("2026-01-17");
 * const result = resolve("week-{{MOW}}-{{YYYY}}.md", now);
 * // result => "week-1-2026.md"
 *
 * const unknown = resolve("note-{{UNKNOWN}}.md", now);
 * // unknown => "note-{{UNKNOWN}}.md"  // fallback to original pattern key
 * ```
 *
 * TypeScript considerations:
 * - `namepattern` is a string potentially containing any number of `{{format}}` placeholders.
 * - `amoment` is a Moment.js object used to compute date-based values.
 * - Returns a string with all recognized patterns replaced.
 *
 * @param {string} namepattern - The input string containing template patterns.
 * @param {moment.Moment} [amoment=moment()] - Moment.js date used for resolution. Defaults to current date/time.
 * @returns {string} - The resolved string with all recognized patterns replaced.
 */
export function resolve(
  namepattern: string,
  amoment: moment.Moment = moment()
): string {
  const pttrns = patterns(namepattern);
  resolved(amoment, pttrns);

  pttrns.forEach((pattern) => {
    const rplce = pattern.resolved ?? pattern.key;
    namepattern = namepattern.replace(pattern.key, rplce);
  });

  return namepattern;
}

/**
 * Creates a folder inside an Obsidian vault using the provided parameters.
 *
 * This function is a low-level implementation for folder creation. It handles
 * the actual folder path construction based on parent directories, ensures
 * that intermediate folders exist, and returns the full path of the created folder.
 *
 * Notes:
 * - It does **not** perform high-level validations beyond path concatenation.
 * - Errors are propagated to the caller, so any failure in folder creation
 *   must be handled externally.
 * - Designed to be used internally by higher-level functions like `createFolder`,
 *   which add logging, template handling, and additional workflow logic.
 * - ✅ 1.3.0 fully tested (02.01.execute.default.createFolderImpl.test.ts)
 *
 * @param {App} app
 *   The Obsidian `App` instance, used to access the vault and its methods.
 * @param {readonly string[]} parents
 *   An array of parent folder names. The folder will be created under this
 *   hierarchy, relative to the vault root.
 * @param {string} foldername
 *   The name of the folder to create.
 * @returns {Promise<string[]>}
 *   Resolves with an array containing the full path(s) of the created folder(s).
 *   Rejects if folder creation fails for any reason.
 */
export async function createFolderImpl(
  app: App,
  parents: readonly string[],
  foldername: string
): Promise<string[]> {
  const returnvalue = [...parents, foldername];
  const folderpath = normalizePath(returnvalue.join(STRINGS.FSLASH));
  const folder = app.vault.getFolderByPath(folderpath);

  if (folder) {
    return returnvalue;
  }

  await app.vault.createFolder(folderpath);
  return returnvalue;
}

/**
 * Creates a file inside an Obsidian vault with the specified parameters.
 *
 * This function performs the low-level operation of constructing the full
 * file path based on the provided parent directories and filename, checks
 * if the file already exists, and creates it with the given content if it does not.
 *
 * Notes:
 * - If the file already exists at the target path, the existing file is returned
 *   without modification.
 * - Errors during file creation are propagated to the caller, allowing higher-level
 *   functions to handle logging or retries.
 * - Designed to be used by higher-level workflow functions (e.g., `createFile`)
 *   that may include template processing, logging, or additional business logic.
 * - ✅ 1.3.0 fully tested (02.06.execute.default.createFileImpl.test.ts)
 *
 * @param {App} app
 *   The Obsidian `App` instance, which provides access to the vault APIs.
 * @param {readonly string[]} parents
 *   An array of parent folder names representing the directory hierarchy under
 *   which the file will be created.
 * @param {string} filename
 *   The name of the file to create.
 * @param {string} filedata
 *   The initial content to write into the file. Defaults to an empty string if not provided.
 * @returns {Promise<TFile>}
 *   Resolves with the `TFile` instance representing the created or existing file.
 *   Rejects if the file could not be created for any reason.
 */
export async function createFileImpl(
  app: App,
  parents: readonly string[],
  filename: string,
  filedata = ""
): Promise<TFile> {
  const filepath = normalizePath([...parents, filename].join(STRINGS.FSLASH));
  const file = app.vault.getFileByPath(filepath);
  if (file) {
    return file;
  }
  return app.vault.create(filepath, filedata);
}

/**
 * Generates a new `FolderStructure` object representing a folder note
 * derived from an existing folder node.
 *
 * This function converts a folder node into a file node suitable for
 * creating a *folder note*. It enforces the folder-note convention by
 * implicitly defining both the file name and the file type.
 *
 * Folder note invariants:
 *  - Folder notes are **always files**, never folders.
 *  - Folder notes are **always Markdown files** and therefore always
 *    carry the `.md` suffix.
 *  - The file name is derived directly from the parent folder’s
 *    `namepattern`; both file name and suffix are **implicit and not
 *    user-configurable**.
 *
 * Notes:
 *  - This function performs **no I/O**; it only creates an in-memory
 *    representation of the folder note.
 *  - It is intended to be used exclusively by `createFolder` as part of
 *    a folder-note workflow.
 *  - The enforced `.md` suffix is added via `STRINGS.MDSUFFIX` and must
 *    not be removed or overridden.
 *
 * @param {FolderStructure} node
 *   The source folder node from which the folder note structure
 *   is derived.
 * @returns {FolderStructure}
 *   A new `FolderStructure` object of type `FILE`, representing the
 *   folder note to be created.
 */

export function createFolderStructure(
  node: FolderStructure
): FolderStructure {
  return {
    type: FILE,
    namepattern: node.namepattern + STRINGS.MDSUFFIX,
    template: node.template,
  };
}

/**
 * Generates the content for a file based on a `FolderStructure` node's `template` property.
 *
 * This function reads the template file specified in the `node.template` path
 * and returns its contents as a string. If no template is defined or the file
 * does not exist, it logs a notice and returns `undefined`.
 *
 * Key behaviors:
 * - Reads from the Obsidian vault using `app.vault.read`.
 * - Returns `undefined` if `node.template` is not set or the file cannot be found.
 * - Logs informative messages via `ts-obsidian-log` for missing templates or errors.
 * 
 * Note:
 *  - ✅ 1.3.0 fully tested (02.07.execute.default.createFileData.test.ts)
 *
 * @param {App} app
 *   The Obsidian `App` instance used to access the vault.
 * @param {FolderStructure} node
 *   The folder structure node that may contain a `template` property.
 * @returns {Promise<string|undefined>}
 *   The content of the template file as a string, or `undefined` if no template exists
 *   or an error occurs during reading.
 */
export async function createFileData(
  app: App,
  node: FolderStructure
): Promise<string | undefined> {
  if (!node.template) {
    return undefined;
  }

  const file = app.vault.getAbstractFileByPath(node.template);
  /* c8 ignore start: cannot be tested due to ts-obsidian-log import */
  if (!(file instanceof TFile)) {
    const error = new Error(
      `${I18N("error.missing.template.file")} '${node.template}'`
    );
    log.notice(I18N("error.fail.create.file.content"), error);
    return undefined;
  }
  /* c8 ignore end */
  return app.vault.read(file);
}

/**
 * Combines provided file content with information from a `FolderStructure` node
 * and creates the resulting file inside the vault.
 *
 * This high-level function orchestrates file creation by:
 *  - Determining the target file name by resolving `node.namepattern`.
 *  - Generating file content using `createFileData`.
 *  - Invoking `createFileImpl` to actually write the file to the vault.
 *  - Handling errors gracefully and returning `undefined` if file creation fails.
 *
 * File naming and extension rules:
 *  - File extensions are **not added implicitly**.
 *  - A file will only have an extension if it is explicitly included in
 *    `node.namepattern` (e.g. `"{{YYYY}}-{{MM}}-{{DD}}.md"`).
 *  - This function does **not** assume Markdown semantics or enforce `.md`
 *    as a default file type.
 *
 * Notes:
 *  - If the file already exists, the existing file may be returned without overwriting.
 *  - Designed to work seamlessly with folder-note workflows and template-driven
 *    file creation.
 *  - Folder notes are **not** handled here; they are created via
 *    `createFolderStructure`, which implicitly enforces a `.md` suffix.
 *  - Any logging for errors or notices is handled internally via `ts-obsidian-log`.
 *  - ✅ 1.3.0 fully tested (02.08.execute.default.createFile.test.ts)
 *
 * @param {App} app
 *   The Obsidian `App` instance, providing access to vault operations.
 * @param {readonly string[]} parents
 *   Array of parent folder names representing the hierarchy in which the file
 *   will be created.
 * @param {FolderStructure} node
 *   The folder structure node containing file metadata, including `namepattern`
 *   and an optional `template`.
 * @returns {Promise<TFile|undefined>}
 *   Resolves with the created `TFile` instance, or `undefined` if creation fails.
 */
export async function createFile(
  app: App,
  parents: readonly string[],
  node: FolderStructure
): Promise<TFile | undefined> {
  const filename = resolve(node.namepattern);
  const template = await createFileData(app, node);

  try {
    return await createFileImpl(app, parents, filename, template);
  } catch (error) {
    log.error(error instanceof Error ? error : new Error( "" + error ),
              `${I18N("error.fail.create.file")} '${filename}'.`);
    return undefined;
  }
}

/**
 * Creates a folder inside the vault using a name derived from a folder node's pattern.
 *
 * This high-level function performs the following steps:
 *  - Resolves the folder name from `node.namepattern`, applying any date or special patterns.
 *  - Calls `createFolderImpl` to create the actual folder in the vault under the specified `parents` path.
 *  - Optionally creates a folder note or associated files based on the node's structure and templates.
 *
 * Notes:
 * - Errors during folder creation are propagated to the caller; higher-level logging may be applied externally.
 * - Designed to be used within folder-note workflows, enabling recursive or template-driven folder structures.
 * - ✅ 1.3.0 fully tested (02.09.execute.default.createFolder.test.ts)
 *
 * @param {App} app
 *   The Obsidian `App` instance used to access vault methods.
 * @param {readonly string[]} parents
 *   An array of parent folder names representing the hierarchy under which the folder will be created.
 * @param {FolderStructure} node
 *   The folder structure node containing the `namepattern` and optional template information.
 */
export async function createFolder(
  app: App,
  parents: readonly string[],
  node: FolderStructure
): Promise<void> {
  const foldername = resolve(node.namepattern);

  let newparents: string[];
  try {
    newparents = await createFolderImpl(app, parents, foldername);
  } catch (error) {
    log.error(error instanceof Error ? error : new Error( "" + error ), 
              `${I18N("error.fail.create.folder")} '${foldername}'`);
    return;
  }

  if (node.template) {
    await createFile(app, newparents, createFolderStructure(node));
  }

  if (node.children) {
    await build(app, newparents, node.children);
  }
}

/**
 * Constructs a folder and file hierarchy based on an array of `FolderStructure` nodes.
 *
 * This function iterates over the provided `structure` array and performs the following:
 *  - For each node of type "FOLDER", it creates the folder under the given `parents` path
 *    and recursively processes any children nodes.
 *  - For each node of type "FILE", it creates the file using `createFile`, applying templates
 *    and resolving patterns as necessary.
 *
 * Notes:
 * - Designed to orchestrate the creation of complex vault structures in a consistent order.
 * - Handles both folders and files, recursively processing nested structures.
 * - Errors during creation of individual nodes are propagated; higher-level error handling
 *   or logging should be applied externally.
 * - ✅ 1.3.0 fully tested (02.10.execute.default.build.test.ts)
 *
 * @param {readonly string[]} parents
 *   Array of parent folder names representing the current path in the vault hierarchy.
 * @param {FolderStructure[]} structure
 *   Array of folder structure nodes that define the folders and files to be created.
 */
export async function build(
  app: App,
  parents: readonly string[],
  structure: FolderStructure[]
): Promise<void> {
  for (const node of structure) {
    if (node.type === FILE) {
      await createFile(app, parents, node);
    } else if (node.type === FOLDER) {
      await createFolder(app, parents, node);
    } else {
      log.notice(
        `${I18N("error.settings.structure.unknown.type")} '${node.type}'`
      );
    }
  }
}

/**
 * Parses a JSON string into an array of `FolderStructure` objects.
 *
 * This function converts a serialized folder structure representation into
 * usable `FolderStructure` nodes that can be processed by functions like `build`
 * or `executeDefault`.
 *
 * Notes:
 * - Expects a valid JSON string representing an array of folder/file nodes.
 * - Throws an error if the JSON is malformed or does not match the expected structure.
 * - Useful for deserializing stored or user-provided folder templates.
 * - ✅ 1.3.0 fully tested (02.11.execute.default.parseStructure.test.ts)
 *
 * @param {string} structure
 *   A JSON string representing an array of folder structure nodes.
 * @returns {FolderStructure[]}
 *   An array of `FolderStructure` objects parsed from the JSON string.
 */
export function parseStructure(
  structure: string
): FolderStructure[] {
  let obj: unknown;

  try {
    obj = JSON.parse(structure);
  } catch (error) {
    log.notice(I18N("error.fail.parse.settings.structure"), error as Error);
    return [];
  }

  if (!Array.isArray(obj)) {
    log.notice(I18N("error.settings.structure.must.be.array"));
    return [];
  }

  return obj as FolderStructure[];
}

/**
 * Executes the default action of the plugin, creating folders and files
 * according to the provided daily note structure settings.
 *
 * This high-level function orchestrates the plugin workflow:
 *  - Parses the folder structure from the plugin settings.
 *  - Resolves all name patterns and templates.
 *  - Calls `build` to create the folders and files in the vault.
 *
 * Notes:
 * - Designed as the main entry point for the plugin's automated folder-note creation.
 * - Handles both standard files and special folder structures, applying templates and
 *   name pattern resolution.
 * - Any errors during creation are propagated; logging is handled internally or via higher-level
 *   plugin mechanisms.
 * - ✅ 1.3.0 fully tested (02.12.execute.default.executeDefault.test.ts)
 *
 * @param {App} app
 *   The Obsidian `App` instance, providing access to the vault and its APIs.
 * @param {DailyNoteStructurePluginSettings} settings
 *   Plugin settings containing the folder structure definitions, naming patterns,
 *   and any template configuration.
 */
export async function executeDefault(
  app: App,
  settings: DailyNoteStructurePluginSettings
): Promise<void> {
  const structure = parseStructure(settings.structure);
  if (!structure.length) {
    return;
  }

  await build(app, [], structure);
}