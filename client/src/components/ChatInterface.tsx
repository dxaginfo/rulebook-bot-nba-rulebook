import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MessageBubble from './MessageBubble';
import { useChat } from '../contexts/ChatContext';

/**
 * Main chat interface component
 */
const ChatInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, loading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    await sendMessage(inputValue);
    setInputValue('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Sample suggested questions
  const suggestedQuestions = [
    'What is a traveling violation?',
    'Can you explain the shot clock rules?',
    'What are the rules for goaltending?',
    'How long is the NBA court?'
  ];
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%' 
    }}>
      {/* Chat messages container */}
      <Paper 
        elevation={0} 
        sx={{
          flexGrow: 1,
          mb: 2,
          p: 2,
          overflow: 'auto',
          bgcolor: '#f5f7f9',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Welcome message when no messages */}
        {messages.length === 0 && (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center'
            }}
          >
            <SportsBasketballIcon 
              sx={{ 
                fontSize: 80, 
                color: 'primary.main',
                mb: 2,
                animation: 'bounce 2s infinite'
              }} 
            />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              NBA RuleBook Bot
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '600px' }}>
              Ask me any question about NBA rules! I'll provide answers based on the official NBA rulebook
              with citations so you can reference the exact rule.
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Try asking:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {suggestedQuestions.map((question, index) => (
                <Button 
                  key={index}
                  variant="outlined" 
                  size="small"
                  onClick={() => {
                    setInputValue(question);
                  }}
                >
                  {question}
                </Button>
              ))}
            </Box>
          </Box>
        )}
        
        {/* Render messages */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Loading indicator */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={30} />
          </Box>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </Paper>
      
      {/* Input area */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          borderRadius: 2, 
          display: 'flex', 
          alignItems: 'center', 
          position: 'relative'
        }}
      >
        {messages.length > 0 && (
          <Tooltip title="Clear conversation">
            <IconButton 
              color="error" 
              sx={{ mr: 1 }}
              onClick={() => {
                if (window.confirm('Are you sure you want to clear the conversation?')) {
                  clearChat();
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        
        <TextField 
          fullWidth
          multiline
          maxRows={4}
          placeholder="Ask about NBA rules..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />
        
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={loading || inputValue.trim() === ''}
          sx={{ ml: 2, height: 54, px: 3 }}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatInterface;