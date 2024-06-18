/**
 *  Interface FolderStructure
 */
export interface FolderStructure {
  type: "folder" | "file";
  namepattern: string;
  template?: string;
  description?: string;
  children?: FolderStructure[];
}
