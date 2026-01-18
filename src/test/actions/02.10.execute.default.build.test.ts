// src/test/02.10.execute.default.build.test.ts

import   path            from "path";
import { fileURLToPath } from "url";
import { vi, beforeEach, afterEach } from "vitest";
import { App } from "obsidian";
import { FILE, FOLDER } from "../../lib/types";

// ------------------------
// Imports NACH Mocks
// ------------------------
import * as Execute from "../../lib/actions/execute.default";

/**
 * Tests for build
 * Focus is on:
 *  - Correctly creating files and folders based on type
 *  - Handling nested structures (children)
 *  - Proper namepattern resolution
 *  - Integration with Vault mocks
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Testing build", () => {

    test("should import build successfully", () => {
      expect(Execute.build).toBeDefined();
      expect(typeof Execute.build).toBe("function");
    });

    test("should create files for FILE nodes", async () => {
      const app = new App();
      const structure = [
        { namepattern: "file1.md", type: FILE },
        { namepattern: "file2.md", type: FILE },
      ] as any[];

      const createdFiles: string[] = [];
      app.vault.create = async (path: string, data: string) => {
        createdFiles.push(path);
        return { path, data };
      };
      app.vault.getFileByPath = () => undefined;

      await Execute.build(app, [], structure);

      expect(createdFiles).toEqual(["file1.md", "file2.md"]);
    });

    test("should create folders for FOLDER nodes", async () => {
      const app = new App();
      const structure = [
        { namepattern: "folder1", type: FOLDER },
      ] as any[];

      const createdFolders: string[] = [];
      app.vault.createFolder = async (path: string) => {
        createdFolders.push(path);
        return { path };
      };
      app.vault.getFolderByPath = () => undefined;

      await Execute.build(app, [], structure);

      expect(createdFolders).toEqual(["folder1"]);
    });

    test("should recursively create nested folders and files", async () => {
      const app = new App();
      const structure = [
        {
          namepattern: "parent",
          type: FOLDER,
          children: [
            { namepattern: "childFile.md", type: FILE },
            { namepattern: "childFolder", type: FOLDER, children: [
              { namepattern: "grandchildFile.md", type: FILE }
            ] },
          ],
        },
      ] as any[];

      const createdFolders: string[] = [];
      const createdFiles: string[] = [];

      app.vault.createFolder = async (path: string) => {
        createdFolders.push(path);
        return { path };
      };
      app.vault.getFolderByPath = () => undefined;
      app.vault.create = async (path: string, data: string) => {
        createdFiles.push(path);
        return { path, data };
      };
      app.vault.getFileByPath = () => undefined;

      await Execute.build(app, [], structure);

      expect(createdFolders).toEqual(["parent", "parent/childFolder"]);
      expect(createdFiles).toEqual(["parent/childFile.md", "parent/childFolder/grandchildFile.md"]);
    });

  });

});
