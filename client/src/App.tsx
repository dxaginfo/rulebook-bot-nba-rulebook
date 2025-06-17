import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RulePage from './pages/RulePage';
import NotFoundPage from './pages/NotFoundPage';
import { ChatProvider } from './contexts/ChatContext';
import { RuleProvider } from './contexts/RuleContext';

function App() {
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
              
              <Box sx={{ 
                flexGrow: 1, 
                py: 4 
              }}>
                <Container maxWidth="lg">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/rule/:id" element={<RulePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Container>
              </Box>
              
              <Footer />
            </Box>
          </Router>
        </RuleProvider>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;