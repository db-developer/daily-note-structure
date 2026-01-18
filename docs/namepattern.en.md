## Name Pattern

The **name pattern** defines how the name of a file or folder is generated.
It consists of arbitrary characters and **patterns** enclosed in **double curly braces**:
`{{<pattern>}}`.

### Important

- Patterns must be valid **moment.js** format tokens.
- **No inline combinations** are allowed:
  - ❌ Invalid: `{{YYYY-MM-DD}}`
  - ✅ Valid: `{{YYYY}}-{{MM}}-{{DD}}`

### File name and extension semantics

- Name patterns are resolved **verbatim**.
- No file extension is added automatically.
- A generated file will only have an extension if it is explicitly included
  in the name pattern (for example: `{{YYYY}}-{{MM}}-{{DD}}.md`).
- If no extension is specified, the resulting file will be created **without**
  a suffix.

> Folder notes are an exception:
> A folder note is created **only if a `template` is specified for a folder**.
> In this case, the folder note is always a Markdown file (`.md`), and both the
> file name and the `.md` suffix are implicit and not configurable.

### Examples

- `Daily Note - {{YYYY}}-{{MM}}-{{DD}}`  
  → Generates a file daily, for example: `Daily Note - 2026-01-15`

- `Daily Note - {{YYYY}}-{{MM}}-{{DD}}.md`  
  → Generates a Markdown file daily, for example: `Daily Note - 2026-01-15.md`

- `Project_{{YYYY}}-{{MM}}_Summary`  
  → Generates a file updated monthly, for example: `Project_2026-01_Summary`
