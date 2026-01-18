// src/test/02.09.execute.default.createFolder.test.ts

import   path            from "path";
import { fileURLToPath } from "url";
import { vi, beforeEach, afterEach } from "vitest";
import { App }            from "obsidian";
import { FOLDER, FILE }  from "../../lib/types";

// ------------------------
// Mock ts-obsidian-log
// ------------------------
const noticeMock = vi.fn();
vi.mock("ts-obsidian-log", () => ({
  Log: {
    init: () => ({
      notice: noticeMock,
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
    }),
  },
}));

// ------------------------
// Imports NACH Mocks
// ------------------------
import * as Execute from "../../lib/actions/execute.default";

/**
 * Tests for createFolder
 * Focus is on:
 *  - Folder creation
 *  - Handling existing folders
 *  - Creating optional folder note (template file)
 *  - Recursively creating children folders
 *  - Proper namepattern resolution
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Testing createFolder", () => {

    test("should import createFolder successfully", () => {
      expect(Execute.createFolder).toBeDefined();
      expect(typeof Execute.createFolder).toBe("function");
    });

    test("should return void if folder already exists", async () => {
      const app = new App();
      const parents = ["root"];
      const node = { namepattern: "existing", type: FOLDER } as any;

      // Folder exists
      app.vault.getFolderByPath = () => ({ path: "root/existing" });

      const result = await Execute.createFolder(app, parents, node);

      expect(result).toBeUndefined();
    });

    test("should create new folder if it does not exist", async () => {
      const app = new App();
      const parents: string[] = [];
      const node = { namepattern: "newfolder", type: FOLDER } as any;

      let createdPath = "";
      app.vault.getFolderByPath = () => undefined;
      app.vault.createFolder = async (path: string) => { createdPath = path; return { path }; };

      const result = await Execute.createFolder(app, parents, node);

      expect(createdPath).toBe("newfolder");
      expect(result).toBeUndefined();
    });

    test("should create folder note if template is provided", async () => {
      const app = new App();
      const parents: string[] = [];
      const node = { namepattern: "folderWithNote", type: FOLDER, template: "template.md" } as any;

      let createdFiles: string[] = [];
      app.vault.getFolderByPath = () => undefined;
      app.vault.createFolder = async (path: string) => ({ path });
      app.vault.create = async (path: string, data: string) => { createdFiles.push(path); return { path, data }; };

      await Execute.createFolder(app, parents, node);

      // Prüfen, dass die Folder-Note erstellt wurde
      expect(createdFiles.length).toBe(1);
      expect(createdFiles[0]).toMatch(/folderWithNote\/folderWithNote\.md$/);
    });

    test("should recursively create children folders", async () => {
      const app = new App();
      const parents: string[] = [];
      const childNode = { namepattern: "child", type: FOLDER } as any;
      const node = { namepattern: "parent", type: FOLDER, children: [childNode] } as any;

      let createdFolders: string[] = [];
      app.vault.getFolderByPath = () => undefined;
      app.vault.createFolder = async (path: string) => { createdFolders.push(path); return { path }; };

      await Execute.createFolder(app, parents, node);

      // parent und child erstellt
      expect(createdFolders).toEqual(["parent", "parent/child"]);
    });

  });

});
