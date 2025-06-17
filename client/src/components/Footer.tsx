import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
            <SportsBasketballIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              RuleBook Bot © {new Date().getFullYear()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/about" color="inherit" underline="hover">
              <Typography variant="body2" color="text.secondary">
                About
              </Typography>
            </Link>
            
            <Divider orientation="vertical" flexItem />
            
            <Link 
              href="https://official.nba.com/rulebook/" 
              target="_blank" 
              rel="noopener noreferrer" 
              color="inherit"
              underline="hover"
            >
              <Typography variant="body2" color="text.secondary">
                Official NBA Rulebook
              </Typography>
            </Link>
            
            <Divider orientation="vertical" flexItem />
            
            <Typography variant="body2" color="text.secondary">
              Not affiliated with NBA
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;