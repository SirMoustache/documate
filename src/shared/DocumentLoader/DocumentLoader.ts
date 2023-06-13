import { PDFLoader } from './loaders';
import { getIsPdf } from './guards';
import { Document, RawDocument, DocumentMeta } from './Document';

const getLoader = (file: File) => {
  if (getIsPdf(file)) {
    return new PDFLoader();
  }

  throw new Error('Unsupported file type');
};

const mapRawDocToDocWithMeta =
  (file: File) =>
  (rawDoc: RawDocument): Document<DocumentMeta> => {
    const metadata = {
      ...rawDoc.metadata,
      originalName: file.name,
    } satisfies DocumentMeta;

    const document = { ...rawDoc, metadata } satisfies Document<DocumentMeta>;

    return document;
  };

export const loadFiles = async (
  files: File[],
): Promise<Document<DocumentMeta>[]> => {
  const result: Document<DocumentMeta>[] = [];

  for (const file of files) {
    const loader = getLoader(file);

    const docs = (await loader.load(file)).map(mapRawDocToDocWithMeta(file));

    result.push(...docs);
  }

  return result;
};
