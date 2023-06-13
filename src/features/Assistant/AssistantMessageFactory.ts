import { RawDocument } from '@docu/shared/DocumentLoader';
import { NO_RESPONSE_TOKEN, SUCCESS_RESPONSE_TOKEN } from './config';
import { AssistantMessage } from './types';

export const getHasNoResponseToken = (text: string) => {
  const testRegex = new RegExp(`^${NO_RESPONSE_TOKEN}`);

  return testRegex.test(text);
};

export const getResponseWithoutNoResponseToken = (text: string) => {
  const testRegex = new RegExp(`^${NO_RESPONSE_TOKEN}`);

  return text.replace(testRegex, '').trim();
};

export const getHasSuccessResponseToken = (text: string) => {
  const testRegex = new RegExp(`^${SUCCESS_RESPONSE_TOKEN}`);

  return testRegex.test(text);
};

export const getResponseWithoutSuccessResponseToken = (text: string) => {
  const testRegex = new RegExp(`^${SUCCESS_RESPONSE_TOKEN}`);

  return text.replace(testRegex, '').trim();
};

export type MakeResponseMessageConfig = {
  text: string;
  retrievedFromContext: boolean;
  sourceDocuments: RawDocument[];
};

export const makeResponseMessage = ({
  text,
  retrievedFromContext,
  sourceDocuments,
}: MakeResponseMessageConfig): AssistantMessage => {
  const responseMessage: AssistantMessage = {
    text,
    retrievedFromContext,
    sourceDocuments,
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
    sourceDocuments: [],
  };

  return responseMessage;
};

export type MakeSuccessResponseMessageConfig = {
  text: string;
  sourceDocuments: RawDocument[];
};

export const makeSuccessResponseMessage = ({
  text,
  sourceDocuments,
}: MakeSuccessResponseMessageConfig): AssistantMessage => {
  const normalizedText = getResponseWithoutSuccessResponseToken(text);

  const responseMessage: AssistantMessage = {
    text: normalizedText,
    retrievedFromContext: true,
    sourceDocuments: sourceDocuments,
  };

  return responseMessage;
};
