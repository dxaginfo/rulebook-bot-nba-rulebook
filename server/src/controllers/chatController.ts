import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import aiService from '../services/aiService';
import { Message } from '../types/chat';

// In-memory chat history storage (for demo purposes)
// In production, this would be stored in a database
const chatHistory: Message[] = [];

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
      
      // Add user message to history
      const userMessage: Message = {
        id: uuidv4(),
        content,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      
      chatHistory.push(userMessage);
      
      // Generate AI response
      const response = await aiService.generateResponse(content, chatHistory);
      
      // Add bot message to history
      const botMessage: Message = {
        id: response.id,
        content: response.message,
        role: 'bot',
        timestamp: new Date().toISOString(),
        citations: response.citations
      };
      
      chatHistory.push(botMessage);
      
      return res.status(200).json(response);
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Failed to send message' });
    }
  },
  
  /**
   * Get chat history
   */
  getChatHistory: async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const limitedHistory = chatHistory.slice(-limit);
      
      return res.status(200).json({ messages: limitedHistory });
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
      // Clear the chat history array
      chatHistory.length = 0;
      
      return res.status(200).json({ message: 'Chat history cleared' });
    } catch (error) {
      console.error('Error clearing chat history:', error);
      return res.status(500).json({ message: 'Failed to clear chat history' });
    }
  }
};

export default chatController;