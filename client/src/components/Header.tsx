import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Tooltip 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import nbaLogo from '../assets/nba-logo.svg';

/**
 * Application header component
 */
const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <AppBar position="static" sx={{ boxShadow: 2 }}>
      <Toolbar>
        {/* Logo and title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={nbaLogo} 
            alt="NBA Logo" 
            style={{ height: 40, marginRight: 12 }}
          />
          <Typography 
            variant="h6" 
            noWrap 
            component="div"
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
          >
            RuleBook Bot
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Action icons */}
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="About">
            <IconButton color="inherit">
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="View on GitHub">
            <IconButton 
              color="inherit"
              href="https://github.com/dxaginfo/rulebook-bot-nba-rulebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Help">
            <IconButton 
              color="inherit"
              aria-label="help"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Help menu */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>How to Use</MenuItem>
          <MenuItem onClick={handleMenuClose}>Example Questions</MenuItem>
          <MenuItem onClick={handleMenuClose}>Report an Issue</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;