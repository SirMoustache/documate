import { VectorStoreClient } from './types';

import { makeVectorStoreClient } from './VectorStoreClientFactory';

let vectorStoreClient: VectorStoreClient;

export const getVectorStoreClient = async (): Promise<VectorStoreClient> => {
  if (!vectorStoreClient) {
    vectorStoreClient = await makeVectorStoreClient();
  }

  return vectorStoreClient;
};
