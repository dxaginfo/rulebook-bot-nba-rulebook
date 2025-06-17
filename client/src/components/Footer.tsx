import React from 'react';
import { Box, Typography, Container, Link, Divider } from '@mui/material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              RuleBook Bot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your NBA rulebook assistant
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link 
                href="https://official.nba.com/rulebook/" 
                target="_blank"
                color="inherit"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="body2">Official NBA Rulebook</Typography>
              </Link>
              <Link 
                href="https://www.nba.com/" 
                target="_blank"
                color="inherit"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="body2">NBA.com</Typography>
              </Link>
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link 
                href="https://github.com/dxaginfo/rulebook-bot-nba-rulebook" 
                target="_blank"
                color="inherit"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="body2">GitHub Repository</Typography>
              </Link>
              <Link 
                href="/about" 
                color="inherit"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="body2">About</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} RuleBook Bot • Not affiliated with the NBA
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;