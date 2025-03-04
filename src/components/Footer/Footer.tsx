import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { themeColors } from '../../theme';

const FooterWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '480px',
  zIndex: 1000,
  boxShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  backdropFilter: 'blur(10px)',
  borderTop: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  height: '56px',
  '& .MuiBottomNavigationAction-root': {
    minWidth: 'auto',
    padding: '4px',
    flex: 1,
  },
  '& .MuiBottomNavigationAction-label': {
    fontSize: '0.7rem',
    marginTop: '2px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  '&.Mui-selected': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    '& .MuiBottomNavigationAction-label': {
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    },
    '& .MuiSvgIcon-root': {
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    },
  },
  '&:hover': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    '& .MuiBottomNavigationAction-label': {
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    },
    '& .MuiSvgIcon-root': {
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    },
  },
}));

interface FooterProps {
  currentTheme: keyof typeof themeColors;
}

const Footer: React.FC<FooterProps> = ({ currentTheme }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const paths = ['/', '/commission', '/promotion', '/wallet', '/account'];
    window.location.href = paths[newValue];
  };

  return (
    <FooterWrapper>
      <StyledBottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
      >
        <StyledBottomNavigationAction 
          label="Home" 
          icon={<HomeIcon />}
        />
        <StyledBottomNavigationAction 
          label="Commission" 
          icon={<EmojiEventsIcon />}
        />
        <StyledBottomNavigationAction 
          label="Promotion" 
          icon={<CampaignIcon />}
        />
        <StyledBottomNavigationAction 
          label="Wallet" 
          icon={<AccountBalanceWalletIcon />}
        />
        <StyledBottomNavigationAction 
          label="Account" 
          icon={<SportsEsportsIcon />}
        />
      </StyledBottomNavigation>
    </FooterWrapper>
  );
};

export default Footer; 