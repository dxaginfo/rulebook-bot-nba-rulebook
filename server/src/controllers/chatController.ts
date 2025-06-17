import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatResponse } from '../types/chat';
import ruleService from '../services/ruleService';
import aiService from '../services/aiService';

// In-memory store for chat history (would use a database in production)
let chatHistory: Message[] = [];

/**
 * Chat controller for handling chat-related requests
 */
const chatController = {
  /**
   * Send a message to the chatbot and get a response
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
      
      // Generate bot response
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
      
      // Return response
      return res.status(200).json(response);
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Failed to process message' });
    }
  },
  
  /**
   * Get chat history
   */
  getChatHistory: (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 50;
      const messages = chatHistory.slice(-limit);
      
      return res.status(200).json({ messages });
    } catch (error) {
      console.error('Error getting chat history:', error);
      return res.status(500).json({ message: 'Failed to get chat history' });
    }
  },
  
  /**
   * Clear chat history
   */
  clearChatHistory: (req: Request, res: Response) => {
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