import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Tooltip,
  CircularProgress
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types/chat';
import { Rule } from '../types/rule';
import { useRules } from '../contexts/RuleContext';

interface MessageBubbleProps {
  message: Message;
}

/**
 * Component to display a chat message with rule citations
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { getRuleById, loadingRule } = useRules();

  const isUser = message.role === 'user';
  
  // Handle opening a rule citation
  const handleOpenCitation = async (ruleId: string) => {
    const rule = await getRuleById(ruleId);
    setSelectedRule(rule);
    setDialogOpen(true);
  };

  // Handle closing the rule dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 2,
            maxWidth: '80%',
            borderRadius: 2,
            backgroundColor: isUser ? 'primary.light' : 'white',
            color: isUser ? 'white' : 'text.primary',
          }}
        >
          <Box sx={{ mb: message.citations && message.citations.length > 0 ? 1.5 : 0 }}>
            {isUser ? (
              <Typography variant="body1">{message.content}</Typography>
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <Typography variant="body1" component="p" sx={{ my: 1 }} {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <Typography variant="body1" component="li" sx={{ my: 0.5 }} {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </Box>
          
          {!isUser && message.citations && message.citations.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="caption" sx={{ width: '100%', color: 'text.secondary', mb: 0.5 }}>
                Rule References:
              </Typography>
              {message.citations.map((citation, index) => (
                <Tooltip key={index} title="Click to view rule details">
                  <Chip
                    label={`Rule ${citation}`}
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenCitation(citation)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              ))}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Rule Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {loadingRule ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={20} />
              <Typography>Loading rule...</Typography>
            </Box>
          ) : (
            selectedRule ? `Rule ${selectedRule.id}: ${selectedRule.title}` : 'Rule Details'
          )}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {loadingRule ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            selectedRule && (
              <Box>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {selectedRule.content}
                </Typography>
                
                {selectedRule.parentId && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Part of: Rule {selectedRule.parentId}
                    </Typography>
                  </Box>
                )}
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageBubble;