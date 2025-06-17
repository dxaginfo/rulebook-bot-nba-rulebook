import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Paper, Typography, CircularProgress } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../../types/chat';
import { fetchChatHistory, sendMessage, clearConversation } from '../../services/api';

/**
 * Main chat interface container component
 */
const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setLoading(true);
        const history = await fetchChatHistory();
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Handle sending a new message
   * @param text Message text to send
   */
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to state immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    try {
      setLoading(true);
      
      // Show typing indicator
      const tempBotMessage: Message = {
        id: 'typing-indicator',
        content: '',
        role: 'bot',
        timestamp: new Date().toISOString(),
        isTyping: true,
      };
      
      setMessages(prevMessages => [...prevMessages, tempBotMessage]);
      
      // Send message to API
      const response = await sendMessage(text);
      
      // Remove typing indicator and add actual response
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'typing-indicator');
        
        const botMessage: Message = {
          id: response.id || Date.now().toString(),
          content: response.message,
          role: 'bot',
          timestamp: new Date().toISOString(),
          citations: response.citations,
        };
        
        return [...filteredMessages, botMessage];
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Remove typing indicator and add error message
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'typing-indicator');
        
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: 'Sorry, I encountered an error. Please try again.',
          role: 'bot',
          timestamp: new Date().toISOString(),
          isError: true,
        };
        
        return [...filteredMessages, errorMessage];
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear the conversation history
   */
  const handleClearConversation = async () => {
    try {
      await clearConversation();
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear conversation:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          height: '80vh', 
          display: 'flex', 
          flexDirection: 'column',
          mt: 4,
          overflow: 'hidden',
          borderRadius: 2
        }}
      >
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">NBA Rulebook Bot</Typography>
          <Typography 
            variant="body2" 
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={handleClearConversation}
          >
            Clear Chat
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages.length === 0 ? (
            <Box 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                color: 'text.secondary'
              }}
            >
              <Typography variant="h6">Welcome to the NBA Rulebook Bot!</Typography>
              <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                Ask me any question about NBA rules, and I'll help you understand them.
              </Typography>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Examples:
              </Typography>
              <Typography variant="body2" align="center">
                "What constitutes a travel violation?"
              </Typography>
              <Typography variant="body2" align="center">
                "Explain the clear path foul rule"
              </Typography>
              <Typography variant="body2" align="center">
                "When is a player allowed to reestablish position in the post?"
              </Typography>
            </Box>
          ) : (
            <MessageList messages={messages} />
          )}
          <div ref={messagesEndRef} />
        </Box>
        
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <MessageInput onSendMessage={handleSendMessage} disabled={loading} />
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatContainer;