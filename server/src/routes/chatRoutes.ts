import express from 'express';
import aiService from '../services/aiService';
import { Message } from '../types/chat';

const router = express.Router();

// In-memory store for chat history (in a real app, this would be stored in a database)
let chatHistory: Message[] = [];

// POST - Send a message to the chatbot
router.post('/message', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    // Add user message to history
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    
    chatHistory.push(userMessage);
    
    // Generate response
    const botResponse = await aiService.generateResponse(content, chatHistory);
    
    // Add bot response to history
    const botMessage: Message = {
      id: botResponse.id,
      content: botResponse.message,
      role: 'bot',
      timestamp: new Date().toISOString(),
      citations: botResponse.citations
    };
    
    chatHistory.push(botMessage);
    
    res.json(botResponse);
  } catch (error) {
    console.error('Error in chat message endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get chat history
router.get('/history', (req, res) => {
  try {
    res.json({ messages: chatHistory });
  } catch (error) {
    console.error('Error getting chat history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE - Clear chat history
router.delete('/history', (req, res) => {
  try {
    chatHistory = [];
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;