import React from 'react';
import { Box, Typography, Paper, Chip, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Message } from '../types/chat';
import { useRule } from '../contexts/RuleContext';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const navigate = useNavigate();
  const { searchRules } = useRule();
  
  const isBot = message.role === 'bot';
  
  // Extract rule ID from citation if possible
  const handleCitationClick = async (citation: string) => {
    // This is a simplified example. In a real app, you would have a more sophisticated way
    // to map citations to rule IDs or search for them
    
    // Extract the main topic from the citation
    const topic = citation.split(' - ').pop();
    if (!topic) return;
    
    // Search for rules matching the topic
    const results = await searchRules(topic);
    
    // If we found any matching rules, navigate to the first one
    if (results.length > 0) {
      navigate(`/rule/${results[0].id}`);
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
        maxWidth: '80%',
        alignSelf: isBot ? 'flex-start' : 'flex-end'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: isBot ? 'grey.100' : 'primary.main',
          color: isBot ? 'text.primary' : 'white',
          borderRadius: 2,
          borderTopLeftRadius: isBot ? 0 : 2,
          borderTopRightRadius: isBot ? 2 : 0,
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        
        {/* Citations */}
        {isBot && message.citations && message.citations.length > 0 && (
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              References:
            </Typography>
            {message.citations.map((citation, index) => (
              <Chip
                key={index}
                label={citation}
                size="small"
                variant="outlined"
                onClick={() => handleCitationClick(citation)}
                sx={{ mr: 0.5, mt: 0.5, cursor: 'pointer' }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MessageBubble;