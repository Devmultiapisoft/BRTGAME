import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
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
const gradientGlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const NeonText = styled(Typography)({
  background: 'linear-gradient(45deg, #00ff88 30%, #00b4d8 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
});

const StatCard = styled(Card)({
  background: 'rgba(26, 26, 26, 0.9)',
  borderRadius: '16px',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 0 25px rgba(0, 255, 136, 0.3)',
    animation: `${pulseAnimation} 1s ease-in-out`,
    '& .icon-wrapper': {
      transform: 'scale(1.1)',
      background: 'rgba(0, 255, 136, 0.2)',
    },
    '& .value-text': {
      transform: 'scale(1.05)',
      textShadow: '0 0 15px rgba(0, 255, 136, 0.5)',
    },
  },
});

const IconWrapper = styled(Box)({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'rgba(0, 255, 136, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '24px',
    color: '#00FF88',
  },
});

interface CommissionPageProps {
  onThemeChange: (newTheme: keyof typeof themeColors) => void;
}

const CommissionPage: React.FC<CommissionPageProps> = ({ onThemeChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleThemeChange = () => {
    const newTheme = theme.palette.mode === 'dark' ? 'blue' : 'green';
    onThemeChange(newTheme);
  };

  const stats = [
    {
      title: 'Total Commission',
      value: '₹50,000',
      icon: <TrendingUpIcon />,
      color: '#00FF88',
    },
    {
      title: 'Available Balance',
      value: '₹25,000',
      icon: <AccountBalanceWalletIcon />,
      color: '#00FF88',
    },
    {
      title: 'Total Rewards',
      value: '₹15,000',
      icon: <EmojiEventsIcon />,
      color: '#00FF88',
    },
    {
      title: 'Active Users',
      value: '1,234',
      icon: <PeopleIcon />,
      color: '#00FF88',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ pb: 8, pt: isMobile ? 8 : 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <NeonText variant={isMobile ? "h3" : "h2"} sx={{ fontWeight: 900, mb: 2 }}>
            Commission Dashboard
          </NeonText>
          <Typography variant={isMobile ? "h6" : "h5"} color="#B0B0B0">
            Track your earnings and rewards
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <IconWrapper className="icon-wrapper">
                    {stat.icon}
                  </IconWrapper>
                  <Typography 
                    variant="h6" 
                    color="#FFFFFF" 
                    gutterBottom
                    sx={{ 
                      fontSize: isMobile ? '1rem' : '1.25rem',
                      fontWeight: 600
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    className="value-text"
                    sx={{ 
                      color: stat.color,
                      fontWeight: 700,
                      textShadow: `0 0 10px ${stat.color}40`,
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      transition: 'all 0.3s ease',
                      mt: 'auto'
                    }}
                  >
                    {stat.value}
                  </Typography>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        {/* Commission Details */}
        <Paper 
          sx={{ 
            p: isMobile ? 2 : 4,
            background: 'rgba(26, 26, 26, 0.9)',
            border: '1px solid rgba(0, 255, 136, 0.1)',
            borderRadius: '16px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 0 25px rgba(0, 255, 136, 0.2)',
            }
          }}
        >
          <Typography 
            variant="h5" 
            color="#00FF88" 
            gutterBottom
            sx={{ 
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              fontWeight: 700
            }}
          >
            Commission Structure
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography 
                variant="h6" 
                color="#FFFFFF" 
                gutterBottom
                sx={{ 
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 600
                }}
              >
                Level 1 Commission
              </Typography>
              <Typography 
                color="#B0B0B0"
                sx={{ 
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
              >
                Earn 10% commission on your direct referrals
              </Typography>
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                color="#FFFFFF" 
                gutterBottom
                sx={{ 
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 600
                }}
              >
                Level 2 Commission
              </Typography>
              <Typography 
                color="#B0B0B0"
                sx={{ 
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
              >
                Earn 5% commission on your indirect referrals
              </Typography>
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                color="#FFFFFF" 
                gutterBottom
                sx={{ 
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 600
                }}
              >
                Special Bonuses
              </Typography>
              <Typography 
                color="#B0B0B0"
                sx={{ 
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
              >
                Get additional rewards for achieving monthly targets
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CommissionPage; 