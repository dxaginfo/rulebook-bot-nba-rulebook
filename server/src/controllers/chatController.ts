import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import aiService from '../services/aiService';
import { Message } from '../types/chat';

// In-memory chat history for demo purposes
let chatHistory: Message[] = [];

const chatController = {
  /**
   * Send a message to the chatbot
   */
  sendMessage: async (req: Request, res: Response) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: 'Message content is required' });
      }
      
      // Create and store user message
      const userMessage: Message = {
        id: uuidv4(),
        content,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      
      chatHistory.push(userMessage);
      
      // Generate AI response
      const response = await aiService.generateResponse(content, chatHistory);
      
      // Create and store bot message
      const botMessage: Message = {
        id: response.id,
        content: response.message,
        role: 'bot',
        timestamp: new Date().toISOString(),
        citations: response.citations
      };
      
      chatHistory.push(botMessage);
      
      // Return response to client
      return res.status(200).json({
        id: response.id,
        message: response.message,
        citations: response.citations
      });
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Failed to process message' });
    }
  },
  
  /**
   * Get chat history
   */
  getChatHistory: async (req: Request, res: Response) => {
    try {
      return res.status(200).json({ messages: chatHistory });
    } catch (error) {
      console.error('Error getting chat history:', error);
      return res.status(500).json({ message: 'Failed to get chat history' });
    }
  },
  
  /**
   * Clear chat history
   */
  clearChatHistory: async (req: Request, res: Response) => {
    try {
      chatHistory = [];
      return res.status(200).json({ message: 'Chat history cleared' });
    } catch (error) {
      console.error('Error clearing chat history:', error);
      return res.status(500).json({ message: 'Failed to clear chat history' });
    }
  }
};

export default chatController;