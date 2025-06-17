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
   * @returns ChatResponse from the server
   */
  sendMessage: async (content: string): Promise<ChatResponse> => {
    try {
      const response = await axios.post(`${API_URL}/api/chat/message`, { content });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  /**
   * Get chat history
   * @returns Array of messages
   */
  getChatHistory: async (): Promise<Message[]> => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/history`);
      return response.data.messages;
    } catch (error) {
      console.error('Error getting chat history:', error);
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
      console.error('Error clearing chat history:', error);
      throw error;
    }
  }
};

export default chatService;