/**
 * Chat message interface
 */
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: string;
  citations?: string[];
}

/**
 * Chat response sent to client
 */
export interface ChatResponse {
  id: string;
  message: string;
  citations?: string[];
}