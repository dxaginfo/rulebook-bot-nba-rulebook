import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Divider,
  InputAdornment,
  Button,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MessageBubble from './MessageBubble';
import { useChat } from '../contexts/ChatContext';

const ChatInterface: React.FC = () => {
  const { messages, loading, sendMessage, clearChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() && !loading) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleClearChat = () => {
    clearChat();
  };
  
  const getSampleQuestions = () => [
    'What is a traveling violation?',
    'How does the shot clock work?',
    'What are the dimensions of an NBA court?',
    'What is goaltending?',
    'How many personal fouls are players allowed?'
  ];
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Chat Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Chat with RuleBook Bot</Typography>
        
        <Tooltip title="Clear conversation history">
          <IconButton 
            onClick={handleClearChat}
            disabled={messages.length === 0}
            color="default"
            size="small"
          >
            <DeleteSweepIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Chat Messages */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'grey.50'
        }}
      >
        {messages.length === 0 ? (
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              px: 2
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2, opacity: 0.8 }} />
            <Typography variant="h6" gutterBottom>
              Welcome to RuleBook Bot
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Ask me any question about NBA rules and regulations.
            </Typography>
            
            <Box sx={{ width: '100%', maxWidth: 600, mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Try asking:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {getSampleQuestions().map((question, index) => (
                  <Button 
                    key={index}
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setInputValue(question);
                      // Focus on input after setting value
                      setTimeout(() => {
                        document.getElementById('chat-input')?.focus();
                      }, 100);
                    }}
                    sx={{ 
                      borderRadius: 4,
                      textTransform: 'none',
                      py: 0.5,
                      px: 1.5,
                      mb: 1
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>
      
      {/* Chat Input */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <TextField
          id="chat-input"
          fullWidth
          variant="outlined"
          placeholder="Type your question about NBA rules..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || loading}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
          {loading ? 'RuleBook Bot is thinking...' : 'Ask any question about NBA rules and regulations'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ChatInterface;