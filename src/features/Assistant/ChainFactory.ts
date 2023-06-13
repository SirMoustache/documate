import { BaseLLM } from 'langchain/llms/base';
import {
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
} from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';

import { VectorStore } from '../VectorStore';
import {
  CONTEXT_KEY,
  INPUT_KEY,
  MEMORY_KEY,
  NO_RESPONSE_TOKEN,
  OUTPUT_KEY,
  SUCCESS_RESPONSE_TOKEN,
} from './config';

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
If the question is not related to the context, sarcastically respond that you are tuned to only answer questions that are related to the context and add ${NO_RESPONSE_TOKEN} token as a prefix to the response message.
If the question is not related to the context, add ${NO_RESPONSE_TOKEN} token as a prefix to the response message.
Add ${NO_RESPONSE_TOKEN} token as a prefix to any response message that is not related to the context.
Add ${SUCCESS_RESPONSE_TOKEN} as a prefix to the response message if you are able to provide a helpful answer.

{${CONTEXT_KEY}}

Question: {${INPUT_KEY}}
Helpful answer in markdown:`;

const qaChainPromptTemplate = new PromptTemplate({
  template: QA_PROMPT,
  inputVariables: [INPUT_KEY, CONTEXT_KEY],
});

export const makeQAChain = async (model: BaseLLM, vectorStore: VectorStore) => {
  const qaChain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    inputKey: INPUT_KEY,
    returnSourceDocuments: true,
    prompt: qaChainPromptTemplate,
  });

  return qaChain;
};

export const makeConversationalChain = async (
  model: BaseLLM,
  vectorStore: VectorStore,
) => {
  const memory = new BufferMemory({
    memoryKey: MEMORY_KEY, // Must be set to "chat_history"
    inputKey: INPUT_KEY,
    outputKey: OUTPUT_KEY,
    returnMessages: true,
  });

  const conversationalChain = ConversationalRetrievalQAChain.fromLLM(
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
      inputKey: INPUT_KEY,
      outputKey: OUTPUT_KEY,
    },
  );

  return conversationalChain;
};
