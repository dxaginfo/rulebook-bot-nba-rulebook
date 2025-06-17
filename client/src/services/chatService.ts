import axios from 'axios';
import { Message, ChatResponse } from '../types/chat';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Service for chat-related API calls
 */
const chatService = {
  /**
   * Send a message to the chatbot
   * @param content Message content
   * @returns Chat response from the API
   */
  sendMessage: async (content: string): Promise<ChatResponse> => {
    try {
      const response = await axios.post(`${API_URL}/api/chat/message`, { content });
      return response.data;
    } catch (error) {
      console.error('API error when sending message:', error);
      throw error;
    }
  },
  
  /**
   * Get chat history
   * @param limit Maximum number of messages to retrieve
   * @returns Array of chat messages
   */
  getChatHistory: async (limit = 50): Promise<Message[]> => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/history`, {
        params: { limit }
      });
      return response.data.messages;
    } catch (error) {
      console.error('API error when getting chat history:', error);
      return [];
    }
  },
  
  /**
   * Clear chat history
   */
  clearChatHistory: async (): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/api/chat/history`);
    } catch (error) {
      console.error('API error when clearing chat history:', error);
      throw error;
    }
  }
};

export default chatService;