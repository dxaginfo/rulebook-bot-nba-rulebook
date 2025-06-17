import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import theme from './theme';
import { ChatProvider } from './contexts/ChatContext';
import { RuleProvider } from './contexts/RuleContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RulePage from './pages/RulePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RuleProvider>
        <ChatProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              
              <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/rule/:id" element={<RulePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Box>
              
              <Footer />
            </Box>
          </Router>
        </ChatProvider>
      </RuleProvider>
    </ThemeProvider>
  );
}

export default App;