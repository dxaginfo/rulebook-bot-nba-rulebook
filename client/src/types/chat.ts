/**
 * Interface for a chat message
 */
export interface Message {
  /**
   * Unique identifier for the message
   */
  id: string;
  
  /**
   * The message content
   */
  content: string;
  
  /**
   * The message role (user or bot)
   */
  role: 'user' | 'bot';
  
  /**
   * Timestamp when the message was created
   */
  timestamp: string;
  
  /**
   * Rule citations referenced in the message (for bot responses)
   */
  citations?: string[];
}

/**
 * Interface for the chat API response
 */
export interface ChatResponse {
  /**
   * Unique identifier for the message
   */
  id: string;
  
  /**
   * The response message content
   */
  message: string;
  
  /**
   * Rule citations referenced in the response
   */
  citations: string[];
}

/**
 * Interface for chat history response
 */
export interface ChatHistoryResponse {
  /**
   * Array of messages in the chat history
   */
  messages: Message[];
}