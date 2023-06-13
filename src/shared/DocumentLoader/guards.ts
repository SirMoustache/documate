export const getIsFile = (file: unknown): file is File => {
  return file instanceof Blob && 'size' in file && 'type' in file;
};

export const getIsPdf = (file: File) => {
  return file.type === 'application/pdf';
};
