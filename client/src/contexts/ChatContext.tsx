import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { Message, ChatResponse } from '../types/chat';

interface ChatContextType {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock API URL - in a real app, this would be your actual API endpoint
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Send a message to the chatbot
  const sendMessage = useCallback(async (content: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add user message to chat
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Call API to get bot response
      // In a demo, we could simulate this with a mock response
      // const response = await axios.post<ChatResponse>(`${API_URL}/chat/message`, { content });
      
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine response based on message content (simulating AI response)
      let botResponse: ChatResponse;
      const lowercaseContent = content.toLowerCase();
      
      if (lowercaseContent.includes('travel') || lowercaseContent.includes('steps')) {
        botResponse = {
          id: Date.now().toString(),
          message: 'A traveling violation occurs when a player holding the ball moves one or both feet illegally. Once a player receives the ball or has stopped dribbling, they may not move their pivot foot or take more than two steps without dribbling the ball. The penalty is a turnover, with the opposing team getting the ball at the nearest sideline.',
          citations: ['Rule 10 - Violations and Penalties - Traveling']
        };
      } 
      else if (lowercaseContent.includes('shot clock')) {
        botResponse = {
          id: Date.now().toString(),
          message: 'The shot clock in the NBA is 24 seconds. Teams must attempt a field goal that hits the rim before the shot clock expires, or possession is awarded to the opposing team. The shot clock resets to 24 seconds on change of possession or when the ball hits the rim on a shot attempt. It resets to 14 seconds in certain situations, such as when the offensive team retains possession after an offensive rebound.',
          citations: ['Rule 7 - Timing - Shot Clock']
        };
      }
      else if (lowercaseContent.includes('goaltend')) {
        botResponse = {
          id: Date.now().toString(),
          message: 'Goaltending occurs when a player interferes with a shot during its downward flight, with a chance to go in. This includes touching the ball when it\'s above the rim level and has a chance to enter the basket, or touching the ball after it has touched the backboard when it is above the rim. When goaltending is called, the basket counts and points are awarded.',
          citations: ['Rule 11 - Basket Interference and Goaltending - Goaltending']
        };
      }
      else if (lowercaseContent.includes('dimensions') || lowercaseContent.includes('court size')) {
        botResponse = {
          id: Date.now().toString(),
          message: 'An NBA basketball court is 94 feet long and 50 feet wide (28.65 meters by 15.24 meters). The three-point line is 23 feet 9 inches from the center of the basket (22 feet in the corners). The free throw line is 15 feet from the backboard, and the key (free throw lane) is 16 feet wide.',
          citations: ['Rule 1 - Court Dimensions - Court Dimensions']
        };
      }
      else if (lowercaseContent.includes('personal foul') || lowercaseContent.includes('foul out')) {
        botResponse = {
          id: Date.now().toString(),
          message: 'NBA players are allowed a maximum of 6 personal fouls per game before "fouling out" and being disqualified from further participation in the game. After a team commits 5 fouls in a quarter, the opposing team enters the "bonus" situation and shoots free throws on all subsequent non-shooting fouls in that quarter.',
          citations: ['Rule 12 - Fouls and Penalties - Personal Fouls']
        };
      }
      else {
        // Default response
        botResponse = {
          id: Date.now().toString(),
          message: "I'm your NBA rules assistant. You can ask me about specific rules, violations, or procedures in professional basketball. For example, try asking about traveling violations, shot clock rules, or court dimensions."
        };
      }
      
      // Add bot response to chat
      const botMessage: Message = {
        id: botResponse.id,
        content: botResponse.message,
        role: 'bot',
        timestamp: new Date().toISOString(),
        citations: botResponse.citations
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
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
      setError(null);
      
      // Call API to clear chat history
      // In a real app, this would be an API call
      // await axios.delete(`${API_URL}/chat/history`);
      
      // Clear messages state
      setMessages([]);
    } catch (err) {
      console.error('Error clearing chat:', err);
      setError('Failed to clear chat. Please try again.');
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
  
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
