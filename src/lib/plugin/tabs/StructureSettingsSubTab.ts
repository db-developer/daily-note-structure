import { App,
         MarkdownRenderer,
         Plugin,
         Setting,
         TFile                             } from "obsidian";
// import bootstrap translation function first
import { I18N                              } from "../../bootstrap";
import { DailyNoteStructurePluginSettings  } from "../../settings";
import { FILE,
         FOLDER,
         FolderStructure                   } from "../../types";
import type { PluginSettingsRenderContext,
              PluginSettingsSubTab,
              PluginSettingsSubTabIdMap    } from "ts-obsidian-ui-settings";

// Define a constant for the sub-tab ID
const STRUCTURE = "structure" as const;

// Make the GeneralSettingsSubTab available by defining its ID in the global module
declare module "ts-obsidian-ui-settings" {
  interface PluginSettingsSubTabIdMap {
    [STRUCTURE]: true;
  }
}

export class StructureSettingsSubTab implements PluginSettingsSubTab<DailyNoteStructurePluginSettings> {
  // Define the unique ID for this sub-tab in case we need it elsewhere
  // TODO: Check if required. Remove if not!
  public readonly id: keyof PluginSettingsSubTabIdMap = STRUCTURE;
  // TODO: Do wie need an init method?
  public app!: App;
  /**
   * The header text for the Structure Settings sub-tab as
   * required by the PluginSettingsSubTab interface.
   * 
   * Note:
   * - Implemented as a getter to allow for dynamic localization.
   * @returns The localized header string.
   */
  public get header(): string { return I18N("settings.tab.structure")}
  /**
   * Renders the content of the Structure Settings sub-tab.
   * Required by the PluginSettingsSubTab interface.
   * @param context The rendering context providing necessary utilities and data.
   */
  public render(context: PluginSettingsRenderContext<DailyNoteStructurePluginSettings>): void {
    const { containerEl, settings, saveSettings, plugin } = context;
    containerEl.empty();
    containerEl.addClass("dns-full-height");

    let rootStructure: FolderStructure[];

    try {
      rootStructure = JSON.parse(settings.structure || "[]") as FolderStructure[];
    } catch {
      containerEl.createEl("pre", {
        text: I18N("error.settings.structure.invalid"),
        cls: "error"
      });
      return;
    }

    const root = containerEl.createDiv({ cls: "dns-tree-root" });

    this.renderList(context, containerEl, root, rootStructure, rootStructure);

    const controls = containerEl.createDiv({ cls: "dns-root-controls" });

    new Setting(controls).addButton(btn =>
      btn
        .setButtonText(I18N("settings.tab.structure.button.add.root"))
        .setCta()
        .onClick(() => {
          rootStructure.push({ type: FILE, namepattern: "new-item" });
          this.save(context, containerEl, rootStructure);
          this.render(context);
        })
    );

    const helpContainer = containerEl.createDiv({
      cls: "dns-context-help dns-plugin-html",
      text: I18N("settings.tab.structure.ctxhlp.default")
    });

    this.registerContextHelp(plugin, containerEl, helpContainer);

    this.addStyling(containerEl);    
  }

  private registerContextHelp(
    plugin: Plugin,
    containerEl: HTMLElement,
    helpEl: HTMLElement
  ): void {
    containerEl.addEventListener("focusin", async (event) => {
      const target = event.target as HTMLElement;
      this.renderContextHelp(plugin, containerEl, helpEl, target);
      return;
    });

    containerEl.addEventListener("mouseover", (event) => {
      const target = event.target as HTMLElement;
      this.renderContextHelp(plugin, containerEl, helpEl, target);
      return;
    });

    containerEl.addEventListener("mouseleave", () => {
      helpEl.setText(I18N("settings.tab.structure.ctxhlp.default"));
    });
    containerEl.addEventListener("focusout", () => {
      helpEl.setText(I18N("settings.tab.structure.ctxhlp.default"));
    });
  }

