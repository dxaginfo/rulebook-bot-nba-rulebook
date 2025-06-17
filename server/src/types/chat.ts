/**
 * Represents a chat message
 */
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: string;
  citations?: string[];
}

/**
 * Response from the chat API
 */
export interface ChatResponse {
  id: string;
  message: string;
  citations?: string[];
}

/**
 * Response for chat history
 */
export interface ChatHistoryResponse {
  messages: Message[];
}