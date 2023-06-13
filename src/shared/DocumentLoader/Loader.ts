export type Loader = {
  load: (file: File) => Promise<Record<string, any>[]>;
};
