import React from 'react';
import { Box, Typography, Paper, Chip, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Message } from '../types/chat';
import { Link as RouterLink } from 'react-router-dom';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  
  // Function to format message content with line breaks
  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };
  
  // Function to extract and format rule IDs from citations
  const getRuleId = (citation: string) => {
    // Simple parsing logic - in a real app, this would be more robust
    const sections = citation.split(' - ');
    if (sections.length >= 2) {
      const title = sections[1].trim();
      // Map title to rule ID based on our data
      const ruleTitleMap: Record<string, string> = {
        'Traveling': 'rule-001',
        'Shot Clock': 'rule-002',
        'Goaltending': 'rule-003',
        'Court Dimensions': 'rule-004',
        'Personal Fouls': 'rule-005',
        'Out of Bounds': 'rule-006',
        'Three-Second Violation': 'rule-007',
        'Double Dribble': 'rule-008',
        'Flagrant Fouls': 'rule-009',
        'Backcourt Violation': 'rule-010'
      };
      return ruleTitleMap[title] || '';
    }
    return '';
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isBot ? 'row' : 'row-reverse',
        mb: 2,
        maxWidth: '85%',
        alignSelf: isBot ? 'flex-start' : 'flex-end'
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          mr: isBot ? 1 : 0,
          ml: isBot ? 0 : 1
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: isBot ? 'primary.main' : 'secondary.main',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isBot ? <SmartToyIcon /> : <PersonIcon />}
        </Box>
      </Box>

      {/* Message Content */}
      <Box sx={{ maxWidth: 'calc(100% - 48px)' }}>
        <Box
          component={Paper}
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: isBot ? 'grey.100' : 'primary.main',
            color: isBot ? 'text.primary' : '#fff',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '8px 8px 8px 0',
              borderColor: `transparent ${isBot ? '#f5f5f5' : theme => theme.palette.primary.main} transparent transparent`,
              top: 12,
              left: isBot ? -8 : 'auto',
              right: isBot ? 'auto' : -8,
              transform: isBot ? 'none' : 'rotate(180deg)'
            }
          }}
        >
          <Typography variant="body1">
            {formatContent(message.content)}
          </Typography>

          {/* Citations */}
          {isBot && message.citations && message.citations.length > 0 && (
            <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {message.citations.map((citation, index) => {
                const ruleId = getRuleId(citation);
                return (
                  <Chip
                    key={index}
                    size="small"
                    label={citation}
                    variant="outlined"
                    color="primary"
                    clickable={!!ruleId}
                    component={ruleId ? RouterLink : undefined}
                    to={ruleId ? `/rule/${ruleId}` : undefined}
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 22 
                    }}
                  />
                );
              })}
            </Box>
          )}
        </Box>

        {/* Timestamp */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 0.5,
            display: 'block',
            textAlign: isBot ? 'left' : 'right',
            fontSize: '0.7rem'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;