  private renderContextHelp(
    plugin: Plugin,
    containerEl: HTMLElement,
    helpEl: HTMLElement,
    target: HTMLElement
  ) {
    if (target.matches(".dns-node-name")) {
      const markdown = I18N("settings.tab.structure.ctxhlp.namepattern");
      helpEl.empty();
      MarkdownRenderer.render(
        this.app, markdown, helpEl, "", plugin
      );
    }
    if (target.matches(".dns-node-template")) {
      const markdown = I18N("settings.tab.structure.ctxhlp.template");
      helpEl.empty();
      MarkdownRenderer.render(
        this.app, markdown, helpEl, "", plugin
      );
    }    
    if (target.matches(".dns-node-is-folder")) {
      const markdown = I18N("settings.tab.structure.ctxhlp.type");
      helpEl.empty();
      MarkdownRenderer.render(
        this.app, markdown, helpEl, "", plugin
      );
    }
  }

  private save(
    context: PluginSettingsRenderContext<DailyNoteStructurePluginSettings>,
    containerEl: HTMLElement,
    structure: FolderStructure[]
  ): void {
    try {
      context.settings.structure = JSON.stringify(structure);
      context.saveSettings();
      containerEl.classList.remove("error");
    } catch {
      containerEl.classList.add("error");
    }
  }  

  private renderList(
    context: PluginSettingsRenderContext<DailyNoteStructurePluginSettings>,
    containerEl: HTMLElement,
    parentEl: HTMLElement,
    nodes: FolderStructure[],
    rootStructure: FolderStructure[],
    parent?: FolderStructure
  ): void {
    nodes.forEach((node, index) => {
      this.renderNode(
        context,
        parentEl,
        nodes,
        node,
        index,
        rootStructure,
        containerEl,
        parent
      );
    });
  }

