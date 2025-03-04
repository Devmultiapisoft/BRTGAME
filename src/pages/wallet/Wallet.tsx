import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
  Grid
} from '@mui/material';
import { ArrowForwardIos, AccountBalanceWallet, SwapHoriz } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { redirect, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: 24
}));

const WalletPage = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [transferDirection, setTransferDirection] = useState<'mainToGame' | 'gameToMain'>('mainToGame');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const transactions = [
    { date: '2025-03-04 16:28:12', amount: '0.50 ETH', type: 'Deposit', status: 'Completed' },
    { date: '2025-03-04 15:15:51', amount: '1.20 BTC', type: 'Withdrawal', status: 'Pending' },
    { date: '2025-03-03 13:36:11', amount: '500.00 USDT', type: 'Deposit', status: 'Failed' }
  ];

  return (
    <AnimatedBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth:'100%',
        margin: '0 auto',
        p: 3,
        bgcolor: 'background.default',
        position: 'relative'
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowForwardIos sx={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Wallet
        </Typography>
      </Box>

      {/* Balance Overview */}
      <GlowPaper sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Main Wallet
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              $500
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Game Wallet
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              $100.00
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Recharge
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              $100.00
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Withdrawal
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              $100.00
            </Typography>
          </Grid>
        </Grid>

        {/* Wallet Transfer */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 3
        }}>
          <Button
            variant="outlined"
            onClick={() => setTransferDirection('mainToGame')}
            sx={{
              flex: 1,
              mr: 1,
              fontWeight: 600,
              background: transferDirection === 'mainToGame' ? 'rgba(0, 255, 136, 0.1)' : 'transparent'
            }}
          >
            Main → Game
          </Button>
          <Button
            variant="outlined"
            onClick={() => setTransferDirection('gameToMain')}
            sx={{
              flex: 1,
              ml: 1,
              fontWeight: 600,
              background: transferDirection === 'gameToMain' ? 'rgba(0, 255, 136, 0.1)' : 'transparent'
            }}
          >
            Game → Main
          </Button>
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<SwapHoriz />}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            background: 'linear-gradient(145deg, #00FF88 0%, #00E0FF 100%)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(0, 255, 136, 0.4)'
            }
          }}
        >
          Transfer Funds
        </Button>
      </GlowPaper>

      {/* Wallet Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[{name : 'Deposit', redirect : "deposit"}, {name : 'Withdraw', redirect : 'withdraw'}, {name : 'Deposit History', redirect : 'depositHistory'}, {name : 'Withdraw History', redirect : 'withdrawHistory'}].map((action, index) => (
          <Grid item xs={6} key={index}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AccountBalanceWallet />}
                sx={{
                  height: 80,
                  borderRadius: 2,
                  justifyContent: 'flex-start',
                  px: 3,
                  textTransform: 'none'
                }}
                onClick={()=>navigate(`${action.redirect}`)}
              >
                {action.name}
              </Button>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Transaction History */}
      <GlowPaper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              background: 'linear-gradient(90deg, #00FF88 0%, #00E0FF 100%)'
            }
          }}
        >
          <Tab label="Deposit History" sx={{ fontWeight: 600 }} />
          <Tab label="Withdrawal History" sx={{ fontWeight: 600 }} />
        </Tabs>

        <List>
          {transactions.map((transaction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem sx={{ py: 2 }}>
                <ListItemText
                  primary={transaction.amount}
                  secondary={transaction.date}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="textSecondary">
                    {transaction.type}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      color: transaction.status === 'Completed' ? '#00FF88' :
                             transaction.status === 'Pending' ? '#FFD700' : '#FF1744'
                    }}
                  >
                    {transaction.status}
                  </Typography>
                </Box>
              </ListItem>
              {index < transactions.length - 1 && <Divider variant="middle" />}
            </motion.div>
          ))}
        </List>
      </GlowPaper>
    </AnimatedBox>
  );
};

export default WalletPage;