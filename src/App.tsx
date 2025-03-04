import React, { useEffect, useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamesPage from './views/games';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Popup from './components/Popup/Popup';
import Tabs from './components/Tabs/Tabs';
import ProgressBar from './components/ProgressBar/ProgressBar';
import { generateRandomAmount, generateRandomUserName, generateRandomImageURL } from './utils/helpers';
import './App.css';
import Account from './components/Account/Account';
import SettingsPage from './components/Settings/Settings';
import { ChangePasswordPage } from './components/ChangePassword/ChangePassword';
import FeedbackPage from './components/Feedback/Feedback';
import { AnnouncementPage } from './components/Announcement/Announcement';
import { CustomerServicePage } from './components/Announcement/CustomerServicePage';
import { AboutPage } from './components/Announcement/About';
import { AgreementPage } from './components/Announcement/AggrementPage';
import NotificationPage from './components/Notification/Notification';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [total, setTotal] = useState(100);
  const [current, setCurrent] = useState(0);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Container maxWidth="lg">
              <Routes>
                <Route path="/" element={<GamesPage />} />
                <Route path="/profile" element={<Account/>} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="/change-password" element={<ChangePasswordPage/>} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/announcement" element={<AnnouncementPage />} />
                <Route path="/customer-service" element={<CustomerServicePage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/agreement/:type" element={<AgreementPage type={1} />} />
                <Route path="/notification" element={<NotificationPage />} />
                {/* Add more routes as needed */}
              </Routes>
            </Container>  
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
