// src/test/02.06.execute.default.createFileImpl.test.ts

// imports <for the tests>
import   path            from "path";
import { fileURLToPath } from "url";
import { App, TFile, normalizePath } from "obsidian";

// imports <for the first describe>
import { createFileImpl } from "../../lib/actions/execute.default";

/**
 * Tests for createFileImpl()
 * Ensures files are returned if existing or created if missing.
 */
describe(`Running ${(fileURLToPath(import.meta.url).split(path.sep).join("/").split("/test/")[1] || fileURLToPath(import.meta.url))}`, () => {

  describe("Testing createFileImpl", () => {

    test("should import createFileImpl function successfully", () => {
      expect(createFileImpl).toBeDefined();
      expect(typeof createFileImpl).toBe("function");
    });

    test("should return existing file if it already exists", async () => {
      const app = new App();
      const parents = ["parent"];
      const filename = "existingFile.md";

      const existingFile = new TFile();
      existingFile.path = normalizePath([...parents, filename].join("/"));

      app.vault.getFileByPath = (p: string) =>
        p === existingFile.path ? existingFile : undefined;

      const result = await createFileImpl(app, parents, filename, "data");
      expect(result).toBe(existingFile);
    });

    test("should create file if it does not exist", async () => {
      const app = new App();
      const parents = ["parent"];
      const filename = "newFile.md";

      let createdPath = "";
      let createdData = "";
      app.vault.getFileByPath = () => undefined;
      app.vault.create = async (p: string, data: string) => {
        createdPath = p;
        createdData = data;
        return { path: p, data } as TFile;
      };

      const content = "Hello World!";
      const result = await createFileImpl(app, parents, filename, content);

      expect(result).toBeDefined();
      expect((result as TFile).path).toBe(normalizePath([...parents, filename].join("/")));
      expect(createdPath).toBe(normalizePath([...parents, filename].join("/")));
      expect(createdData).toBe(content);
    });

  });

});
