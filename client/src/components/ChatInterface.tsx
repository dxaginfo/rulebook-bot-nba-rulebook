import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
  InputAdornment,
  Button,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MessageBubble from './MessageBubble';
import { useChat } from '../contexts/ChatContext';

const ChatInterface: React.FC = () => {
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  // Handle message send
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;
    
    await sendMessage(input);
    setInput('');
  };
  
  // Handle example question click
  const handleExampleClick = (question: string) => {
    setInput(question);
  };
  
  // Example questions
  const exampleQuestions = [
    'What is the shot clock rule in the NBA?',
    'Explain the traveling violation',
    'What are the NBA court dimensions?',
    'How many fouls before fouling out?',
    'What is goaltending?'
  ];
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6">NBA Rules Assistant</Typography>
        
        <IconButton 
          color="inherit" 
          onClick={clearChat}
          disabled={loading || messages.length === 0}
          aria-label="Clear chat"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      
      {/* Messages Area */}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            p: 3,
            textAlign: 'center' 
          }}>
            <HelpOutlineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Ask about NBA Rules</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              I can answer questions about official NBA rules, violations, procedures, and more.
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Try asking:
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {exampleQuestions.map((question, index) => (
                <Button 
                  key={index} 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleExampleClick(question)}
                  sx={{ 
                    borderRadius: 4,
                    textTransform: 'none',
                    px: 1.5,
                    fontSize: '0.75rem' 
                  }}
                >
                  {question}
                </Button>
              ))}
            </Box>
          </Box>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
        
        {/* Loading indicator */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        {/* Error message */}
        {error && (
          <Box sx={{ 
            p: 2, 
            bgcolor: 'error.light', 
            color: 'error.contrastText',
            borderRadius: 1,
            mb: 2 
          }}>
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}
      </Box>
      
      {/* Input Area */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box component="form" onSubmit={handleSendMessage}>
          <TextField
            fullWidth
            placeholder="Ask about NBA rules..."
            value={input}
            onChange={handleInputChange}
            disabled={loading}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    edge="end" 
                    color="primary" 
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || loading}
                    aria-label="send message"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
        >
          <InfoOutlinedIcon fontSize="inherit" sx={{ mr: 0.5 }} />
          For educational purposes. Not an official NBA resource.
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatInterface;