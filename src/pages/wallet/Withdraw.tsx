import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider
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

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('Dxf73/c5c79197cfdc7k603aba8c8e80a0de78066');

  const withdrawalDetails = [
    { label: 'Withdrawal Fees', value: '2%' },
    { label: 'Remaining Betting Amount For Withdrawal', value: '4,002,225.40' },
    { label: 'Withdrawal Time', value: '08:00 AM - 08:00 PM' },
    { label: 'Daily Withdrawal Limit', value: '3 Times' },
    { label: 'Withdrawal Amount Range', value: '10 - Unlimited' }
  ];

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
          Withdraw Money
        </Typography>
      </Box>

      {/* Balance Section */}
      <GlowPaper sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Total Balance
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              $500
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Withdraw Balance
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              $500
            </Typography>
          </Grid>
        </Grid>

        {/* Crypto Address Form */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Add Crypto Address
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {['Name', 'A/c Number', 'FSC', 'USD7'].map((field) => (
            <Grid item xs={6} key={field}>
              <TextField
                fullWidth
                label={field}
                variant="outlined"
                size="small"
              />
            </Grid>
          ))}
        </Grid>

        <TextField
          fullWidth
          label="Crypto Address"
        //   value={cryptoAddress}
          multiline
          rows={2}
          sx={{ mb: 3 }}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Withdrawal Details */}
        <List sx={{ mb: 3 }}>
          {withdrawalDetails.map((detail, index) => (
            <div key={index}>
              <ListItem sx={{ py: 1 }}>
                <ListItemText
                  primary={`${index + 1}. ${detail.label}`}
                  secondary={detail.value}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body2',
                    color: 'textPrimary',
                    fontWeight: 600 
                  }}
                />
              </ListItem>
              {index < withdrawalDetails.length - 1 && <Divider variant="middle" />}
            </div>
          ))}
        </List>

        {/* Withdraw Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
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
          Withdraw Money
        </Button>
      </GlowPaper>
    </AnimatedBox>
  );
};

export default WithdrawPage;