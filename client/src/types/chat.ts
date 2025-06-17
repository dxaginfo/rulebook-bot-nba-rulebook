/**
 * Type definitions for chat functionality
 */

/**
 * Represents a chat message
 */
export interface Message {
  /**
   * Unique identifier for the message
   */
  id: string;
  
  /**
   * Message content
   */
  content: string;
  
  /**
   * Message role (user or bot)
   */
  role: 'user' | 'bot';
  
  /**
   * Timestamp when the message was created
   */
  timestamp: string;
  
  /**
   * Optional array of rule citations referenced in the message
   */
  citations?: string[];
  
  /**
   * Flag indicating if this is a typing indicator
   */
  isTyping?: boolean;
  
  /**
   * Flag indicating if this message represents an error
   */
  isError?: boolean;
}