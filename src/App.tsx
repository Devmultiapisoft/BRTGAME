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

import Account from './components/Account/Account';
import SettingsPage from './components/Settings/Settings';
import { ChangePasswordPage } from './components/ChangePassword/ChangePassword';
import FeedbackPage from './components/Feedback/Feedback';
import { AnnouncementPage } from './components/Announcement/Announcement';
import { CustomerServicePage } from './components/Announcement/CustomerServicePage';
import { AboutPage } from './components/Announcement/About';
import { AgreementPage } from './components/Announcement/AggrementPage';
import NotificationPage from './components/Notification/Notification';

import Navbar from './components/Navbar/Navbar';
import { styled } from '@mui/material/styles';
import { createAppTheme, themeColors } from './theme';
import { Theme } from '@mui/material/styles';

import WithdrawalPage from './pages/wallet/Withdraw';
import WalletPage from './pages/wallet/Wallet';
import DepositPage from './pages/wallet/Deposit';
import WithdrawPage from './pages/wallet/Withdraw';
import DepositHistoryPage from './pages/wallet/DepositHistoryPage';
import WithdrawHistoryPage from './pages/wallet/WithdrawalHistoryPage';
import BetHistoryPage from "./components/BetHistory/BetHistory"
import CommissionDetails from './views/commission/CommissionDetails';
import SubordinateData from './views/subordinate/SubordinateData';
import NewSubordinates from './views/subordinate/NewSubordinates';
import InvitationRules from './views/invitation/InvitationRules';
import CustomerService from './views/agent/CustomerService';
import RebateRatio from './views/rebate/RebateRatio';
import WinGo from './views/games/WinGo';
import WinGo3 from './views/games/WinGo3';
import WinGo5 from './views/games/WinGo5';
import WinGo10 from './views/games/WinGo10';


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
            pt: '56px',
            pb: '56px',
            position: 'relative',
            overflowX: 'hidden',
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: themeColors[currentTheme].background,
            backdropFilter: 'blur(20px)',
          }}>
            <Container 
           
              disableGutters 
              sx={{ 
                width: '100%',
                height: '100%',
                p: 0,
              }}
            >
              <Routes>
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/announcement" element={<AnnouncementPage />} />
                <Route path="/customer-service" element={<CustomerServicePage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/agreement/:type" element={<AgreementPage type={1} />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/" element={<GamesPage onThemeChange={handleThemeChange} currentTheme={currentTheme} />} />
                <Route path="/commission" element={<CommissionPage />} />
                <Route path="/commission/details" element={<CommissionDetails />} />
                <Route path="/subordinate/data" element={<SubordinateData />} />
                <Route path="/subordinate/new" element={<NewSubordinates />} />
                <Route path="/invitation/rules" element={<InvitationRules />} />
                <Route path="/agent/customer-service" element={<CustomerService />} />
                <Route path="/rebate/ratio" element={<RebateRatio />} />
                <Route path="/promotion" element={<PromotionPage onThemeChange={handleThemeChange} />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/wallet/deposit" element={<DepositPage />} />
                <Route path="/wallet/withdraw" element={<WithdrawPage />} />
                <Route path="wallet/depositHistory" element={<DepositHistoryPage />} />
                <Route path="/wallet/withdrawHistory" element={<WithdrawHistoryPage />} />
                <Route path='/bet-history' element={<BetHistoryPage/>} />
                <Route path="/wingo/1" element={<WinGo />} />
                <Route path="/wingo/3" element={<WinGo3 />} />
                <Route path="/wingo/5" element={<WinGo5 />} />
                <Route path="/wingo/10" element={<WinGo10 />} />
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
