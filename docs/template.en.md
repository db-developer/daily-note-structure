## Template

The **Template** is the path to a Markdown file whose content is used during creation.

### Usage:

- **For files**  
  The generated file’s content will exactly match the template.

- **For folders**  
  A Markdown file with the folder name is created inside the new folder 
  **only if a `template` is specified**.  
  This file is always a Markdown file (`.md`), and both the file name 
  and the `.md` suffix are **implicit and not configurable**.

### Note:

When working with folders, using a **folder note plugin** is recommended for best results.

### Example:

- `templates/daily.md`  
  → Used as content for new files or as a folder note.
