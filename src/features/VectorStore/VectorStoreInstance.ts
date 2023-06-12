import { PineconeClient } from '@pinecone-database/pinecone';

import { VectorStoreClient, VectorStore } from './types';
import { PINECONE_API_KEY, PINECONE_ENVIRONMENT } from './config';
import { makeVectorStoreClient } from './VectorStoreClientFactory';
import { makeVectorStore } from './VectorStoreFactory';

let vectorStore: VectorStore;

export const getVectorStore = async (): Promise<VectorStore> => {
  if (!vectorStore) {
    const vectorStoreClient = await makeVectorStoreClient();
    vectorStore = await makeVectorStore(vectorStoreClient);
  }

  return vectorStore;
};
