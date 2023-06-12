export type PromptMessage = { question: string };

export type AssistantMessage = {
  text: string;
  retrievedFromContext: boolean;
};

export type RawAssistantMessage = { text: string };
