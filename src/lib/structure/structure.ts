export const FILE = "file";
export const FOLDER = "folder";
/**
 *  Interface FolderStructure
 */
export interface FolderStructure {
  type: "file" | "folder";
  namepattern: string;
  template?: string;
  description?: string;
  children?: FolderStructure[];
}
