import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { VectorStore, VectorStoreClient } from './types';
import {
  OPEN_AI_API_KEY,
  PINECONE_INDEX_NAME,
  PINECONE_NAME_SPACE,
  PINECONE_TEXT_KEY,
} from './config';

export const makeVectorStore = async (
  client: VectorStoreClient,
): Promise<VectorStore> => {
  const index = client.Index(PINECONE_INDEX_NAME);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: OPEN_AI_API_KEY }),
    {
      pineconeIndex: index,
      textKey: PINECONE_TEXT_KEY,
      namespace: PINECONE_NAME_SPACE,
    },
  );

  return vectorStore;
};
