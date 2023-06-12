import {
  AssistantService,
  makeAssistantService,
} from './AssistantServiceFactory';
import { getVectorStore } from '../VectorStore';

let assistantService: AssistantService;

export const getAssistantService = async (): Promise<AssistantService> => {
  if (!assistantService) {
    const vectorStore = await getVectorStore();
    assistantService = await makeAssistantService(vectorStore);
  }

  return assistantService;
};
