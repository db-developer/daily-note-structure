// src/test/__mocks__/obsidian.ts
export class App {
  vault: any = {
    getFolderByPath: () => undefined,
    createFolder: async (path: string) => ({ path }),
    getFileByPath: () => undefined,
    create: async (path: string, data: string) => ({ path, data }),
    getAbstractFileByPath: () => undefined,
    read: async (file: any) => "",
  };
}
export class Plugin {
  async loadData(): Promise<any> {
    return null;
  }
}
export class TFile {
  path: string = "";
}

export const normalizePath = (p: string) => p;

import momentCJS     from "moment";
/**
 * Re-export real moment as provided by Obsidian.
 *
 * - moment is a callable function
 * - moment(...) returns a real Moment instance
 * - moment.Moment exists as a type/runtime reference
 */
export const moment = momentCJS as unknown as typeof import("moment");
