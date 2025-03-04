import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  Button,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { themeColors } from '../../theme';
import { useNavigate } from 'react-router-dom';

interface PromotionPageProps {
  onThemeChange?: (newTheme: keyof typeof themeColors) => void;
}

const HeaderSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? themeColors.green.primary : themeColors.green.primary,
  color: theme.palette.mode === 'dark' ? themeColors.green.text : '#fff',
  padding: '20px',
  textAlign: 'center',
  backdropFilter: 'blur(10px)',
}));

const StatsCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? themeColors.green.cardBg : '#fff',
  borderRadius: '12px',
  padding: '15px',
  marginBottom: '10px',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.mode === 'dark' ? themeColors.green.border : '#eee'}`,
  color: theme.palette.mode === 'dark' ? themeColors.green.text : 'inherit',
}));

const MenuButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  width: '100%',
  textAlign: 'left',
  padding: '15px',
  color: theme.palette.mode === 'dark' ? themeColors.green.text : '#333',
  textTransform: 'none',
  background: theme.palette.mode === 'dark' ? themeColors.green.cardBg : '#fff',
  borderRadius: '12px',
  marginBottom: '8px',
  border: `1px solid ${theme.palette.mode === 'dark' ? themeColors.green.border : '#eee'}`,
  boxShadow: 'none',
  '&:hover': {
    background: theme.palette.mode === 'dark' ? themeColors.green.hoverBg : '#f5f5f5',
  },
}));

const InvitationButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? themeColors.green.primary : theme.palette.primary.main,
  color: theme.palette.mode === 'dark' ? themeColors.green.text : '#fff',
  width: '100%',
  padding: '12px',
  borderRadius: '25px',
  marginTop: '15px',
  marginBottom: '15px',
  '&:hover': {
    background: theme.palette.mode === 'dark' ? themeColors.green.accent : theme.palette.primary.dark,
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.palette.mode === 'dark' ? themeColors.green.text : '#333',
  margin: '5px 0',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.mode === 'dark' ? themeColors.green.text : '#666',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? themeColors.green.primary : theme.palette.primary.main,
}));

const PromotionPage: React.FC<PromotionPageProps> = ({ onThemeChange }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleCopyInvitation = () => {
    navigator.clipboard.writeText('303821337955');
  };

  const menuItems = [
    { 
      icon: <DataUsageIcon />, 
      label: 'Subordinate Data',
      path: '/subordinate/data'
    },
    { 
      icon: <MonetizationOnIcon />, 
      label: 'Commission Details',
      path: '/commission/details'
    },
    { 
      icon: <GroupAddIcon />, 
      label: 'New Subordinates',
      path: '/subordinate/new'
    },
    { 
      icon: <DescriptionIcon />, 
      label: 'Invitation Rules',
      path: '/invitation/rules'
    },
    { 
      icon: <HeadsetMicIcon />, 
      label: 'Agent Line Customer Service',
      path: '/agent/customer-service'
    },
    { 
      icon: <LocalOfferIcon />, 
      label: 'Rebate Ratio',
      path: '/rebate/ratio'
    }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ 
      bgcolor: themeColors.green.background, 
      minHeight: '100vh',
      color: themeColors.green.text,
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      <HeaderSection>
        <Typography variant="h6">Agent</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Upgrade the level to increase commission income
        </Typography>
        <StatValue>0.00</StatValue>
        <StatLabel>Commission Balance</StatLabel>
        <StatValue sx={{ mt: 2 }}>0.00</StatValue>
        <StatLabel>Total Commission Yesterday</StatLabel>
        
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ 
              color: isDarkMode ? themeColors.green.text : '#fff',
              borderColor: isDarkMode ? themeColors.green.text : '#fff'
            }}
          >
            Turn Into Balance
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ 
              color: isDarkMode ? themeColors.green.text : '#fff',
              borderColor: isDarkMode ? themeColors.green.text : '#fff'
            }}
          >
            Commission Withdrawal
          </Button>
        </Stack>
      </HeaderSection>

      <Container sx={{ mt: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StatsCard onClick={() => handleMenuClick('/subordinate/data')}>
              <Box sx={{ textAlign: 'center' }}>
                <IconWrapper>
                  <PersonIcon fontSize="large" />
                </IconWrapper>
                <Typography variant="subtitle1" sx={{ mt: 1, color: isDarkMode ? themeColors.green.text : 'inherit' }}>
                  Direct Subordinates
                </Typography>
                <StatValue>0</StatValue>
                <StatLabel>Registration Accounts</StatLabel>
                <StatValue sx={{ mt: 1 }}>0</StatValue>
                <StatLabel>Deposit Accounts</StatLabel>
                <StatValue sx={{ mt: 1 }}>0</StatValue>
                <StatLabel>Deposit Amount</StatLabel>
                <StatValue sx={{ mt: 1 }}>0</StatValue>
                <StatLabel>New Deposit Accounts</StatLabel>
              </Box>
            </StatsCard>
          </Grid>
          <Grid item xs={6}>
            <StatsCard onClick={() => handleMenuClick('/subordinate/data')}>
              <Box sx={{ textAlign: 'center' }}>
                <IconWrapper>
                  <GroupIcon fontSize="large" />
                </IconWrapper>
                <Typography variant="subtitle1" sx={{ mt: 1, color: isDarkMode ? themeColors.green.text : 'inherit' }}>
                  Team Subordinates
                </Typography>
                <StatValue>0</StatValue>
                <StatLabel>Registration Accounts</StatLabel>
                <StatValue sx={{ mt: 1 }}>0</StatValue>
                <StatLabel>Deposit Accounts</StatLabel>
                <StatValue sx={{ mt: 1 }}>0</StatValue>
                <StatLabel>Deposit Amount</StatLabel>
                <StatValue sx={{ mt: 1 }}>0</StatValue>
                <StatLabel>New Deposit Accounts</StatLabel>
              </Box>
            </StatsCard>
          </Grid>
        </Grid>

        <InvitationButton variant="contained" onClick={() => handleMenuClick('/invitation/rules')}>
          INVITATION LINK
        </InvitationButton>

        <MenuButton onClick={handleCopyInvitation}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
            <IconWrapper>
              <ContentCopyIcon />
            </IconWrapper>
            <Box flex={1}>
              <Typography color={isDarkMode ? themeColors.green.text : 'inherit'}>
                Copy Invitation Code
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ color: isDarkMode ? themeColors.green.text : 'text.secondary' }}
              >
                303821337955
              </Typography>
            </Box>
            <KeyboardArrowRightIcon sx={{ color: isDarkMode ? themeColors.green.text : 'inherit' }} />
          </Stack>
        </MenuButton>

        {menuItems.map((item, index) => (
          <MenuButton key={index} onClick={() => handleMenuClick(item.path)}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
              <IconWrapper>
                {item.icon}
              </IconWrapper>
              <Typography 
                flex={1}
                sx={{ color: isDarkMode ? themeColors.green.text : 'inherit' }}
              >
                {item.label}
              </Typography>
              <KeyboardArrowRightIcon sx={{ color: isDarkMode ? themeColors.green.text : 'inherit' }} />
            </Stack>
          </MenuButton>
        ))}

        <StatsCard sx={{ mt: 2 }} onClick={() => handleMenuClick('/commission/details')}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ color: isDarkMode ? themeColors.green.text : 'inherit' }}
          >
            Promotion Data
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ textAlign: 'center' }}>
                <StatValue>0.00</StatValue>
                <StatLabel>This Week's Commission</StatLabel>
                <StatValue sx={{ mt: 2 }}>0</StatValue>
                <StatLabel>Direct Subordinates</StatLabel>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ textAlign: 'center' }}>
                <StatValue>0.00</StatValue>
                <StatLabel>Total Commission</StatLabel>
                <StatValue sx={{ mt: 2 }}>0</StatValue>
                <StatLabel>Total Subordinates</StatLabel>
              </Box>
            </Grid>
          </Grid>
        </StatsCard>
      </Container>
    </Box>
  );
};

export default PromotionPage; 