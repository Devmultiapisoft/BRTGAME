import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PaletteIcon from '@mui/icons-material/Palette';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../theme';

const NavbarWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '480px',
  zIndex: 1000,
  backgroundColor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  boxShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: '100%',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  height: '56px',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
  height: '56px',
  width: '100%',
});

const Logo = styled(Typography)(({ theme }) => ({
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  fontWeight: 700,
  fontSize: '1.2rem',
  cursor: 'pointer',
  '&:hover': {
    textShadow: `0 0 10px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  },
}));

const MobileSearchBar = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: '56px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '480px',
  margin: '8px auto',
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg,
  borderRadius: '12px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  zIndex: 999,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '250px',
    boxSizing: 'border-box',
    backgroundColor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg,
    borderRight: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  },
}));

const ThemeMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '12px 16px',
  margin: '4px 8px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
    transform: 'translateX(4px)',
  },
}));

const ThemeColorBox = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: '50%',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].gradient,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    opacity: 1,
  },
}));

const ThemeLabel = styled(Typography)(({ theme }) => ({
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  fontWeight: 600,
  textTransform: 'capitalize',
  marginLeft: '12px',
}));

const quickLinks = [
  { label: 'Home', icon: <HomeIcon />, path: '/' },
  { label: 'Games', icon: <SportsEsportsIcon />, path: '/games' },
  { label: 'Wallet', icon: <AccountBalanceWalletIcon />, path: '/wallet' },
  { label: 'Promotions', icon: <CampaignIcon />, path: '/promotions' },
  { label: 'Support', icon: <EmojiEventsIcon />, path: '/support' },
];

interface NavbarProps {
  isMobile: boolean;
  onThemeChange: (theme: keyof typeof themeColors) => void;
  currentTheme: keyof typeof themeColors;
}

const Navbar: React.FC<NavbarProps> = ({ isMobile, onThemeChange, currentTheme }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [themeAnchorEl, setThemeAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleThemeClose = () => {
    setThemeAnchorEl(null);
  };

  const handleThemeSelect = (theme: keyof typeof themeColors) => {
    onThemeChange(theme);
    handleThemeClose();
  };

  const drawer = (
    <Box sx={{ 
      width: 250, 
      bgcolor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg,
      height: '100%',
      borderRight: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    }}>
      <List>
        {quickLinks.map((item) => (
          <ListItem 
            key={item.label}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
              }
            }}
          >
            <ListItemIcon sx={{ color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              sx={{ color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <NavbarWrapper>
        <StyledAppBar>
          <StyledToolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary }}
            >
              <MenuIcon />
            </IconButton>
            
            <Logo onClick={() => navigate('/')}>
              BRT GAMING
            </Logo>

            <Stack direction="row" spacing={1}>
              <IconButton 
                onClick={handleThemeClick}
                sx={{ 
                  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
                  '&:hover': {
                    background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
                  }
                }}
              >
                <PaletteIcon />
              </IconButton>
              <IconButton sx={{ color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary }}>
                <SearchIcon />
              </IconButton>
              <IconButton 
                onClick={() => navigate('/notification')}
                sx={{ 
                  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
                  '&:hover': {
                    background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
                  }
                }}
              >
                <NotificationsIcon />
              </IconButton>
            </Stack>
          </StyledToolbar>
        </StyledAppBar>
      </NavbarWrapper>

      <Menu
        anchorEl={themeAnchorEl}
        open={Boolean(themeAnchorEl)}
        onClose={handleThemeClose}
        PaperProps={{
          sx: {
            bgcolor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg,
            border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
            borderRadius: '16px',
            mt: 1,
            minWidth: '200px',
            boxShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
          }
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
              fontWeight: 700,
              px: 2,
              py: 1,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Select Theme
          </Typography>
          {Object.keys(themeColors).map((themeKey) => (
            <ThemeMenuItem
              key={themeKey}
              onClick={() => handleThemeSelect(themeKey as keyof typeof themeColors)}
              sx={{
                color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
                '&:hover': {
                  background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
              }}>
                <ThemeColorBox
                  sx={{
                    bgcolor: themeColors[themeKey as keyof typeof themeColors].primary,
                    border: themeKey === currentTheme ? `2px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text}` : 'none',
                    boxShadow: themeKey === currentTheme ? `0 0 10px ${themeColors[themeKey as keyof typeof themeColors].glow}` : 'none',
                  }}
                />
                <ThemeLabel>
                  {themeKey}
                </ThemeLabel>
                {themeKey === currentTheme && (
                  <Box
                    sx={{
                      ml: 'auto',
                      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }}
                  >
                    <PaletteIcon />
                  </Box>
                )}
              </Box>
            </ThemeMenuItem>
          ))}
        </Box>
      </Menu>

      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </StyledDrawer>

      <MobileSearchBar>
        <SearchIcon sx={{ color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary, mr: 1 }} />
        <Typography variant="body2" color={themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text}>
          Search games...
        </Typography>
      </MobileSearchBar>
    </>
  );
};

export default Navbar; 