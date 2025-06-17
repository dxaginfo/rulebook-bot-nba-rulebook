import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Button,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageBubble from './MessageBubble';
import { useChat } from '../contexts/ChatContext';

const ChatInterface: React.FC = () => {
  const { messages, loading, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (input.trim() && !loading) {
      sendMessage(input.trim());
      setInput('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearChat();
    }
  };
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 2
      }}
    >
      {/* Chat header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            NBA RuleBook Assistant
          </Typography>
          
          <Button 
            size="small"
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleClearChat}
            disabled={messages.length === 0}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>
      
      {/* Messages container */}
      <Box 
        sx={{ 
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'grey.50'
        }}
      >
        {messages.length === 0 ? (
          <Box 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              textAlign: 'center',
              p: 3,
              opacity: 0.7
            }}
          >
            <Typography variant="h6" gutterBottom>
              Welcome to RuleBook Bot!
            </Typography>
            <Typography variant="body1">
              Ask me anything about NBA rules, violations, court dimensions, timing, or scoring.
            </Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={endOfMessagesRef} />
      </Box>
      
      {/* Input area */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: '1px solid', 
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center' 
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask about NBA rules..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            multiline
            maxRows={4}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          
          <IconButton 
            color="primary" 
            onClick={handleSendMessage} 
            disabled={!input.trim() || loading}
            sx={{ ml: 1, p: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
        
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ mt: 1, display: 'block', textAlign: 'center' }}
        >
          Ask questions like "What is a traveling violation?" or "How does the shot clock work?"
        </Typography>
      </Box>
    </Paper>
  );
};

export default ChatInterface;