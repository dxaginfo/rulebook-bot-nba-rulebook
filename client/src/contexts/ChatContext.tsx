import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message } from '../types/chat';
import chatService from '../services/chatService';

interface ChatContextProps {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
}

const ChatContext = createContext<ChatContextProps>({
  messages: [],
  loading: false,
  sendMessage: async () => {},
  clearChat: async () => {}
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await chatService.getChatHistory();
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };
    
    loadChatHistory();
  }, []);
  
  const sendMessage = async (content: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Add user message to UI immediately
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        content,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Send to API and get response
      const response = await chatService.sendMessage(content);
      
      // Add bot response to UI
      const botMessage: Message = {
        id: response.id,
        content: response.message,
        role: 'bot',
        timestamp: new Date().toISOString(),
        citations: response.citations
      };
      
      setMessages(prevMessages => [
        ...prevMessages.filter(msg => msg.id !== userMessage.id),
        userMessage,
        botMessage
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error - could add an error message to the UI
    } finally {
      setLoading(false);
    }
  };
  
  const clearChat = async (): Promise<void> => {
    try {
      await chatService.clearChatHistory();
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };
  
  return (
    <ChatContext.Provider 
      value={{
        messages,
        loading,
        sendMessage,
        clearChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);