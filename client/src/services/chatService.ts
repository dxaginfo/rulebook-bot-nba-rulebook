import axios from 'axios';
import { Message, ChatResponse, ChatHistoryResponse } from '../types/chat';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Service for interacting with chat-related API endpoints
 */
class ChatService {
  /**
   * Get chat history
   * @param limit Maximum number of messages to retrieve
   * @returns Promise with array of messages
   */
  async getChatHistory(limit: number = 50): Promise<Message[]> {
    try {
      const response = await axios.get<ChatHistoryResponse>(`${API_URL}/api/chat/history`, {
        params: { limit }
      });
      return response.data.messages;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  }

  /**
   * Send a message to the chat API
   * @param content Message content
   * @returns Promise with response data
   */
  async sendMessage(content: string): Promise<ChatResponse> {
    try {
      const response = await axios.post<ChatResponse>(`${API_URL}/api/chat/message`, {
        content
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Clear chat history
   * @returns Promise indicating success
   */
  async clearChatHistory(): Promise<void> {
    try {
      await axios.delete(`${API_URL}/api/chat/history`);
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }
  }
}

export default new ChatService();