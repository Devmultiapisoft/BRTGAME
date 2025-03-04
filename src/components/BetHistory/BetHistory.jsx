import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: 24
}));

const BetHistoryPage = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(true);

  const bets = {
    unsettled: [
      {
        id: 1,
        game: "Coin Flip",
        details: "Heads",
        amount: "0.5 ETH",
        potentialWin: "1.0 ETH"
      },
      {
        id: 2,
        game: "Dice Roll",
        details: "Over 50",
        amount: "1.2 BTC",
        potentialWin: "2.4 BTC"
      }
    ],
    settled: [
      {
        id: 3,
        game: "Roulette",
        details: "Number 17",
        amount: "100 USDT",
        result: "Win",
        payout: "3500 USDT"
      },
      {
        id: 4,
        game: "Blackjack",
        details: "21 Points",
        amount: "50 USDT",
        result: "Loss",
        payout: "0 USDT"
      }
    ]
  };

  const handleTabChange = () => {
    setTabValue(!tabValue);
  };

  return (
    <AnimatedBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: '100%',
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
          Bet History
        </Typography>
      </Box>

      {/* Tabs */}
      <GlowPaper sx={{ mb: 3 }}>
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
          <Tab label="Unsettled Orders" sx={{ fontWeight: 600 }} />
          <Tab label="Settled Orders" sx={{ fontWeight: 600 }} />
        </Tabs>
      </GlowPaper>

      {/* Bet List */}
      <GlowPaper>
        <List>
          {(tabValue === 0 ? bets.unsettled : bets.settled).map((bet, index) => (
            <motion.div
              key={bet.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem sx={{ py: 2 }}>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {bet.game}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {bet.details}
                      </Typography>
                    </>
                  }
                  secondary={
                    tabValue === 0 ? (
                      <>
                        <Typography variant="body2" component="span" display="block">
                          Bet: {bet.amount}
                        </Typography>
                        <Typography variant="body2" component="span" display="block">
                          Potential Win: {bet.potentialWin}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" component="span" display="block">
                          Bet: {bet.amount}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          component="span" 
                          display="block"
                          sx={{
                            color: bet.result === 'Win' ? '#00FF88' : '#FF1744'
                          }}
                        >
                          {bet.result}: {bet.payout}
                        </Typography>
                      </>
                    )
                  }
                />
              </ListItem>
              {index < (tabValue === 0 ? bets.unsettled : bets.settled).length - 1 && (
                <Divider variant="middle" />
              )}
            </motion.div>
          ))}
        </List>
      </GlowPaper>
    </AnimatedBox>
  );
};

export default BetHistoryPage;