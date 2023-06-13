import { OpenAI } from 'langchain/llms/openai';

import { Document, DocumentMeta } from '@docu/shared/DocumentLoader';
import {
  VectorStore,
  trainVectorStore,
  resetVectorStore,
} from '../VectorStore';

import { AssistantMessage, PromptMessage } from './types';
import { assertIsValidRawAssistantMessage } from './AssistantMessageValidator';
import {
  getHasSuccessResponseToken,
  makeNoResponseMessage,
  makeSuccessResponseMessage,
} from './AssistantMessageFactory';
import { makeQAChain } from './ChainFactory';
import { OPEN_AI_API_KEY } from './config';

type TrainPayload = {
  documents: Document<DocumentMeta>[];
};

export type AssistantService = {
  getAnswer: (message: PromptMessage) => Promise<AssistantMessage>;
  train: (trainPayload: TrainPayload) => Promise<void>;
  reset: () => Promise<{}>;
};

export const makeAssistantService = async (
  vectorStore: VectorStore,
): Promise<AssistantService> => {
  const model = new OpenAI({
    openAIApiKey: OPEN_AI_API_KEY,
    temperature: 1, // increase temperature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = await makeQAChain(model, vectorStore);

  const getAnswer = async (
    message: PromptMessage,
  ): Promise<AssistantMessage> => {
    const { question } = message;
    const answer = await chain.call({ question });
    assertIsValidRawAssistantMessage(answer);

    const { text, sourceDocuments } = answer;

    const retrievedFromContext = getHasSuccessResponseToken(text);

    if (retrievedFromContext) {
      return makeSuccessResponseMessage({ text, sourceDocuments });
    }

    return makeNoResponseMessage({ text });
  };

  const train = async ({ documents }: TrainPayload) => {
    await trainVectorStore(documents);
  };

  const reset = async () => {
    return await resetVectorStore();
  };

  return { getAnswer, train, reset };
};
