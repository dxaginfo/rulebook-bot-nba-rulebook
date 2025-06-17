import React from 'react';
import { Grid, Typography, Box, Paper, Container } from '@mui/material';
import ChatInterface from '../components/ChatInterface';
import RuleBrowser from '../components/RuleBrowser';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          NBA RuleBook Bot
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your AI assistant for NBA rules and regulations
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Rule Browser */}
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: { md: 'calc(100vh - 240px)', xs: 400 },
              borderRadius: 2,
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
        
        {/* Chat Interface */}
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: { md: 'calc(100vh - 240px)', xs: 550 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden'
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