  private renderNode(
    context: PluginSettingsRenderContext<DailyNoteStructurePluginSettings>,
    parentEl: HTMLElement,
    siblings: FolderStructure[],
    node: FolderStructure,
    index: number,
    rootStructure: FolderStructure[],
    containerEl: HTMLElement,
    parent?: FolderStructure
  ): void {
    const wrapper = parentEl.createDiv({ cls: "dns-node" });

    (node as any).__expanded ??= true;
    let expanded = (node as any).__expanded;

    const contentContainer = wrapper.createDiv({ cls: "dns-node-content" });
    const header = contentContainer.createDiv({ cls: "dns-node-header" });

    const hasChildren = !!node.children?.length;

    const toggle = header.createSpan({
      cls: "dns-node-toggle",
      text: hasChildren ? "▾" : ""
    });

    const childrenContainer = wrapper.createDiv({ cls: "dns-node-children" });

    if (hasChildren) {
      toggle.onclick = () => {
        expanded = !expanded;
        (node as any).__expanded = expanded;
        childrenContainer.toggle(expanded);
        toggle.setText(expanded ? "▾" : "▸");
      };
    } else {
      toggle.addClass("dns-node-toggle-disabled");
    }

    const name = header.createEl("input", {
      cls: "dns-node-name",
      value: node.namepattern
    });
    name.oninput = () => {
      const value = name.value.trim();
      node.namepattern = value;
      this.save(context, containerEl, rootStructure);
    };

    /* ---------- IS-FOLDER CHECKBOX ---------- */
    const isFolder = header.createEl("input", {
      type: "checkbox",
      cls: "dns-node-is-folder"
    });

    isFolder.checked = node.type === FOLDER;
    isFolder.disabled = hasChildren;

    isFolder.onchange = () => {
      node.type = isFolder.checked ? FOLDER : FILE;
      this.save(context, containerEl, rootStructure);
    };

    const del = header.createEl("button", {
      cls: "dns-node-delete",
      text: "❌"
    });

    if (hasChildren) {
      del.disabled = true;
    } else {
      del.onclick = () => {
        siblings.splice(index, 1);

        if (parent && siblings.length === 0) {
          parent.children = undefined;
          parent.type = FILE;
        }

        this.save(context, containerEl, rootStructure);
        this.render(context);
      };
    }

    const up = header.createEl("button", {
      cls: "dns-node-move-up",
      text: "↑"
    });
    if (index === 0 ) {
      up.disabled = true;
    } else {
      up.onclick = () => {
        if (index === 0) return;
        [siblings[index - 1], siblings[index]] = [
          siblings[index],
          siblings[index - 1]
        ];
        this.save(context, containerEl, rootStructure);
        this.render(context);
      };
    }

    /* ---------- META ROW ---------- */
    const meta = contentContainer.createDiv({ cls: "dns-node-meta" });

    const template = meta.createEl("input", {
      cls: "dns-node-template",
      placeholder: "template file",
      value: node.template ?? ""
    });

    template.oninput = () => {
      const value = template.value.trim();

      if (!value) {
        node.template = undefined;
        this.setTemplateClass(template, "dns-node-template");
        return;
      }

      if (this.isTemplate(value)) {
        node.template = value;
        this.setTemplateClass(template, "dns-node-template-valid");
      } else {
        this.setTemplateClass(template, "dns-node-template-error");
      }
    };

    const addChild = meta.createEl("button", {
      cls: "dns-node-add-child",
      text: "➕"
    });
    addChild.onclick = () => {
      node.children ??= [];
      node.children.push({
        type: FILE,
        namepattern: "new-item",
        template: ""
      });

      node.type = "folder";

      this.save(context, containerEl, rootStructure);
      this.render(context);
    };

    const down = meta.createEl("button", {
      cls: "dns-node-move-down",
      text: "↓"
    });
    if (index >= siblings.length - 1) {
      down.disabled = true;
    } else {
      down.onclick = () => {
        if (index >= siblings.length - 1) return;
        [siblings[index + 1], siblings[index]] = [
          siblings[index],
          siblings[index + 1]
        ];
        this.save(context, containerEl, rootStructure);
        this.render(context);
      };
    }

    childrenContainer.toggle(expanded);

    if (node.children?.length) {
      this.renderList(
        context,
        containerEl,
        childrenContainer,
        node.children,
        rootStructure,
        node
      );
    }
  }

  /**
   * Checks whether the given template path refers to an existing Markdown file
   * in the current Obsidian vault.
   *
   * The path must be vault-relative and point to a file (not a folder).
   *
   * @param templatepath Vault-relative path to the template file.
   * @returns True if the path resolves to an existing `.md` file, otherwise false.
   */
  private isTemplate(templatepath: string): boolean {
    const file = this.app.vault.getAbstractFileByPath(templatepath);

    if (!(file instanceof TFile)) {
      return false;
    }

    return file.extension === "md";
  }

  private setTemplateClass(el: HTMLInputElement, cls: string): void {
    el.classList.remove(
      "dns-node-template",
      "dns-node-template-valid",
      "dns-node-template-error"
    );
    el.classList.add(cls);
  }

  private addStyling(containerEl: HTMLElement): void {
    const STYLE_ID = "daily-note-structure-settings-style";

    if (containerEl.querySelector(`#${STYLE_ID}`)) {
      return;
    }

    const styleEl = containerEl.createEl("style");
    styleEl.id = STYLE_ID;
    styleEl.textContent = getSettingsTabCSS();
  }
}

