import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import { themeColors } from '../../theme';

// Animation keyframes
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'rgba(0, 255, 136, 0.9)',
  padding: theme.spacing(2),
  color: '#000',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const SmallCommissionCard = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 26, 26, 0.9)',
  borderRadius: '8px',
  textAlign: 'center',
  height: '100%',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  boxShadow: '0 2px 4px rgba(0, 255, 136, 0.1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 255, 136, 0.2)',
  },
}));

const LargeCommissionCard = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 26, 26, 0.9)',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  boxShadow: '0 2px 4px rgba(0, 255, 136, 0.1)',
  '& .MuiCardMedia-root': {
    height: '140px',
    objectFit: 'cover',
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(1.5),
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 255, 136, 0.2)',
  },
}));

const GameBanner = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  boxShadow: '0 2px 4px rgba(0, 255, 136, 0.1)',
  '& .MuiCardMedia-root': {
    height: '120px',
    objectFit: 'cover',
  },
}));

const CommissionPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Header Section */}
      <HeaderSection>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          Commission
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Track your earnings and rewards
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          We will update commission rates from time to time
        </Typography>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ px: 2 }}>
        {/* Small Commission Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <SmallCommissionCard>
              <CardContent sx={{ p: 1 }}>
                <Box sx={{ color: '#00FF88', fontSize: '32px', mb: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: '32px' }} />
                </Box>
                <Typography variant="caption" sx={{ color: '#fff' }}>
                  Daily Commission
                </Typography>
              </CardContent>
            </SmallCommissionCard>
          </Grid>
          <Grid item xs={3}>
            <SmallCommissionCard>
              <CardContent sx={{ p: 1 }}>
                <Box sx={{ color: '#00FF88', fontSize: '32px', mb: 1 }}>
                  <AccountBalanceWalletIcon sx={{ fontSize: '32px' }} />
                </Box>
                <Typography variant="caption" sx={{ color: '#fff' }}>
                  Weekly Bonus
                </Typography>
              </CardContent>
            </SmallCommissionCard>
          </Grid>
          <Grid item xs={3}>
            <SmallCommissionCard>
              <CardContent sx={{ p: 1 }}>
                <Box sx={{ color: '#00FF88', fontSize: '32px', mb: 1 }}>
                  <EmojiEventsIcon sx={{ fontSize: '32px' }} />
                </Box>
                <Typography variant="caption" sx={{ color: '#fff' }}>
                  Monthly Rewards
                </Typography>
              </CardContent>
            </SmallCommissionCard>
          </Grid>
          <Grid item xs={3}>
            <SmallCommissionCard>
              <CardContent sx={{ p: 1 }}>
                <Box sx={{ color: '#00FF88', fontSize: '32px', mb: 1 }}>
                  <PeopleIcon sx={{ fontSize: '32px' }} />
                </Box>
                <Typography variant="caption" sx={{ color: '#fff' }}>
                  Team Bonus
                </Typography>
              </CardContent>
            </SmallCommissionCard>
          </Grid>
        </Grid>

        {/* Large Commission Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <LargeCommissionCard>
              <CardMedia
                component="img"
                image="https://res.inbofa999.com/india/upload/1099/fd8e745b7bab53317e4ff8fdf2e6253a.png"
                alt="Commission Rewards"
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#00FF88' }}>
                  Commission Rewards
                </Typography>
                <Typography variant="caption" sx={{ color: '#fff' }}>
                  Earn up to 80% commission on your team's activity
                </Typography>
              </CardContent>
            </LargeCommissionCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LargeCommissionCard>
              <CardMedia
                component="img"
                image="https://res.inbofa999.com/india/upload/1099/fd8e745b7bab53317e4ff8fdf2e6253a.png"
                alt="Level Rewards"
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#00FF88' }}>
                  Level Rewards
                </Typography>
                <Typography variant="caption" sx={{ color: '#fff' }}>
                  Unlock higher rewards as you level up your team
                </Typography>
              </CardContent>
            </LargeCommissionCard>
          </Grid>
        </Grid>

        {/* Commission Banners */}
        <Box>
          <GameBanner>
            <CardMedia
              component="img"
              image="https://res.inbofa999.com/india/upload/1099/fd8e745b7bab53317e4ff8fdf2e6253a.png"
              alt="Special Commission Event"
            />
          </GameBanner>
          <GameBanner>
            <CardMedia
              component="img"
              image="https://res.inbofa999.com/india/upload/1099/fd8e745b7bab53317e4ff8fdf2e6253a.png"
              alt="Bonus Rewards"
            />
          </GameBanner>
        </Box>
      </Container>
    </Box>
  );
};

export default CommissionPage; 