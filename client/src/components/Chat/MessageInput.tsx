import React, { useState, KeyboardEvent } from 'react';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

/**
 * Message input component with send button
 */
const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState<string>('');

  /**
   * Handle sending the message
   */
  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  /**
   * Handle Enter key press to send message
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Ask about NBA rules..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        multiline
        maxRows={4}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
          }
        }}
      />
      <IconButton 
        color="primary" 
        onClick={handleSend} 
        disabled={!message.trim() || disabled}
        sx={{ ml: 1 }}
      >
        {disabled ? (
          <CircularProgress size={24} />
        ) : (
          <SendIcon />
        )}
      </IconButton>
    </Box>
  );
};

export default MessageInput;