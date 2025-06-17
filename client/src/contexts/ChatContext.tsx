import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { Message, ChatResponse } from '../types/chat';

interface ChatContextProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch chat history on component mount
  React.useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('/api/chat/history');
        setMessages(response.data.messages);
      } catch (err) {
        console.error('Error fetching chat history:', err);
        // Don't set error, just log it as this is initial load
      }
    };
    
    fetchChatHistory();
  }, []);
  
  // Send a message to the chat API
  const sendMessage = useCallback(async (content: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add user message to UI immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Send to API
      const response = await axios.post<ChatResponse>('/api/chat/message', { content });
      
      // Add bot response to messages
      const botMessage: Message = {
        id: response.data.id,
        content: response.data.message,
        role: 'bot',
        timestamp: new Date().toISOString(),
        citations: response.data.citations
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Clear chat history
  const clearChat = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete('/api/chat/history');
      setMessages([]);
    } catch (err) {
      console.error('Error clearing chat:', err);
      setError('Failed to clear chat history. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const value = {
    messages,
    loading,
    error,
    sendMessage,
    clearChat
  };
  
  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};