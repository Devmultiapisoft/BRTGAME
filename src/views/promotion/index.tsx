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
  Button,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
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

const PromotionCard = styled(Card)({
  background: 'rgba(26, 26, 26, 0.9)',
  borderRadius: '16px',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 0 25px rgba(0, 255, 136, 0.3)',
    animation: `${pulseAnimation} 1s ease-in-out`,
  },
});

const StyledChip = styled(Chip)({
  background: 'rgba(0, 255, 136, 0.1)',
  color: '#00FF88',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  '&:hover': {
    background: 'rgba(0, 255, 136, 0.2)',
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
  '& .MuiSvgIcon-root': {
    fontSize: '24px',
    color: '#00FF88',
  },
});

const promotions = [
  {
    id: 1,
    title: 'Welcome Bonus',
    description: 'Get 100% bonus on your first deposit up to ₹10,000',
    icon: <CampaignIcon />,
    endDate: '2024-12-31',
    status: 'Active',
    reward: '100%',
    minDeposit: '₹1,000',
  },
  {
    id: 2,
    title: 'Weekly Cashback',
    description: 'Earn 10% cashback on your weekly losses',
    icon: <EmojiEventsIcon />,
    endDate: '2024-12-31',
    status: 'Active',
    reward: '10%',
    minDeposit: '₹5,000',
  },
  {
    id: 3,
    title: 'Referral Bonus',
    description: 'Get ₹500 for each friend you refer',
    icon: <TrendingUpIcon />,
    endDate: '2024-12-31',
    status: 'Active',
    reward: '₹500',
    minDeposit: '₹0',
  },
  {
    id: 4,
    title: 'Special Weekend',
    description: 'Double commission on weekends',
    icon: <LocalOfferIcon />,
    endDate: '2024-12-31',
    status: 'Active',
    reward: '2x',
    minDeposit: '₹0',
  },
];

interface PromotionPageProps {
  onThemeChange: (newTheme: keyof typeof themeColors) => void;
}

const PromotionPage: React.FC<PromotionPageProps> = ({ onThemeChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleThemeChange = () => {
    const newTheme = theme.palette.mode === 'dark' ? 'blue' : 'green';
    onThemeChange(newTheme);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ pb: 8, pt: isMobile ? 8 : 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <NeonText variant={isMobile ? "h3" : "h2"} sx={{ fontWeight: 900, mb: 2 }}>
            Special Promotions
          </NeonText>
          <Typography variant={isMobile ? "h6" : "h5"} color="#B0B0B0">
            Discover amazing offers and rewards
          </Typography>
        </Box>

        {/* Promotions Grid */}
        <Grid container spacing={isMobile ? 2 : 3}>
          {promotions.map((promo) => (
            <Grid item xs={12} sm={6} md={3} key={promo.id}>
              <PromotionCard>
                <CardContent>
                  <IconWrapper>
                    {promo.icon}
                  </IconWrapper>
                  <Typography variant="h6" color="#FFFFFF" gutterBottom>
                    {promo.title}
                  </Typography>
                  <Typography color="#B0B0B0" paragraph>
                    {promo.description}
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ color: '#00FF88', fontSize: '1rem' }} />
                      <Typography variant="body2" color="#B0B0B0">
                        Ends: {promo.endDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <StyledChip 
                        label={`Reward: ${promo.reward}`} 
                        size="small"
                      />
                      {promo.minDeposit !== '₹0' && (
                        <StyledChip 
                          label={`Min: ${promo.minDeposit}`} 
                          size="small"
                        />
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: '#00FF88',
                        color: '#000',
                        fontWeight: 700,
                        '&:hover': {
                          bgcolor: '#00CC6A',
                        }
                      }}
                    >
                      Claim Now
                    </Button>
                  </Stack>
                </CardContent>
              </PromotionCard>
            </Grid>
          ))}
        </Grid>

        {/* Terms and Conditions */}
        <Paper 
          sx={{ 
            p: isMobile ? 2 : 4,
            mt: 6,
            background: 'rgba(26, 26, 26, 0.9)',
            border: '1px solid rgba(0, 255, 136, 0.1)',
            borderRadius: '16px',
          }}
        >
          <Typography variant="h5" color="#00FF88" gutterBottom>
            Terms & Conditions
          </Typography>
          <Stack spacing={2}>
            <Typography color="#B0B0B0">
              • All promotions are subject to our terms and conditions
            </Typography>
            <Typography color="#B0B0B0">
              • One promotion can be active at a time
            </Typography>
            <Typography color="#B0B0B0">
              • Minimum deposit requirements must be met
            </Typography>
            <Typography color="#B0B0B0">
              • Promotions cannot be combined with other offers
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default PromotionPage; 