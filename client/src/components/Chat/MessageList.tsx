import React from 'react';
import { Box, Typography, Chip, CircularProgress, Paper } from '@mui/material';
import { Message } from '../../types/chat';
import RuleCitation from '../Rule/RuleCitation';

interface MessageListProps {
  messages: Message[];
}

/**
 * Component to display a list of chat messages
 */
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box>
      {messages.map((message, index) => (
        <MessageItem key={message.id || index} message={message} />
      ))}
    </Box>
  );
};

interface MessageItemProps {
  message: Message;
}

/**
 * Component to display an individual message
 */
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  
  // Format the message content with rule citations
  const formatMessageWithCitations = (content: string, citations?: string[]) => {
    if (!citations || citations.length === 0) {
      return <Typography variant="body1">{content}</Typography>;
    }

    // Simple approach: Look for rule IDs in the content and wrap them
    let formattedContent = content;
    
    return (
      <>
        <Typography variant="body1">{formattedContent}</Typography>
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {citations.map((citation) => (
            <RuleCitation key={citation} ruleId={citation} />
          ))}
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '80%',
          borderRadius: 2,
          bgcolor: isBot ? 'grey.100' : 'primary.main',
          color: isBot ? 'text.primary' : 'white',
          position: 'relative',
        }}
      >
        {message.isTyping ? (
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Thinking...
            </Typography>
          </Box>
        ) : message.isError ? (
          <Typography color="error">{message.content}</Typography>
        ) : (
          formatMessageWithCitations(message.content, message.citations)
        )}
        
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 2,
            right: 8,
            opacity: 0.7,
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageList;