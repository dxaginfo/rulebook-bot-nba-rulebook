import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  
  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'GitHub', path: 'https://github.com/dxaginfo/rulebook-bot-nba-rulebook', external: true }
  ];
  
  const NavDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            component={item.external ? 'a' : RouterLink}
            to={!item.external ? item.path : undefined}
            href={item.external ? item.path : undefined}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          {/* Logo */}
          <Box 
            component={RouterLink} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <SportsBasketballIcon sx={{ mr: 1, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              RuleBook Bot
            </Typography>
          </Box>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 'auto' }}>
              {navItems.map((item) => (
                item.external ? (
                  <Button 
                    key={item.text}
                    color="inherit"
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={item.text === 'GitHub' ? <GitHubIcon /> : undefined}
                    sx={{ ml: 2 }}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Button 
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    sx={{ ml: 2 }}
                  >
                    {item.text}
                  </Button>
                )
              ))}
            </Box>
          )}
          
          {/* Mobile Navigation */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <NavDrawer />
      </Drawer>
    </AppBar>
  );
};

export default Header;