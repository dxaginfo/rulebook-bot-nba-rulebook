import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
  List,
  ListItem,
  CircularProgress,
  Button,
  Chip,
  Tooltip,
  useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SportsTwoToneIcon from '@mui/icons-material/SportsTwoTone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useChat } from '../contexts/ChatContext';
import { Message } from '../types/chat';

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    await sendMessage(input);
    setInput('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleClearChat = () => {
    clearChat();
  };
  
  const handleCitationClick = (citation: string) => {
    // Extract rule ID from citation string
    const parts = citation.split(' - ');
    if (parts.length < 3) return;
    
    const title = parts[2];
    // Find the rule by title
    const rule = messages
      .filter(msg => msg.role === 'bot')
      .flatMap(msg => msg.citations || [])
      .find(cite => cite.includes(title));
    
    if (rule) {
      // In a real app, this would navigate to the specific rule
      // For now, just navigate to a mock rule ID
      navigate(`/rule/rule-001`);
    }
  };
  
  // Function to render message content with citations highlighted
  const renderMessageContent = (content: string, citations?: string[]) => {
    if (!citations || citations.length === 0) {
      return <Typography variant="body1">{content}</Typography>;
    }
    
    return <Typography variant="body1">{content}</Typography>;
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsTwoToneIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">NBA Rules Assistant</Typography>
          </Box>
          
          <Tooltip title="Clear conversation">
            <IconButton onClick={handleClearChat} color="default" size="small">
              <DeleteSweepIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.length === 0 ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              p: 3,
              textAlign: 'center' 
            }}
          >
            <SportsTwoToneIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              NBA Rulebook Assistant
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Ask me any question about NBA rules and regulations.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: 400 }}>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => setInput('What is the shot clock rule in the NBA?')}
              >
                What is the shot clock rule?
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => setInput('Explain traveling violations')}
              >
                Explain traveling violations
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => setInput('How many personal fouls until a player fouls out?')}
              >
                How many fouls until a player fouls out?
              </Button>
            </Box>
          </Box>
        ) : (
          <List>
            {messages.map((message) => (
              <ListItem 
                key={message.id} 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                  padding: 0
                }}
              >
                <Box 
                  sx={{
                    maxWidth: '80%',
                    backgroundColor: message.role === 'user' 
                      ? 'primary.main' 
                      : 'grey.100',
                    color: message.role === 'user' 
                      ? 'primary.contrastText' 
                      : 'text.primary',
                    borderRadius: 2,
                    p: 2,
                    position: 'relative'
                  }}
                >
                  {renderMessageContent(message.content, message.citations)}
                  
                  {/* Citations */}
                  {message.citations && message.citations.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {message.citations.map((citation, index) => (
                        <Chip 
                          key={index}
                          label={citation}
                          size="small"
                          clickable
                          onClick={() => handleCitationClick(citation)}
                          sx={{ 
                            backgroundColor: theme.palette.background.paper,
                            '&:hover': {
                              backgroundColor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText
                            }
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
                
                {/* Timestamp */}
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ mt: 0.5, mx: 1 }}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </ListItem>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <ListItem 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 0
                }}
              >
                <Box 
                  sx={{
                    backgroundColor: 'grey.100',
                    borderRadius: 2,
                    p: 2,
                    minWidth: 100,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              </ListItem>
            )}
            
            {/* Error message */}
            {error && (
              <ListItem 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 0
                }}
              >
                <Box 
                  sx={{
                    backgroundColor: 'error.light',
                    color: 'error.contrastText',
                    borderRadius: 2,
                    p: 2
                  }}
                >
                  <Typography variant="body2">{error}</Typography>
                </Box>
              </ListItem>
            )}
            
            <div ref={messagesEndRef} />
          </List>
        )}
      </Box>
      
      {/* Input Area */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: '1px solid', 
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Ask about NBA rules..."
            variant="outlined"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            disabled={loading}
            InputProps={{
              sx: { pr: 1 }
            }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSendMessage} 
            disabled={!input.trim() || loading}
            sx={{ ml: 1 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
        
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
        >
          <InfoOutlinedIcon fontSize="inherit" sx={{ mr: 0.5 }} />
          For educational purposes only. Refer to the official NBA rulebook for official rules.
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatInterface;