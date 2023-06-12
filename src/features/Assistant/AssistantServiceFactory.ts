import { OpenAI } from 'langchain/llms/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';

import {
  VectorStore,
  trainVectorStore,
  resetVectorStore,
} from '../VectorStore';

import { AssistantMessage, PromptMessage } from './types';
import { assertIsValidRawAssistantMessage } from './AssistantMessageValidator';
import {
  getHasNoResponseToken,
  makeNoResponseMessage,
  makeResponseMessage,
} from './AssistantMessageFactory';
import {
  CONTEXT_KEY,
  INPUT_KEY,
  MEMORY_KEY,
  NO_RESPONSE_TOKEN,
  OPEN_AI_API_KEY,
  OUTPUT_KEY,
} from './config';
import { Document, DocumentSchema } from '@docu/shared/DocumentLoader';

export type AssistantService = {
  getAnswer: (message: PromptMessage) => Promise<AssistantMessage>;
  train: (documents: Document<DocumentSchema>[]) => Promise<void>;
  reset: () => Promise<{}>;
};

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{${MEMORY_KEY}}
Follow Up Input: {${INPUT_KEY}}
Standalone question:`;

const QA_PROMPT = `You are a helpful but a little sarcastic AI assistant. 
Use the following pieces of context to answer the question at the end. 
If you don't know the answer, just say sarcastically you don't know. 
If you can not provide a helpful answer, add ${NO_RESPONSE_TOKEN} token as a prefix to the response message.
DO NOT try to make up an answer.
DO NOT ask for more context.
If the question is not related to the context, sarcastically respond that you are tuned to only answer questions that are related to the context.

{${CONTEXT_KEY}}

Question: {${INPUT_KEY}}
Helpful answer in markdown:`;

const qaChainPromptTemplate = new PromptTemplate({
  template: QA_PROMPT,
  inputVariables: [INPUT_KEY, CONTEXT_KEY],
});

export const makeAssistantService = async (
  vectorStore: VectorStore,
): Promise<AssistantService> => {
  const model = new OpenAI({
    openAIApiKey: OPEN_AI_API_KEY,
    temperature: 1, // increase temperature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const memory = new BufferMemory({
    memoryKey: MEMORY_KEY, // Must be set to "chat_history"
    inputKey: INPUT_KEY,
    outputKey: OUTPUT_KEY,
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      memory,
      /**
       * Options that allow you to customize the specific QA chain used in the final step
       */
      qaChainOptions: {
        prompt: qaChainPromptTemplate,
        type: 'stuff',
      },
      /**
       * Will use this template to generate a question from the conversation context
       * instead of using the question provided in the question parameter.
       * This can be useful if the original question does not contain enough
       * information to retrieve a suitable answer
       */
      questionGeneratorChainOptions: {
        template: CONDENSE_PROMPT,
      },
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
      //verbose: true,
    },
  );

  const getAnswer = async (
    message: PromptMessage,
  ): Promise<AssistantMessage> => {
    const { question } = message;
    const answer = await chain.call({ question });

    assertIsValidRawAssistantMessage(answer);

    const { text } = answer;
    const retrievedFromContext = !getHasNoResponseToken(text);

    if (!retrievedFromContext) {
      return makeNoResponseMessage({ text });
    }

    return makeResponseMessage({ text, retrievedFromContext: true });
  };

  const train = async (documents: Document<DocumentSchema>[]) => {
    await trainVectorStore(documents);
  };

  const reset = async () => {
    return await resetVectorStore();
  };

  return { getAnswer, train, reset };
};
