export const FILE = "file" as const;
export const FOLDER = "folder" as const;
/**
 *  Interface FolderStructure
 */
export interface FolderStructure {
  type: typeof FILE | typeof FOLDER;
  namepattern: string;
  template?: string;
  description?: string;
  children?: FolderStructure[];
}
