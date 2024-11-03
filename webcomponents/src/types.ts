export type ComponentType =
  | 'textBlock'
  | 'input'
  | 'inputWithFileBtn'
  | 'inputWithFolderBtn'
  | 'textarea'
  | 'passwordBox'
  | 'dropdown'
  | 'checkbox';

export interface ComponentAttributes {
  name?: string;
  label?: string;
  description?: string;
  options?: string[];
  defaultValue?: string | boolean;
}
export interface ComponentData {
  id?: string;
  type: ComponentType;
  attributes: ComponentAttributes;
}
export interface FileData {
  body?: ComponentData[];
}

export interface ComponentDataWithId extends ComponentData {
  id?: string;
}

export type Theme = 'light' | 'dark';

export interface FlowPlugin {
  defaultIndex: number;
  ID: string;
  Name: string;
  Description: string;
  Author: string;
  Version: string;
  Language: 'csharp' | 'fsharp' | 'executable' | `${'javascript'|'typescript'|'python'}${'_v2'|''}`;
  UrlDownload: string;
  UrlSourceCode: string;
  IcoPath: string;
  DateAdded: string;
  LatestReleaseDate?: string;
}

declare global {
  interface Window {
    Prism: {
      highlightElement(el: HTMLElement): void;
    };
  }
}
