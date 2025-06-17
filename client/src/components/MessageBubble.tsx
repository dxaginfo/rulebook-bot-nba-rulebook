import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Collapse,
  Link,
  Tooltip,
  IconButton,
  Divider
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PersonIcon from '@mui/icons-material/Person';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Message } from '../types/chat';
import { styled } from '@mui/material/styles';

interface MessageBubbleProps {
  message: Message;
}

// Styled expand icon that rotates when expanded
const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(
  ({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }),
);

/**
 * Component for displaying a single message in the chat
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const isBot = message.role === 'bot';
  const hasCitations = isBot && message.citations && message.citations.length > 0;
  
  return (
    <Box 
      sx={{
        display: 'flex',
        mb: 2,
        flexDirection: isBot ? 'row' : 'row-reverse'
      }}
    >
      {/* Avatar */}
      <Avatar 
        sx={{
          bgcolor: isBot ? 'primary.main' : 'secondary.main',
          height: 40,
          width: 40,
          mt: 0.5
        }}
      >
        {isBot ? <SportsBasketballIcon /> : <PersonIcon />}
      </Avatar>
      
      {/* Message content */}
      <Paper 
        sx={{
          p: 2,
          ml: isBot ? 1 : 0,
          mr: isBot ? 0 : 1,
          maxWidth: '80%',
          borderRadius: 2,
          bgcolor: isBot ? 'white' : 'primary.light',
          color: isBot ? 'text.primary' : 'white',
          position: 'relative'
        }}
        elevation={1}
      >
        <Typography variant="body1" component="div">
          {message.content}
        </Typography>
        
        {/* Action buttons */}
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
            opacity: 0.7
          }}
        >
          <Typography 
            variant="caption" 
            color={isBot ? 'text.secondary' : 'inherit'}
            sx={{ opacity: 0.8 }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Typography>
          
          {isBot && (
            <Tooltip title={copied ? "Copied!" : "Copy message"}>
              <IconButton 
                size="small" 
                onClick={copyToClipboard}
                sx={{ ml: 1, color: copied ? 'success.main' : 'inherit' }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          
          {hasCitations && (
            <>
              <Tooltip title="View rule citations">
                <IconButton size="small" sx={{ ml: 1 }}>
                  <MenuBookIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show citations"
                size="small"
              >
                <ExpandMoreIcon fontSize="small" />
              </ExpandMore>
            </>
          )}
        </Box>
        
        {/* Citations section */}
        {hasCitations && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              Rule Citations:
            </Typography>
            <Box sx={{ ml: 1 }}>
              {message.citations.map((citation, index) => (
                <Typography 
                  key={index} 
                  variant="body2" 
                  color="text.secondary"
                  gutterBottom
                >
                  <Link href="#" underline="hover">{citation}</Link>
                </Typography>
              ))}
            </Box>
          </Collapse>
        )}
      </Paper>
    </Box>
  );
};

export default MessageBubble;