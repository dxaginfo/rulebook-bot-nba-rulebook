import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 3, bgcolor: 'grey.100' }}>
      <Divider />
      <Container maxWidth="lg">
        <Box sx={{ py: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} RuleBook Bot | NBA Rules Assistant
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" underline="hover">
              About
            </Link>
            <Link href="https://official.nba.com/rulebook/" target="_blank" rel="noopener" color="inherit" underline="hover">
              Official NBA Rules
            </Link>
          </Box>
        </Box>
        
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          This is an unofficial educational tool and is not affiliated with or endorsed by the NBA.
          For official rules, please visit the <Link href="https://official.nba.com/rulebook/" target="_blank" rel="noopener">NBA Official Rulebook</Link>.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;