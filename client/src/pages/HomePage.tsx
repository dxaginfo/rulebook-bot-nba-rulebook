import React from 'react';
import { Grid, Typography, Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import ChatInterface from '../components/ChatInterface';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 4, textAlign: isMobile ? 'center' : 'left' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: 'primary.main' 
          }}
        >
          NBA RuleBook Bot
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Ask questions about NBA rules and get accurate, cited answers from the official rulebook.
        </Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <ChatInterface />
      </Box>
    </Box>
  );
};

export default HomePage;