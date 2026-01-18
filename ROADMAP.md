# Roadmap for Daily-Note-Structure

This roadmap outlines the planned evolution and enhancements for the `daily-note-structure` plugin for [Obsidian](https://obsidian.md/).

## Current Version (1.4.0)

- Code refactoring (part 1 of 2) completed:
  - Optimized Rollup bundling
  - Internationalization (I18N) migrated to [ts-obsidian-i18n](https://github.com/db-developer/ts-obsidian-i18n)
  - Logging migrated to [ts-obsidian-log](https://github.com/db-developer/ts-obsidian-log)
  - Settings framework migrated to [ts-obsidian-plugin](https://github.com/db-developer/ts-obsidian-plugin)
  - Settings UI sub-tabs moved to [ts-obsidian-ui-settings](https://github.com/db-developer/ts-obsidian-ui-settings)
  - Integrated GitHub Markdown files into Obsidian context help
  - Core functionality (actions) refactored with tests established (current code coverage ~88%)
  - Settings interface transitioned from JSON to fully interactive UI

## Short-Term Goals

- Eliminate dynamic CSS
- Verbliebene de-DE Kommentare entfernen 😁
- Remove the `app` property from SubTab subclasses (refactoring part 2 of 2)
- Identify and resolve the sporadic “calendar week” issue at the beginning of some months
- Add github workflows (CI)

---

## Mid-Term Goals

- Revise `README.md`:
  - Add updated UI screenshots
  - Provide more comprehensive and clear examples

- Prepare MCP (Model Context Protocol) capabilities for AI access and automation
- Explore mechanisms for providing API tokens to support AI integrations

---

## Long-Term Goals

- Having fun with Obsidian and AI
