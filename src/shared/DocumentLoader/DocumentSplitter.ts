import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document, DocumentMeta } from './Document';

export type SplitDocumentsConfig = { chunkSize: number; chunkOverlap: number };

export const splitDocuments = async (
  inputDocuments: Document<DocumentMeta>[],
  config: SplitDocumentsConfig,
): Promise<Document<DocumentMeta>[]> => {
  const textSplitter = new RecursiveCharacterTextSplitter(config);

  const docs = (await textSplitter.splitDocuments(
    inputDocuments,
  )) as Document<DocumentMeta>[];

  return docs;
};
