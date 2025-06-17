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
 * Chat response from API
 */
export interface ChatResponse {
  id: string;
  message: string;
  citations?: string[];
}