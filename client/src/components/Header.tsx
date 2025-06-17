import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'About', path: '/about', icon: <InfoIcon /> },
  ];
  
  return (
    <AppBar position="sticky" elevation={0} color="default" sx={{ bgcolor: '#fff', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <SportsBasketballIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              color: 'text.primary', 
              textDecoration: 'none', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center' 
            }}
          >
            RuleBook Bot
          </Typography>
        </Box>
        
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            
            <Drawer anchor="right" open={menuOpen} onClose={closeMenu}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={closeMenu}
                onKeyDown={closeMenu}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem 
                      button 
                      key={item.label} 
                      component={RouterLink} 
                      to={item.path}
                      selected={location.pathname === item.path}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                color={location.pathname === item.path ? 'primary' : 'inherit'}
                sx={{ 
                  mx: 1,
                  fontWeight: location.pathname === item.path ? 600 : 400
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;