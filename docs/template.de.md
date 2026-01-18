## Template

Das **Template** ist der Pfad zu einer Markdown-Datei, deren Inhalt während der Erstellung verwendet wird.

### Verwendung:

- **Für Dateien**  
  Der Inhalt der erzeugten Datei entspricht exakt dem Template.

- **Für Ordner**  
  Eine Markdown-Datei mit dem Ordnernamen wird innerhalb des neuen Ordners erstellt,  
  **nur wenn ein `template` angegeben ist**.  
  Diese Datei ist immer eine Markdown-Datei (`.md`), und sowohl der Dateiname  
  als auch die `.md`-Endung sind **implizit festgelegt und nicht konfigurierbar**.

### Hinweis:

Bei der Arbeit mit Ordnern wird die Verwendung eines **Folder Note Plugins** für 
beste Ergebnisse empfohlen.

### Beispiel:

- `templates/daily.md`  
  → Wird als Inhalt für neue Dateien oder als Folder Note verwendet.
