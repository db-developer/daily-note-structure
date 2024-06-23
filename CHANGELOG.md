# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- No additions yet

### Changed

- No changes yet

### Fixed

- No fixes yet

## [1.1.0] - 2021-06-23

### Added

- Changelog
- Tabbed settings page
- Folder structure help info on settings page
- Ribbon toggle info on settings page

### Changed

- Handling of css classes. 
- CSS classname strings replaced by constant strings.
- HTML element strings replaced by constant strings.

### Removed

- Settings for toggling ribbon buttons removed on request by 'obsidian plugin review'

## [1.0.1] - 2021-06-18 21:00

### Fixed

- Obsidian plugin validation bot requests
  - ❌ Please don't use the word plugin in the plugin ID. The ID is used for your plugin's folder so keeping it short and simple avoids clutter and helps with sorting.
    ✔️ The word 'plugin' was removed from the plugin ID.
  - ❌ Please don't use the word Plugin in the plugin name since it's redundant and adds clutter to the plugin list.
    ✔️ The word 'Plugin' was removed from the plugins name.
  - ❌ Please don't include Obsidian in the plugin description.
    ✔️ The word 'Obsidian' was removed from the plugin description.
  - ❌ Unable to find a release with the tag 1.0.0. Make sure that the version in your manifest.json file in your repo points to the correct Github Release.
    ✔️ Tag for release v1.0.0 adjusted to 1.0.0

## [1.0.0] - 2021-06-18 19:00

- Initial version

### Features

- Create a structure for 'daily notes'
- Toggle 'daily note' and 'daily note structure' buttons