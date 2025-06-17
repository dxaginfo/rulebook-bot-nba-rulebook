import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import { ChatProvider } from './contexts/ChatContext';
import { RuleProvider } from './contexts/RuleContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RulePage from './pages/RulePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#006BB6', // NBA blue
      dark: '#00487A',
      light: '#338DC7'
    },
    secondary: {
      main: '#ED174C', // NBA red
      dark: '#BF0D35',
      light: '#F14971'
    },
    background: {
      default: '#FAFAFA'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 600
    },
    h3: {
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
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8
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
          <Router>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh' 
            }}>
              <Header />
              
              <Container 
                component="main" 
                maxWidth="lg" 
                sx={{ 
                  flexGrow: 1, 
                  py: 4,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/rule/:id" element={<RulePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Container>
              
              <Footer />
            </Box>
          </Router>
        </RuleProvider>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;