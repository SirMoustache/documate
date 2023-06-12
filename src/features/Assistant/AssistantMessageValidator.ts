import { RawAssistantMessage } from './types';

export function assertIsValidRawAssistantMessage(
  value: unknown,
): asserts value is RawAssistantMessage {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Invalid AssistantMessage');
  }

  if (!('text' in value)) {
    throw new Error('Missing text property on AssistantMessage');
  }
}
