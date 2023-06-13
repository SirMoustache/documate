export type PromptMessage = { question: string };

export type AssistantMessage = {
  text: string;
  retrievedFromContext: boolean;
  sourceDocuments: any[];
};

export type RawAssistantMessage = { text: string; sourceDocuments: any[] };