function getSettingsTabCSS(): string {
  return `
  /* Root container */

  .dns-tree-root {
    flex: 0 0 auto;
    height: 400px;
    overflow-y: auto;
    padding: 6px;
    box-sizing: border-box;
    font-size: 13px;
  
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px; /* ← optional */
  }
  
  /* Single node wrapper */
  .dns-node {
    margin-left: 12px;
    padding: 4px 0;
  }

  .dns-node-hidden {
    visibility: hidden;
  }
  
  /* Header row */
  .dns-node-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  /* Content wrapper */
  .dns-node-content {
    display: flex;
    flex-direction: column;
  }
  
  /* Expand / collapse toggle */
  .dns-node-toggle {
    width: 14px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  
  .dns-node-toggle-disabled {
    opacity: 0.3;
    cursor: default;
  }
  
  /* Name input */
  .dns-node-name {
    flex: 1;
    min-width: 0;
  }

  .dns-node-is-folder:disabled {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }

  /* Neutralize Hover / Focus  */
  .dns-node-is-folder:disabled:hover,
  .dns-node-is-folder:disabled:focus {
    background: none;
    box-shadow: none;
  }

  /* Delete / move buttons */
  .dns-node-delete,
  .dns-node-move-up {
    margin-left: 4px;
  }
  
  .dns-node-delete:disabled,
  .dns-node-move-up:disabled,
  .dns-node-move-down:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Neutralize Hover / Focus  */
  .dns-node-delete:disabled:hover,
  .dns-node-delete:disabled:focus,
  .dns-node-move-up:disabled:hover,
  .dns-node-move-up:disabled:focus,
  .dns-node-move-down:disabled:hover,
  .dns-node-move-down:disabled:focus {
    background: none;
    box-shadow: none;
  }

  /* Second row */
  .dns-node-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 20px;
    margin-top: 2px;
  }
  
  /* Description input */
  .dns-node-template,
  .dns-node-template-valid,
  .dns-node-template-error {
    flex: 1;
    min-width: 0;
  
    font-family: var(--font-ui);  /* gleiche UI-Font wie Name */
    font-size: 13px;              /* an Name-Feld anpassen */
    line-height: 1.2;             /* optional für Höhe */
    opacity: 0.85;
  
    box-sizing: border-box;    /* ← Höhe inklusive Border */
    padding: 2px 4px;          /* optional: gleiche Innenabstände */
    height: 24px;              /* optional: gleiche Höhe für alle Zustände */
  }
  
  .dns-node-template-valid {
    border: 1px solid var(--color-green);
  }
  
  .dns-node-template-error {
    border: 1px solid var(--text-error);
  }
  
  .dns-node-template::placeholder,
  .dns-node-template-valid::placeholder,
  .dns-node-template-error::placeholder {
    opacity: 0.5;                /* visuell dezent, beeinflusst Höhe nicht */
    font-size: 13px;             /* gleiche Fontgröße wie Input */
    line-height: 20px;           /* gleiche Höhe wie Input */
  }
  
  /* Add child / move down buttons */
  .dns-node-add-child,
  .dns-node-move-down {
    margin-left: 4px;
  }
  
  /* Children container */
  .dns-node-children {
    margin-left: 14px;
    padding-left: 6px;
    border-left: 1px dotted var(--background-modifier-border);
  }
  
  .dns-root-controls {
    flex: 0 0 auto;
    margin-top: 8px;
    padding: 0;
    box-sizing: border-box;

    display: flex;
    flex-direction: column; /* ← von row zu column, neue Zeilen möglich */
    gap: 4px;               /* optional: Abstand zwischen Button und Help */
    width: 100%;            /* volle Breite einnehmen */
  }

  .dns-root-add {
    align-self: flex-end;   /* Button oben rechts */
    padding: 4px 8px;
    font-size: 12px;
  }

  /* Help-Feld (kontextsensitiv) */
  .dns-context-help {
    flex: 1 1 auto;
    overflow-y: auto;
    border: 1px solid var(--background-modifier-border);
    border-radius: 4px;
    padding: 6px;
  }

  /* Error state (used by save + JSON parse) */
  .error {
    border: 1px solid var(--text-error);
    background-color: var(--background-modifier-error);
  }
`;
}