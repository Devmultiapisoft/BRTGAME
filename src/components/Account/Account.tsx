import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import {
  AccountBalanceWallet,
  CreditCard,
  MoneyOff,
  Diamond,
  SportsEsports,
  SwapHoriz,
  AccountBalance,
  NotificationsActive,
  CardGiftcard,
  Equalizer,
  Translate,
  Settings,
  Feedback,
  Announcement,
  ExitToApp,
  Home,
  Person,
  Menu,
  School,
  Info,
  Support
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, #2196F3 0%, #21CBF3 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `linear-gradient(45deg, transparent 25%, 
      rgba(255,255,255,0.1) 50%, transparent 75%)`,
    animation: 'shine 4s infinite linear',
  },
  '@keyframes shine': {
    '0%': { transform: 'rotate(0deg) translateX(-50%)' },
    '100%': { transform: 'rotate(360deg) translateX(50%)' },
  },
}));

const MemberDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on mount
      }, []);
    
  return (
    <AnimatedBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        maxWidth: 375,
        margin: '0 auto',
        p: 3,
        bgcolor: 'background.default',
        borderRadius: 4,
        boxShadow: 6,
        position: 'relative'
      }}
    >
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h6" sx={{ 
            fontWeight: 800, 
            letterSpacing: 1,
            background: 'linear-gradient(45deg, #4a4a4a 30%, #2b2b2b 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            MEMBER-13379554
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            UID 1337954
          </Typography>
        </Box>
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Avatar src="/logo.png" sx={{ width: 48, height: 48, boxShadow: 3 }} />
        </motion.div>
      </Box>

      {/* Last Login */}
      <Typography variant="caption" sx={{ 
        color: 'text.secondary', 
        display: 'block', 
        textAlign: 'right',
        fontFamily: 'monospace'
      }}>
        Last login: 2025-03-04 15:15:51
      </Typography>

      {/* Total Balance */}
      <GlowPaper sx={{ my: 4, py: 3, borderRadius: 3, color: 'white' }}>
        <motion.div animate={{ scale: [0.95, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Typography variant="h6" align="center">Total Balance</Typography>
          <Typography variant="h2" align="center" sx={{ fontWeight: 900 }}>$0.00</Typography>
        </motion.div>
      </GlowPaper>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { text: 'Wallett', icon: <AccountBalanceWallet />, color: 'primary' },
          { text: 'Deposit', icon: <CreditCard />, color: 'secondary' },
          { text: 'Withdraw', icon: <MoneyOff />, color: 'error' },
          { text: 'SVIP', icon: <Diamond />, color: 'warning' }
        ].map((btn, index) => (
          <Grid item xs={6} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                variant="contained"
                color={btn.color}
                startIcon={btn.icon}
                sx={{ 
                  height: 80, 
                  flexDirection: 'column', 
                  borderRadius: 2,
                  boxShadow: theme => `0 4px 20px ${theme.palette[btn.color].light}`
                }}
              >
                <Typography variant="button" sx={{ fontWeight: 700 }}>{btn.text}</Typography>
              </Button>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Menu List */}
      <List sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
        {[
          { icon: <SportsEsports />, primary: 'Bet', secondary: 'My betting history' },
          { icon: <SwapHoriz />, primary: 'Transaction', secondary: 'My transaction history' },
          { icon: <AccountBalance />, primary: 'Deposit', secondary: 'My deposit history' },
          { icon: <AccountBalance />, primary: 'Withdraw', secondary: 'My withdraw history' },
          { icon: <NotificationsActive />, primary: 'Notification', Redirect : ()=>navigate("/notification")},
          { icon: <CardGiftcard />, primary: 'Gifts' },
          { icon: <Equalizer />, primary: 'Game Statistics' },
          { icon: <Translate />, primary: 'Language', secondary: 'English' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem button sx={{ py: 2 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.primary}
                secondary={item.secondary}
                primaryTypographyProps={{ fontWeight: 600 }}
                onClick={item.Redirect}
              />
            </ListItem>
            <Divider variant="inset" />
          </motion.div>
        ))}
      </List>

      {/* Service Center */}
      <AnimatedBox
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        sx={{ 
          mt: 4,
          bgcolor: 'background.paper',
          borderRadius: 3,
          p: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
        }}
      >
        <Typography variant="h6" sx={{ 
          mb: 2, 
          fontWeight: 800,
          background: 'linear-gradient(45deg, #2196F3 0%, #21CBF3 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Service Center
        </Typography>

        <Grid container spacing={1}>
          {[
            { text: 'Settings', icon: <Settings />, color: 'primary', Nav: () => navigate('/settings') },
            { text: 'Customer Service', icon: <Support />, color: 'secondary', Nav: () => navigate('/customer-service') },
            { text: 'Beginner\'s Guide', icon: <School />, color: 'info', Nav: () => navigate('#') },
            { text: 'Feedback', icon: <Feedback />, color: 'warning', Nav: () => navigate('/feedback') },
            { text: 'Announcement', icon: <Announcement />, color: 'success', Nav: () => navigate('/announcement') },
            { text: 'About Us', icon: <Info />, color: 'error', Nav: () => navigate('/about-us') }
          ].map((item) => (
            <Grid item xs={4} key={item.text}>
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  rotate: [-0.5, 0.5, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color={item.color}
                  startIcon={item.icon}
                  sx={{
                    height: 90,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 100,
                    flexDirection: 'column',
                    gap: 1,
                    boxShadow: theme => `0 4px 16px ${theme.palette[item.color].light}`
                  }}
                  onClick={item.Nav}
                >
                  <Typography variant="caption" sx={{ 
                    fontWeight: 700,
                    lineHeight: 1.0,
                    textAlign: 'center'
                  }}>
                    {item.text}
                  </Typography>
                </Button>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </AnimatedBox>

      {/* Footer Links */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
        {['Customer Service', 'Beginner\'s Guide', 'About Us'].map((text) => (
          <motion.div key={text} whileHover={{ scale: 1.1 }}>
            <Typography variant="caption" sx={{ 
              cursor: 'pointer', 
              fontWeight: 500,
              color: 'text.secondary'
            }}>
              {text}
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* Logout Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<ExitToApp />}
            sx={{ 
              px: 6, 
              borderRadius: 2, 
              fontWeight: 700,
              boxShadow: '0 4px 20px rgba(244, 67, 54, 0.3)'
            }}
          >
            Log out
          </Button>
        </motion.div>
      </Box>
      
    </AnimatedBox>
  );
};

export default MemberDashboard;