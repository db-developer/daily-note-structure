// src/test/02.05.execute.default.createFolderImpl.test.ts

// imports <for the tests>
import   path               from "path";
import { fileURLToPath    } from "url";
import { App, 
         normalizePath    } from "obsidian";

// imports <for the first describe>
import { createFolderImpl } from "../../lib/actions/execute.default";

/**
 * Tests for createFolderImpl()
 * Ensures folders are created or returned correctly.
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  describe("Testing createFolderImpl", () => {

    test("should import createFolderImpl function successfully", () => {
      expect(createFolderImpl).toBeDefined();
      expect(typeof createFolderImpl).toBe("function");
    });

    test("should return existing path if folder already exists", async () => {
      const app = new App();
      const parents = ["parent"];
      const foldername = "existingFolder";

      // Simuliere bestehenden Ordner
      const folderPath = normalizePath([...parents, foldername].join("/"));
      app.vault.getFolderByPath = (p: string) => (p === folderPath ? {} : undefined);

      const result = await createFolderImpl(app, parents, foldername);
      expect(result).toEqual([...parents, foldername]);
    });

    test("should create folder if it does not exist", async () => {
      const app = new App();
      const parents = ["parent"];
      const foldername = "newFolder";

      let createdPath = "";
      app.vault.getFolderByPath = () => undefined;
      app.vault.createFolder = async (p: string) => {
        createdPath = p;
        return { path: p };
      };

      const result = await createFolderImpl(app, parents, foldername);
      expect(result).toEqual([...parents, foldername]);
      expect(createdPath).toBe(normalizePath([...parents, foldername].join("/")));
    });

  });

});
