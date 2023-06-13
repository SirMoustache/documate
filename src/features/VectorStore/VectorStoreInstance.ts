import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { RawDocument } from '@docu/shared/DocumentLoader';

import { VectorStore } from './types';
import { makeVectorStore } from './VectorStoreFactory';
import { getVectorStoreClient } from './VectorStoreClientInstance';
import {
  OPEN_AI_API_KEY,
  PINECONE_INDEX_NAME,
  PINECONE_NAME_SPACE,
  PINECONE_TEXT_KEY,
} from './config';

let vectorStore: VectorStore;

export const getVectorStore = async (): Promise<VectorStore> => {
  if (!vectorStore) {
    const vectorStoreClient = await getVectorStoreClient();
    vectorStore = await makeVectorStore(vectorStoreClient);
  }

  return vectorStore;
};

/**
 * Embedding document to existing index
 */
export const trainVectorStore = async (
  documents: RawDocument[],
): Promise<VectorStore> => {
  const vectorStoreClient = await getVectorStoreClient();

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPEN_AI_API_KEY });
  const index = vectorStoreClient.Index(PINECONE_INDEX_NAME);

  return await PineconeStore.fromDocuments(documents, embeddings, {
    pineconeIndex: index,
    namespace: PINECONE_NAME_SPACE,
    textKey: PINECONE_TEXT_KEY,
  });
};

/**
 * Delete all vectors in the namespace
 */
export const resetVectorStore = async (): Promise<{}> => {
  const vectorStoreClient = await getVectorStoreClient();

  const index = vectorStoreClient.Index(PINECONE_INDEX_NAME);

  return await index._delete({
    deleteRequest: {
      deleteAll: true,
      namespace: PINECONE_NAME_SPACE,
    },
  });
};
