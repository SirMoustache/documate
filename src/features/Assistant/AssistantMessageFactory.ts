import { NO_RESPONSE_TOKEN } from './config';
import { AssistantMessage } from './types';

export const getHasNoResponseToken = (text: string) => {
  const testRegex = new RegExp(`^${NO_RESPONSE_TOKEN}`);

  return testRegex.test(text);
};

export const getResponseWithoutNoResponseToken = (text: string) => {
  const testRegex = new RegExp(`^${NO_RESPONSE_TOKEN}`);

  return text.replace(testRegex, '').trim();
};

export type MakeResponseMessageConfig = {
  text: string;
  retrievedFromContext: boolean;
};

export const makeResponseMessage = ({
  text,
  retrievedFromContext,
}: MakeResponseMessageConfig): AssistantMessage => {
  const responseMessage: AssistantMessage = {
    text,
    retrievedFromContext,
  };

  return responseMessage;
};

export type MakeNoResponseMessageConfig = {
  text: string;
};

export const makeNoResponseMessage = ({
  text,
}: MakeNoResponseMessageConfig): AssistantMessage => {
  const normalizedText = getResponseWithoutNoResponseToken(text);

  const responseMessage: AssistantMessage = {
    text: normalizedText,
    retrievedFromContext: false,
  };

  return responseMessage;
};
