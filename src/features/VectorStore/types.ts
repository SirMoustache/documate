import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PineconeClient } from '@pinecone-database/pinecone';

export type VectorStore = PineconeStore;
export type VectorStoreClient = PineconeClient;
