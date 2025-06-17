import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MessageBubble from './MessageBubble';
import { Message } from '../types/chat';
import { useChat } from '../contexts/ChatContext';

/**
 * Main chat interface component
 */
const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    sendMessage, 
    clearChat, 
    loading 
  } = useChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    await sendMessage(input);
    setInput('');
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle clearing the chat
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearChat();
    }
  };

  // Suggested questions to help users get started
  const suggestedQuestions = [
    'What is the shot clock rule in the NBA?',
    'How does the backcourt violation work?',
    'What is the clear path foul?',
    'Explain the goaltending rule'
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        borderRadius: 2
      }}
    >
      {/* Chat header */}
      <Box 
        sx={{ 
          p: 2, 
          backgroundColor: 'primary.main', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6">NBA RuleBook Bot</Typography>
        <Tooltip title="Clear chat history">
          <IconButton 
            color="inherit" 
            onClick={handleClearChat}
            disabled={messages.length === 0 || loading}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      {/* Chat messages area */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          p: 2, 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: '#f5f7f9'
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
              gap: 3,
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: 60, color: 'primary.main', opacity: 0.7 }} />
            <Typography variant="h6">Ask me anything about NBA rules</Typography>
            <Typography variant="body2" sx={{ maxWidth: 500 }}>
              I can help you understand NBA rulebook regulations, interpretations, and applications.
              Try asking about specific rules, scenarios, or clarifications.
            </Typography>
            
            <Box sx={{ mt: 3, width: '100%', maxWidth: 500 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Try asking:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {suggestedQuestions.map((question, index) => (
                  <Button 
                    key={index}
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setInput(question);
                    }}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    {question}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          messages.map((message: Message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input area */}
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'white'
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask about NBA rules..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          multiline
          maxRows={4}
          variant="outlined"
          size="small"
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
          disabled={loading || input.trim() === ''}
          sx={{ borderRadius: 2, height: 40 }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatInterface;