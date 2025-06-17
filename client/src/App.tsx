import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import { ChatProvider } from './contexts/ChatContext';
import { RuleProvider } from './contexts/RuleContext';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#006BB6', // NBA blue
      light: '#1888D3',
      dark: '#004D83'
    },
    secondary: {
      main: '#ED174C', // NBA red
      light: '#FF4472',
      dark: '#C00030'
    },
    background: {
      default: '#f5f7f9'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600
    },
    h2: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    }
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatProvider>
        <RuleProvider>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh'
          }}>
            <Header />
            <Container 
              maxWidth="lg" 
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                py: 3,
                height: 'calc(100vh - 64px)' // Full height minus header
              }}
            >
              <ChatInterface />
            </Container>
          </Box>
        </RuleProvider>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;