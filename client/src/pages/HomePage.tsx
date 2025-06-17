import React, { useState } from 'react';
import { Grid, Box, Paper, Container, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import ChatInterface from '../components/ChatInterface';
import RuleBrowser from '../components/RuleBrowser';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeView, setActiveView] = useState<'chat' | 'browse'>(isMobile ? 'chat' : 'browse');
  
  return (
    <Container maxWidth="xl">
      {/* Mobile View Selector */}
      {isMobile && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant={activeView === 'chat' ? 'contained' : 'outlined'}
            onClick={() => setActiveView('chat')}
            sx={{ mx: 1 }}
          >
            Chat Assistant
          </Button>
          <Button 
            variant={activeView === 'browse' ? 'contained' : 'outlined'}
            onClick={() => setActiveView('browse')}
            sx={{ mx: 1 }}
          >
            Browse Rules
          </Button>
        </Box>
      )}
      
      {/* Header */}
      <Box sx={{ mb: 4, display: isMobile && activeView === 'browse' ? 'block' : (isMobile && activeView === 'chat' ? 'none' : 'block') }}>
        <Typography variant="h4" component="h1" gutterBottom>
          NBA Rules Assistant
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Browse the official NBA rulebook or ask questions to our AI assistant
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Rule Browser - Hide on mobile when chat is active */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          sx={{ 
            display: isMobile ? (activeView === 'browse' ? 'block' : 'none') : 'block',
            height: isMobile ? 'auto' : '70vh'
          }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              border: '1px solid', 
              borderColor: 'divider',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <RuleBrowser />
          </Paper>
        </Grid>
        
        {/* Chat Interface - Hide on mobile when browse is active */}
        <Grid 
          item 
          xs={12} 
          md={8} 
          sx={{ 
            display: isMobile ? (activeView === 'chat' ? 'block' : 'none') : 'block',
            height: isMobile ? 'calc(100vh - 200px)' : '70vh'
          }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              border: '1px solid', 
              borderColor: 'divider',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column' 
            }}
          >
            <ChatInterface />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;