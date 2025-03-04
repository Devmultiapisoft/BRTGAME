import React, { useEffect, useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamesPage from './views/games';
import CommissionPage from './views/commission';
import PromotionPage from './views/promotion';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/Popup';
import Tabs from './components/Tabs/Tabs';
import ProgressBar from './components/ProgressBar/ProgressBar';
import { generateRandomAmount, generateRandomUserName, generateRandomImageURL } from './utils/helpers';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { styled } from '@mui/material/styles';
import { createAppTheme, themeColors } from './theme';
import { Theme } from '@mui/material/styles';

// Mobile container wrapper
const MobileContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '480px',
  margin: '0 auto',
  minHeight: '100vh',
  position: 'relative',
  overflowX: 'hidden',
  backgroundColor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  backdropFilter: 'blur(20px)',
  display: 'flex',
  flexDirection: 'column',
}));

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [total, setTotal] = useState(100);
  const [current, setCurrent] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themeColors>('green');

  const theme = createAppTheme(currentTheme);

  const tabs = [
    {
      id: 'tab1',
      label: 'Tab 1',
      content: <div>Content for Tab 1</div>,
    },
    {
      id: 'tab2',
      label: 'Tab 2',
      content: <div>Content for Tab 2</div>,
    },
    // Add more tabs as needed
  ];

  useEffect(() => {
    // Update progress bar logic
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 1000);

    return () => clearInterval(interval);
  }, [total]);

  const handleThemeChange = (newTheme: keyof typeof themeColors) => {
    setCurrentTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MobileContainer>
          <CssBaseline />
          <Navbar isMobile={true} onThemeChange={handleThemeChange} currentTheme={currentTheme} />
          <Box sx={{
            flex: 1,
            pt: '56px', // Navbar height
            pb: '56px', // Footer height
            position: 'relative',
            overflowX: 'hidden',
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: themeColors[currentTheme].background,
            backdropFilter: 'blur(20px)',
          }}>
            <Container maxWidth={false}>
              <Routes>
                <Route path="/" element={<GamesPage onThemeChange={handleThemeChange} currentTheme={currentTheme} />} />
                <Route path="/commission" element={<CommissionPage onThemeChange={handleThemeChange} />} />
                <Route path="/promotion" element={<PromotionPage onThemeChange={handleThemeChange} />} />
                {/* Add more routes as needed */}
              </Routes>
            </Container>
          </Box>
          <Box sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: themeColors[currentTheme].background,
            backdropFilter: 'blur(20px)',
            borderTop: `1px solid ${themeColors[currentTheme].border}`,
          }}>
          </Box>
        </MobileContainer>
        <Footer currentTheme={currentTheme} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
