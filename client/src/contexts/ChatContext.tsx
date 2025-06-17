import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, ChatResponse } from '../types/chat';
import chatService from '../services/chatService';

interface ChatContextType {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

/**
 * Provider component for chat functionality
 */
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setLoading(true);
        const history = await chatService.getChatHistory();
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadChatHistory();
  }, []);
  
  /**
   * Send a message and get a response
   */
  const sendMessage = async (content: string) => {
    try {
      // Add user message to state
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setLoading(true);
      
      // Get response from API
      const response = await chatService.sendMessage(content);
      
      // Add bot response to state
      const botMessage: Message = {
        id: response.id,
        content: response.message,
        role: 'bot',
        timestamp: new Date().toISOString(),
        citations: response.citations
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        role: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Clear chat history
   */
  const clearChat = async () => {
    try {
      setLoading(true);
      await chatService.clearChatHistory();
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ChatContext.Provider value={{ messages, loading, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

/**
 * Hook to use the chat context
 */
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  
  return context;
};