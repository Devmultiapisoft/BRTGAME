import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Chip,
  Paper,
  CardMedia,
  BottomNavigation,
  BottomNavigationAction,
  Stack,
  Divider,
  LinearProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CampaignIcon from '@mui/icons-material/Campaign';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PaletteIcon from '@mui/icons-material/Palette';
import { themeColors } from '../../theme';
import { Theme } from '@mui/material/styles';
import image from '../../assets/HeroImage.jpeg';

// Animation keyframes
const gradientGlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled components
const HeroCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '0',
  overflow: 'hidden',
  minHeight: '500px',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  marginRight: 'calc(-50vw + 50%)',
  background: `linear-gradient(45deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background} 30%, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20 90%)`,
  transform: 'perspective(1000px) rotateX(0deg)',
  transition: 'all 0.5s ease',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: '2px solid transparent',
    background: `linear-gradient(45deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary}) border-box`,
    mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    animation: `${gradientGlow} 4s ease infinite`,
  },
  '&:hover': {
    transform: 'perspective(1000px) rotateX(2deg)',
    '& .hero-content': {
      transform: 'translateY(-10px)',
    },
    '& .hero-image': {
      transform: 'scale(1.05)',
    },
  },
}));

const NeonText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary} 30%, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: `0 0 10px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
}));

const CategoryTab = styled(Tab)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  '&.Mui-selected': {
    color: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary} !important`,
  },
  '&:hover': {
    color: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary} !important`,
  },
}));

const GameCard = styled(Card)(({ theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 0 25px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
    '& .play-overlay': {
      opacity: 1,
    },
    '& .play-icon': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}));

const PlayOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 2,
  '&:hover': {
    opacity: 1,
    '& .play-icon': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
}));

const GamePlayIcon = styled(PlayArrowIcon)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.8)',
  color: '#FFFFFF',
  fontSize: '4rem',
  opacity: 0,
  transition: 'all 0.3s ease',
  filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))',
  zIndex: 2,
  '&:hover': {
    transform: 'translate(-50%, -50%) scale(1)',
  },
}));

const MobileAppBar = styled(AppBar)(({ theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const MobileToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
});

const MobileSearchBar = styled(Paper)(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '12px',
  margin: '8px 16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
}));

// Create theme switcher component
const ThemeSwitcher = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  right: 20,
  bottom: 20,
  zIndex: 1000,
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  color: '#000',
  '&:hover': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary,
  },
  '&.blue-theme': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    '&:hover': {
      background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary,
    },
  },
}));

// Styled components with theme support
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg || themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  backgroundImage: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}10, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary}10)`,
  transform: 'perspective(1000px) rotateX(0deg)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}10, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary}00)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'perspective(1000px) rotateX(5deg) translateY(-5px)',
    boxShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
    border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}50`,
    backgroundImage: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary}20)`,
    '&::before': {
      opacity: 1,
    },
    '& .play-icon': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '& .game-image': {
      transform: 'scale(1.05)',
    },
    '& .game-image::after': {
      opacity: 0.5,
    },
  },
}));

const GameImage = styled(CardMedia)({
  height: '100%',
  transition: 'transform 0.5s ease',
  transform: 'scale(1)',
  objectFit: 'cover',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
    opacity: 0.3,
  },
}) as typeof CardMedia;

const GameTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textAlign: 'center',
  fontWeight: 700,
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary,
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}30`,
    transform: 'scale(1.05)',
  },
  '.blue-theme &': {
    background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    '&:hover': {
      background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}30`,
    },
  },
}));

const GameStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '4px',
  padding: '4px 8px',
  gap: '0.5rem',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].sectionBg,
  borderRadius: '8px',
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  fontSize: '0.75rem',
  fontWeight: 600,
  whiteSpace: 'nowrap',
}));

const WinningInfoCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 0 25px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  },
  '&.blue-theme': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
    border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    '&:hover': {
      boxShadow: `0 0 25px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
    },
  },
}));

const LeaderboardTable = styled(TableContainer)(({ theme }: { theme: Theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  '& .MuiTableCell-root': {
    borderColor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border,
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  },
  '& .MuiTableHead-root .MuiTableCell-root': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    fontWeight: 700,
  },
  '&.blue-theme': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
    border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    '& .MuiTableCell-root': {
      borderColor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border,
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}10`,
  },
  '&:hover': {
    backgroundColor: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
  },
  '.blue-theme &': {
    '&:nth-of-type(odd)': {
      backgroundColor: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}10`,
    },
    '&:hover': {
      backgroundColor: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
    },
  },
}));

interface Game {
  id: string;
  name: string;
  image: string;
  path: string;
  players: number;
  multiplier: string;
  progress: number;
}

// Game data
const gamesData = {
  trx: [
    { id: 'trx1', name: 'TRX 1Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/trx/1', players: 1234, multiplier: 'x2.5', progress: 70 },
    { id: 'trx3', name: 'TRX 3Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/trx/3', players: 856, multiplier: 'x3.2', progress: 85 },
    { id: 'trx5', name: 'TRX 5Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/trx/5', players: 654, multiplier: 'x4.1', progress: 60 },
    { id: 'trx10', name: 'TRX 10Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/trx/10', players: 432, multiplier: 'x5.8', progress: 45 },
  ],
  wingo: [
    { id: 'wingo1', name: 'Win Go 1Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/wingo/1', players: 2345, multiplier: 'x2.8', progress: 90 },
    { id: 'wingo3', name: 'Win Go 3Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/wingo/3', players: 1678, multiplier: 'x3.5', progress: 75 },
    { id: 'wingo5', name: 'Win Go 5Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/wingo/5', players: 1234, multiplier: 'x4.2', progress: 60 },
    { id: 'wingo10', name: 'Win Go 10Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/wingo/10', players: 987, multiplier: 'x5.5', progress: 50 },
  ],
  k3: [
    { id: 'k31', name: 'K3 1Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/k3/1', players: 3456, multiplier: 'x2.8', progress: 85 },
    { id: 'k33', name: 'K3 3Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/k3/3', players: 2345, multiplier: 'x3.5', progress: 70 },
    { id: 'k35', name: 'K3 5Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/k3/5', players: 1678, multiplier: 'x4.2', progress: 55 },
    { id: 'k310', name: 'K3 10Min', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/k3/10', players: 1234, multiplier: 'x5.5', progress: 45 },
  ],
  aviator: [
    { id: 'aviator', name: 'Aviator', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/aviator', players: 4567, multiplier: 'x100', progress: 95 },
  ],
  casino: [
    { id: 'roulette', name: 'Roulette', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/casino/roulette', players: 3456, multiplier: 'x36', progress: 90 },
    { id: 'blackjack', name: 'Blackjack', image: 'https://in.piccdn123.com/static/_template_/orange/img/home/gamecategory_20231215033613klhe.png', path: '/casino/blackjack', players: 2345, multiplier: 'x3', progress: 85 },
  ],
};

const gamesCategories = [
  { label: 'TRX', value: 'trx', games: gamesData.trx },
  { label: 'Win Go', value: 'wingo', games: gamesData.wingo },
  { label: 'K3', value: 'k3', games: gamesData.k3 },
  { label: 'Aviator', value: 'aviator', games: gamesData.aviator },
  { label: 'Casino', value: 'casino', games: gamesData.casino },
  { label: 'Live', value: 'live', games: [] },
];

const quickLinks = [
  { label: 'Home', icon: <HomeIcon />, path: '/' },
  { label: 'Games', icon: <SportsEsportsIcon />, path: '/games' },
  { label: 'Wallet', icon: <AccountBalanceWalletIcon />, path: '/wallet' },
  { label: 'Promotions', icon: <CampaignIcon />, path: '/promotions' },
  { label: 'Support', icon: <EmojiEventsIcon />, path: '/support' },
];

const featuredGame = {
  name: 'BRT GAMING',
  commission: '80%',
  details: 'MembenNIGPSALA-50.00',
  image: image,
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`game-tabpanel-${index}`}
      aria-labelledby={`game-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Add these new game data arrays after the existing gamesData
const popularGames = [
  {
    id: 'popular1',
    name: 'TRX 1Min',
    image: '/images/trx.jpeg',
    path: '/trx/1',
    players: 1234,
    multiplier: 'x2.5',
    progress: 70,
  },
  {
    id: 'popular2',
    name: 'Win Go 1Min',
    image: '/images/wingo.png',
    path: '/wingo/1',
    players: 2345,
    multiplier: 'x2.8',
    progress: 90,
  },
  {
    id: 'popular3',
    name: 'Aviator',
    image: '/images/aviator.png',
    path: '/aviator',
    players: 3456,
    multiplier: 'x3.2',
    progress: 85,
  },
];

const wingoGames = [
  {
    id: 'wingo1',
    name: 'Win Go 1Min',
    image: '/images/wingo.png',
    path: '/wingo/1',
    players: 2345,
    multiplier: 'x2.8',
    progress: 90,
  },
  {
    id: 'wingo3',
    name: 'Win Go 3Min',
    image: '/images/wingo.png',
    path: '/wingo/3',
    players: 1678,
    multiplier: 'x3.5',
    progress: 75,
  },
  {
    id: 'wingo5',
    name: 'Win Go 5Min',
    image: '/images/wingo.png',
    path: '/wingo/5',
    players: 1234,
    multiplier: 'x4.2',
    progress: 60,
  },
];

const k3Games = [
  {
    id: 'k31',
    name: 'K3 1Min',
    image: '/images/k3.png',
    path: '/k3/1',
    players: 3456,
    multiplier: 'x2.8',
    progress: 85,
  },
  {
    id: 'k33',
    name: 'K3 3Min',
    image: '/images/k3.png',
    path: '/k3/3',
    players: 2345,
    multiplier: 'x3.5',
    progress: 70,
  },
  {
    id: 'k35',
    name: 'K3 5Min',
    image: '/images/k3.png',
    path: '/k3/5',
    players: 1678,
    multiplier: 'x4.2',
    progress: 55,
  },
];

const liveGames = [
  {
    id: 'live1',
    name: 'Live Roulette',
    image: '/images/live-roulette.png',
    path: '/live/roulette',
    players: 4567,
    multiplier: 'x36',
    progress: 95,
  },
  {
    id: 'live2',
    name: 'Live Blackjack',
    image: '/images/live-blackjack.png',
    path: '/live/blackjack',
    players: 3456,
    multiplier: 'x3',
    progress: 90,
  },
  {
    id: 'live3',
    name: 'Live Baccarat',
    image: '/images/live-baccarat.png',
    path: '/live/baccarat',
    players: 2345,
    multiplier: 'x8',
    progress: 85,
  },
];

// Add winning information data
const winningInfo = [
  {
    id: 1,
    username: 'Player123',
    game: 'TRX 1Min',
    amount: '₹50,000',
    time: '2 minutes ago',
  },
  {
    id: 2,
    username: 'Winner456',
    game: 'Win Go 3Min',
    amount: '₹25,000',
    time: '5 minutes ago',
  },
  {
    id: 3,
    username: 'Lucky789',
    game: 'K3 5Min',
    amount: '₹15,000',
    time: '10 minutes ago',
  },
];

// Add leaderboard data
const leaderboardData = [
  {
    rank: 1,
    username: 'TopPlayer',
    totalWins: 156,
    totalEarnings: '₹5,00,000',
    avatar: '/images/avatar1.png',
  },
  {
    rank: 2,
    username: 'ProGamer',
    totalWins: 142,
    totalEarnings: '₹4,50,000',
    avatar: '/images/avatar2.png',
  },
  {
    rank: 3,
    username: 'LuckyStar',
    totalWins: 128,
    totalEarnings: '₹4,00,000',
    avatar: '/images/avatar3.png',
  },
];

interface GamesPageProps {
  onThemeChange: (theme: keyof typeof themeColors) => void;
  currentTheme: keyof typeof themeColors;
}

const GamesPage: React.FC<GamesPageProps> = ({ onThemeChange, currentTheme }) => {
  const [tabValue, setTabValue] = useState(0);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    const category = Object.keys(gamesData)[newValue];
    const element = document.getElementById(category.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGameClick = (game: any) => {
    navigate(`/games/${game.path}`);
  };

  const handleThemeChange = () => {
    onThemeChange(currentTheme === 'green' ? 'blue' : 'green');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: themeColors[currentTheme].background,
    }}>
      <Container maxWidth="xl" sx={{ pb: 8, pt: isMobile ? 1 : 4 }}>
  
        {/* Hero Section */}
        <Box sx={{ mt: 0, mb: 6 }}>
          <HeroCard>
            <HeroImage
              component="img"
              image={featuredGame.image}
              alt={featuredGame.name}
              className="hero-image"
              sx={{
                width: '100%',
                height: '100%',
                objectPosition: 'center',
              }}
            />
            <HeroContent className="hero-content">
              <Container maxWidth="xl">
                <Grid container spacing={5} alignItems="center" mt={6}>
                  <Grid item xs={12} md={6}>
                    <HeroTitle>
                      BRT GAMING
                    </HeroTitle>
                    <HeroSubtitle>
                      The Future of Gaming
                    </HeroSubtitle>
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h3" sx={{ 
                        color: themeColors[currentTheme].primary,
                        fontWeight: 800,
                        mb: 2,
                        transform: 'translateZ(40px)',
                        textShadow: `0 0 10px ${themeColors[currentTheme].glow}`,
                      }}>
                        {featuredGame.commission} COMMISSION
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        color: themeColors[currentTheme].text,
                        transform: 'translateZ(30px)',
                        fontWeight: 500,
                      }}>
                        {featuredGame.details}
                      </Typography>
                    </Box>
                    <HeroButton  >
                      Play Now
                    </HeroButton>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      transform: 'translateZ(50px)',
                    }}>
                      <Box sx={{ 
                        background: `${themeColors[currentTheme].primary}15`,
                        padding: '32px',
                        borderRadius: '24px',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors[currentTheme].border}`,
                        boxShadow: `0 0 30px ${themeColors[currentTheme].glow}`,
                        width: '100%',
                        maxWidth: '400px',
                      }}>
                        <Typography variant="h5" sx={{ 
                          color: themeColors[currentTheme].primary,
                          mb: 3,
                          textAlign: 'center',
                          fontWeight: 700,
                        }}>
                          Featured Game
                        </Typography>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 3,
                        }}>
                          <Box sx={{ 
                            width: '80px',
                            height: '80px',
                            borderRadius: '16px',
                            background: `linear-gradient(135deg, ${themeColors[currentTheme].primary}, ${themeColors[currentTheme].secondary})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '2rem',
                            boxShadow: `0 0 20px ${themeColors[currentTheme].glow}`,
                          }}>
                            🎮
                          </Box>
                          <Box>
                            <Typography variant="h5" sx={{ 
                              color: themeColors[currentTheme].text,
                              fontWeight: 700,
                              mb: 1,
                            }}>
                              {featuredGame.name}
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: themeColors[currentTheme].primary,
                              fontWeight: 500,
                            }}>
                              Join thousands of players
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </HeroContent>
          </HeroCard>
        </Box>

        {/* Game Categories */}
        <Paper sx={{ 
          bgcolor: themeColors[currentTheme].background,
          p: isMobile ? 1 : 2, 
          mb: 4,
          border: `1px solid ${themeColors[currentTheme].border}`,
          overflowX: 'auto',
          position: 'sticky',
          top: isMobile ? 56 : 0,
          zIndex: 1000,
        }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                bgcolor: themeColors[currentTheme].primary,
                height: '3px',
              }
            }}
          >
            {Object.keys(gamesData).map((category, index) => (
              <CategoryTab 
                key={index} 
                label={category.toUpperCase()} 
                sx={{ 
                  fontSize: isMobile ? '0.8rem' : '1.1rem',
                  minWidth: isMobile ? 'auto' : 120,
                  px: isMobile ? 1 : 2
                }}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Winning Information Section */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: themeColors[currentTheme].primary,
              mb: 3, 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: isMobile ? '1.25rem' : '1.5rem'
            }}
          >
            <EmojiEventsIcon /> Recent Winners
          </Typography>
          <Grid container spacing={isMobile ? 2 : 3}>
            {winningInfo.map((winner) => (
              <Grid item xs={12} sm={6} md={4} key={winner.id}>
                <WinningInfoCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccountBalanceWalletIcon sx={{ color: themeColors[currentTheme].primary, mr: 1 }} />
                      <Typography variant="h6" color={themeColors[currentTheme].text}>
                        {winner.username}
                      </Typography>
                    </Box>
                    <Typography color={themeColors[currentTheme].text} gutterBottom>
                      {winner.game}
                    </Typography>
                    <Typography variant="h5" color={themeColors[currentTheme].primary} sx={{ mb: 1 }}>
                      {winner.amount}
                    </Typography>
                    <Typography variant="body2" color={themeColors[currentTheme].text}>
                      {winner.time}
                    </Typography>
                  </CardContent>
                </WinningInfoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Game Sections */}
        <Box sx={{ mt: 6 }}>
          {Object.entries(gamesData).map(([category, games], index) => (
            <Box key={category} id={category}>
              <GameSection 
                title={`${category.toUpperCase()} Games`} 
                games={games} 
                onGameClick={handleGameClick}
                isMobile={isMobile}
                isBlueTheme={currentTheme === 'blue'}
              />
            </Box>
          ))}
        </Box>

        {/* Theme Switcher */}
        <ThemeSwitcher 
          onClick={handleThemeChange}
          className={currentTheme === 'blue' ? 'blue-theme' : ''}
        >
          <PaletteIcon />
        </ThemeSwitcher>

        {/* Top Players Section with Trophy Design */}
        <Box sx={{ mt: 6 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: themeColors[currentTheme].primary,
              mb: 4, 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: '2rem', color: '#FFD700' }} /> Top Players
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative',
          }}>
            {leaderboardData.map((player, index) => (
              <TrophyCard
                key={player.rank}
                sx={{
                  transform: `perspective(1000px) rotateX(0deg) scale(${
                    index === 0 ? 1.1 : 
                    index === 1 ? 1.05 : 
                    index === 2 ? 1 : 0.95
                  })`,
                  '&:hover': {
                    transform: `perspective(1000px) rotateX(5deg) translateY(-5px) scale(${
                      index === 0 ? 1.15 : 
                      index === 1 ? 1.1 : 
                      index === 2 ? 1.05 : 1
                    })`,
                  },
                }}
              >
                <TrophyRank rank={player.rank}>
                  {player.rank === 1 ? '🥇' : 
                   player.rank === 2 ? '🥈' : 
                   player.rank === 3 ? '🥉' : player.rank}
                </TrophyRank>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  mt: 2
                }}>
                  <Box sx={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${themeColors[currentTheme].primary}, ${themeColors[currentTheme].secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    boxShadow: `0 0 15px ${themeColors[currentTheme].glow}`,
                  }}>
                    {player.username.charAt(0).toUpperCase()}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700,
                      color: themeColors[currentTheme].primary,
                      mb: 0.5
                    }}>
                      {player.username}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: themeColors[currentTheme].text,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <EmojiEventsIcon sx={{ fontSize: '1rem', color: '#FFD700' }} />
                      {player.totalWins} wins
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    textAlign: 'right',
                    background: `${themeColors[currentTheme].primary}15`,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: `1px solid ${themeColors[currentTheme].border}`,
                  }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: themeColors[currentTheme].primary,
                      fontWeight: 600
                    }}>
                      {player.totalEarnings}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: themeColors[currentTheme].text,
                      display: 'block'
                    }}>
                      Total Earnings
                    </Typography>
                  </Box>
                </Box>
              </TrophyCard>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Update GameSection component
