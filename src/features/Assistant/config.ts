export const OPEN_AI_API_KEY = process.env.OPENAI_API_KEY ?? '';

export const INPUT_KEY = 'question';
export const OUTPUT_KEY = 'text';
export const MEMORY_KEY = 'chat_history';
export const CONTEXT_KEY = 'context';

export const NO_RESPONSE_TOKEN = '__FAILED_TO_GENERATE_RESPONSE__';
export const SUCCESS_RESPONSE_TOKEN = '__SUCCESS_TO_GENERATE_RESPONSE__';
