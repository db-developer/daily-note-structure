## Name Pattern

Das **Name Pattern** legt fest, wie der Name einer Datei oder eines Ordners erzeugt wird.
Es besteht aus beliebigen Zeichen und **Patterns**, die in **doppelte geschweifte Klammern**
eingeschlossen werden: `{{<pattern>}}`.

### Wichtig

- Patterns müssen gültige **moment.js**-Format-Tokens sein.
- **Keine Inline-Kombinationen**:
  - ❌ Ungültig: `{{YYYY-MM-DD}}`
  - ✅ Gültig: `{{YYYY}}-{{MM}}-{{DD}}`

### Semantik von Dateinamen und Dateiendungen

- Name Patterns werden **wortgetreu** aufgelöst.
- Es wird **keine Dateiendung automatisch ergänzt**.
- Eine Datei erhält **nur dann** eine Dateiendung, wenn diese explizit im
  Name Pattern angegeben ist (z. B. `{{YYYY}}-{{MM}}-{{DD}}.md`).
- Ist keine Dateiendung angegeben, wird die Datei **ohne Suffix** erzeugt.

> **Ausnahme: Folder Notes**  
> Eine Folder Note wird **nur dann erzeugt**, wenn für einen Ordner ein
> **`template`** angegeben ist.  
> In diesem Fall ist die Folder Note **immer** eine Markdown-Datei (`.md`).
> Sowohl der Dateiname als auch die `.md`-Endung sind dabei **implizit festgelegt
> und nicht konfigurierbar**.

### Beispiele

- `Tägliche Notiz - {{YYYY}}-{{MM}}-{{DD}}`  
  → Erzeugt täglich eine Datei, z. B. `Tägliche Notiz - 2026-01-15`

- `Tägliche Notiz - {{YYYY}}-{{MM}}-{{DD}}.md`  
  → Erzeugt täglich eine Markdown-Datei, z. B. `Tägliche Notiz - 2026-01-15.md`

- `Projekt_{{YYYY}}-{{MM}}_Zusammenfassung`  
  → Erzeugt monatlich eine Datei, z. B. `Projekt_2026-01_Zusammenfassung`
