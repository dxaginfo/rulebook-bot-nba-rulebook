import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Paper, Chip, Link, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  
  // Function to render message content with citations as links
  const renderMessageContent = () => {
    const paragraphs = message.content.split('\n\n');
    
    return paragraphs.map((paragraph, idx) => (
      <Typography 
        key={idx} 
        variant="body1" 
        component="p"
        sx={{ 
          mb: idx < paragraphs.length - 1 ? 2 : 0,
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap'
        }}
      >
        {paragraph}
      </Typography>
    ));
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: isBot ? 'row' : 'row-reverse',
        mb: 2,
        maxWidth: '95%',
        alignSelf: isBot ? 'flex-start' : 'flex-end'
      }}
    >
      {/* Avatar */}
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'flex-start',
          mr: isBot ? 1.5 : 0,
          ml: isBot ? 0 : 1.5,
          mt: 0.5
        }}
      >
        <Box 
          sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isBot ? 'primary.main' : 'secondary.main',
            color: 'white'
          }}
        >
          {isBot ? <SmartToyIcon /> : <PersonIcon />}
        </Box>
      </Box>
      
      {/* Message content */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2,
          borderRadius: 2,
          maxWidth: 'calc(100% - 50px)',
          bgcolor: isBot ? 'background.paper' : 'primary.main',
          color: isBot ? 'text.primary' : 'white',
          border: isBot ? '1px solid' : 'none',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ mb: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600,
              color: isBot ? 'primary.main' : 'inherit'
            }}
          >
            {isBot ? 'RuleBook Bot' : 'You'}
          </Typography>
        </Box>
        
        <Box>
          {renderMessageContent()}
        </Box>
        
        {/* Citations */}
        {isBot && message.citations && message.citations.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Sources:
            </Typography>
            
            {message.citations.map((citation, index) => (
              <Chip 
                key={index}
                label={citation}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MessageBubble;