const GameSection = ({ 
  title, 
  games, 
  onGameClick,
  isMobile,
  isBlueTheme 
}: { 
  title: string; 
  games: Game[]; 
  onGameClick: (path: string) => void;
  isMobile: boolean;
  isBlueTheme: boolean;
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ 
      mb: 6,
      background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].sectionBg,
      borderRadius: '20px',
      padding: '24px',
      border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
          mb: 3, 
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={isMobile ? 1 : 3} justifyContent="center">
        {games.map((game) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={game.id}>
            <StyledCard 
              onClick={() => onGameClick(game.path)}
              className={isBlueTheme ? 'blue-theme' : ''}
            >
              <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <GameImage
                  image={game.image}
                  title={game.name}
                  className="game-image"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
                <PlayOverlay className="play-overlay">
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon sx={{ fontSize: '1.2rem' }} />}
                    sx={{
                      backgroundImage: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary})`,
                      color: '#fff',
                      '&:hover': {
                        backgroundImage: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary}, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary})`,
                      },
                      borderRadius: '8px',
                      px: 2,
                      py: 0.5,
                      fontSize: '0.8rem',
                      boxShadow: `0 0 15px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
                    }}
                  >
                    Play
                  </Button>
                </PlayOverlay>
              </Box>
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 1 }}>
                <GameTitle variant="h6">
                  {game.name}
                </GameTitle>
                <GameStats>
                  <StatItem>
                    <TrendingUpIcon sx={{ fontSize: '1rem', color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary }} />
                    {game.multiplier}
                  </StatItem>
                  <StatItem>
                    👥 {game.players}
                  </StatItem>
                </GameStats>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Add new styled components for trophy design
const TrophyCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].sectionBg,
  borderRadius: '16px',
  padding: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  boxShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  transform: 'perspective(1000px) rotateX(0deg)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'perspective(1000px) rotateX(5deg) translateY(-5px)',
    boxShadow: `0 0 30px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}10, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary}10)`,
    borderRadius: '16px',
    zIndex: -1,
  },
}));

const TrophyRank = styled(Box)<{ rank: number }>(({ theme, rank }) => ({
  position: 'absolute',
  top: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: rank === 1 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
             rank === 2 ? 'linear-gradient(135deg, #C0C0C0, #A9A9A9)' :
             rank === 3 ? 'linear-gradient(135deg, #CD7F32, #B87333)' :
             themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  boxShadow: `0 0 15px ${rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  color: rank <= 3 ? '#000' : themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  fontWeight: 'bold',
  fontSize: '1.2rem',
  border: `2px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
}));

// Add new styled components for hero section
const HeroContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(4),
  background: `linear-gradient(transparent, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background}CC)`,
  transform: 'translateY(0)',
  transition: 'transform 0.5s ease',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)',
    zIndex: -1,
  },
}));

const HeroImage = styled(CardMedia)({
  height: '100%',
  transition: 'transform 0.5s ease',
  transform: 'scale(1)',
  objectFit: 'cover',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)',
    opacity: 0.8,
  },
}) as typeof CardMedia;

const HeroTitle = styled(NeonText)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  textShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}, 0 0 30px rgba(0,0,0,0.5)`,
  marginBottom: theme.spacing(2),
  transform: 'translateZ(50px)',
  '@media (max-width: 600px)': {
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: '#fff',
  marginBottom: theme.spacing(3),
  transform: 'translateZ(30px)',
  textShadow: '0 0 10px rgba(0,0,0,0.5)',
  '@media (max-width: 600px)': {
    fontSize: '1.2rem',
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary})`,
  color: '#fff',
  padding: '12px 32px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  transform: 'translateZ(20px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateZ(20px) scale(1.05)',
    boxShadow: `0 0 30px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  },
}));

export default GamesPage;
