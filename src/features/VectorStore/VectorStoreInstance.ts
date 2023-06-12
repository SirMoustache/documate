import { VectorStore } from './types';

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
