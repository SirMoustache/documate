import { PineconeClient } from '@pinecone-database/pinecone';

import { VectorStoreClient } from './types';
import { PINECONE_API_KEY, PINECONE_ENVIRONMENT } from './config';

export const makeVectorStoreClient = async (): Promise<VectorStoreClient> => {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: PINECONE_ENVIRONMENT,
      apiKey: PINECONE_API_KEY,
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
};
