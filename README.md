# Daily Note Structure

This plugin automates the creation of a folder and file structure for daily notes.
If your daily notes are just individual markdown files in a single folder, you do **not** need this plugin.

The purpose of this plugin is to simplify and automate the **daily creation** of **multiple** folders and files for daily notes.

---

## Recommended Plugins

For best results, consider installing the following Obsidian plugins:

* [**Templater** by SilentVoid](https://obsidian.md/plugins?search=templater)
  Use this to automatically generate folder and file content.

* [**Folder Notes** by Lost Paul](https://obsidian.md/plugins?search=folder%20notes)
  Use this to display default notes when clicking on folders.

---

## Date/Time Format Patterns

For compatibility, *Daily Note Structure* uses [moment.js](https://momentjs.com/docs/#/displaying/format/) formats.
All standard moment.js formats are available.

Additionally, the following custom formats are supported:

|                   Description | Token  | Output                           |
| ----------------------------: | :----- | :------------------------------- |
| Month of the week’s first day | MOW    | 1, 2, ..., 11, 12                |
|                               | MoW    | 1st, 2nd, ...,,11th, 12th        |
|                               | MMOW   | 01, 02, ..., 11, 12              |
|                               | MMMOW  | Jan, Feb, ..., Nov, Dec          |
|                               | MMMMOW | January, February, ..., December |

These formats are useful for grouping daily notes of a week in the same folder.

---

### Format Errors

Evaluation errors for invalid patterns can be found in Obsidian’s developer console (`Shift+Ctrl+I`).
Note: Not all invalid patterns throw an error; some may return unexpected results silently.

---

## Folder Structure

```ts
export interface FolderStructure {
  type: "folder" | "file";
  namepattern: string;
  template?: string;
  description?: string;
  children?: FolderStructure[];
}
```

Use the `FolderStructure` interface to configure your folder/file structure in the plugin’s settings page.
The structure is an array of `FolderStructure` objects:

```json
[
  {
    "type": "folder",
    "namepattern": "{{YYYY}}",
    "template": "Plugins/Templater/Templates/yearly_folder_note_template.md",
    "description": "yearly folder base",
    "children": [
      {
        "type": "folder",
        "namepattern": "{{MMOW}} - {{MMM}} {{YYYY}}",
        "template": null,
        "description": "folder matching the month for the first day in the week",
        "children": [
          {
            "type": "folder",
            "namepattern": "KW {{WW}} ({{MMM}} {{YYYY}})",
            "template": null,
            "description": "folder matching the year’s week",
            "children": [
              {
                "type": "file",
                "namepattern": "{{YYYY}}-{{MM}}-{{DD}}",
                "template": "Plugins/Templater/Templates/daily_template.md"
              }
            ]
          }
        ]
      }
    ]
  }
]
```

---

### Properties

**`type`** {string} – *required*
Must be `"folder"` or `"file"`.

**`namepattern`** {string} – *required*
A string containing characters and patterns.
Patterns must follow `{{<pattern>}}`, where `<pattern>` is a valid [moment.js format](https://momentjs.com/docs/#/displaying/format/).

Do **not** combine patterns inline (e.g., `{{YYYY-MM-DD}}`).
Use `{{YYYY}}-{{MM}}-{{DD}}` instead.

**`template`** {string} – *optional*
Path to a markdown file used as a template.

* For `type: "file"`, the generated file’s content will match the template.
* For `type: "folder"`, a markdown file with the folder name will be created inside the folder, containing the template content.
  For best results, install a folder note plugin.

**`description`** {string} – *optional*
Optional description of the folder or file. Currently not used by the plugin.

**`children`** {Array<FolderStructure>} – *optional*
Array of child `FolderStructure` nodes. Only applicable for folders.
Ignored if specified on a file.
