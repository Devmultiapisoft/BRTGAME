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
import BetHistoryPage from './components/BetHistory/BetHistory';
import CommissionDetails from './views/commission/CommissionDetails';
import SubordinateData from './views/subordinate/SubordinateData';
import NewSubordinates from './views/subordinate/NewSubordinates';
import InvitationRules from './views/invitation/InvitationRules';
import CustomerService from './views/agent/CustomerService';
import RebateRatio from './views/rebate/RebateRatio';


import DailyCommission from './views/commission/DailyCommission';
import WeeklyBonus from './views/commission/WeeklyBonus';
import MyTeam from './views/commission/MyTeam';
import TurnOver from './views/commission/TurnOver';
import MonthlyRewards from './views/commission/MonthlyRewards';
import TeamBonus from './views/commission/TeamBonus';
import K3GamePage from './views/games/K3/K3';
import Game5D from './views/games/5D/5D';

import WinGo from './views/games/wingo/WinGo';
import WinGo3 from './views/games/wingo/WinGo3';
import WinGo5 from './views/games/wingo/WinGo5';
import WinGo10 from './views/games/wingo/WinGo10';
import Trx1Min from './views/games/trx/Trx1Min';
import Trx3Min from './views/games/trx/Trx3Min';
import Trx5Min from './views/games/trx/Trx5Min';
import TrxGames from './views/games/trx/TrxGames';
import Trx10Min from './views/games/trx/Trx10Min';



// Mobile container wrapper
const MobileContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '480px', // Fixed width for mobile layout
  margin: '0 auto',
  minHeight: '100vh',
  position: 'relative',
  overflowX: 'hidden',
  backgroundColor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  backdropFilter: 'blur(20px)',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 0 20px rgba(0,0,0,0.1)', // Add shadow for container
  '@media (min-width: 480px)': {
    borderLeft: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    borderRight: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  }
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
        <Box sx={{ 
          width: '100%',
          minHeight: '100vh',
          backgroundColor: theme => themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
        }}>
            <Navbar isMobile={true} onThemeChange={handleThemeChange} currentTheme={currentTheme} />
          <MobileContainer>
            <CssBaseline />
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
              <Container 
                disableGutters 
                sx={{ 
                  width: '100%',
                  height: '100%',
                  p: 0,
                  maxWidth: '480px !important', // Override Material-UI's default container width
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
                  <Route path="/wingo" element={<WinGo />} />

                 
                  <Route path="/daily-commission" element={<DailyCommission/>} />
                  <Route path="/weekly-bonus" element={<WeeklyBonus />} />
                  <Route path="/myteam-trade" element={<MyTeam />} />
                  <Route path="/turnover" element={<TurnOver />} />
                  <Route path="/monthly-reward" element={<MonthlyRewards/>} />
                  <Route path='/k3' element={<K3GamePage/>}/>
                  <Route path='/5D' element={<Game5D/>}></Route>
                  <Route path="/team-bonus" element={<TeamBonus />} />

                
                  <Route path="/wingo/1min" element={<WinGo />} />
                  <Route path="/wingo/3min" element={<WinGo3 />} />
                  <Route path="/wingo/5min" element={<WinGo5 />} />
                  <Route path="/wingo/10min" element={<WinGo10 />} />
                  <Route path="/trx" element={<Trx1Min />} />
                  <Route path="/trx/1min" element={<Trx1Min />} />
                  <Route path="/trx/3min" element={<Trx3Min />} />
                  <Route path="/trx/5min" element={<Trx5Min />} />
                  <Route path="/trx/10min" element={<Trx10Min />} />

                  {/* Add more routes as needed */}
                </Routes>
              </Container>  
            </Box>
            <Box sx={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '480px',
              zIndex: 1000,
              backgroundColor: themeColors[currentTheme].background,
              backdropFilter: 'blur(20px)',
              borderTop: `1px solid ${themeColors[currentTheme].border}`,
            }}>
            </Box>
          </MobileContainer>
              <Footer currentTheme={currentTheme} />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
