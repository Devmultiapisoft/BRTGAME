import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { ArrowForwardIos, AccountBalanceWallet } from '@mui/icons-material';
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

const DepositPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('USDT_BEP20');

  const handleAmountClick = (value) => {
    setAmount(value.toString());
  };

  const predefinedAmounts = [50, 100, 500, 1000];

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
          Deposit
        </Typography>
      </Box>

      {/* Balance Display */}
      <GlowPaper sx={{ mb: 3, textAlign: 'center', py: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Total Balance
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900 }}>
          $41,388,241.49
        </Typography>
      </GlowPaper>

      {/* Payment Method */}
      <GlowPaper sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            label="Payment Method"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="USDT_BEP20">USDT BEP20</MenuItem>
            <MenuItem value="Manual_Pay">Manual Pay</MenuItem>
          </Select>
        </FormControl>

        {/* Amount Selection */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Amount
        </Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {predefinedAmounts.map((value) => (
            <Grid item xs={3} key={value}>
              <Button
                fullWidth
                variant={amount === value.toString() ? 'contained' : 'outlined'}
                onClick={() => handleAmountClick(value)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                  background: amount === value.toString() ? 
                    'linear-gradient(145deg, #00FF88 0%, #00E0FF 100%)' : 'transparent'
                }}
              >
                {value}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Custom Amount Input */}
        <TextField
          fullWidth
          label="Enter Amount"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Bonus Information */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          *Every recharge you get 5% additional bonus
        </Typography>

        {/* Warning */}
        <Typography variant="caption" color="error" sx={{ mb: 2, display: 'block' }}>
          If you transfer the wrong amount as instructed, the funds will be lost, and our company will not be responsible!
        </Typography>

        {/* Note */}
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
          *Note: You must deposit the exact amount as instructed in the order. The system will automatically update the bonus funds.
        </Typography>
      </GlowPaper>

      {/* Deposit Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<AccountBalanceWallet />}
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
        Deposit Fund
      </Button>
    </AnimatedBox>
  );
};

export default DepositPage;