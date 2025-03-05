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
  Snackbar,
  Alert,
  Slide,
  CircularProgress,
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
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { TransitionProps } from '@mui/material/transitions';
import CountUp from 'react-countup';

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

// Add new animations
const flashAnimation = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
  50% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.8); }
  100% { box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
`;

// Styled components
const HeroCard = styled(Card)(({ theme }) => ({
  // width: '100%',
  // height: '200px', // Set height for mobile screens
  position: 'relative',
  background: 'transparent',
  boxShadow: 'none',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
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
  padding: '16px',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  },
  '& .game-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  },
  '& .game-header': {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  '& .game-icon': {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem'
  },
  '& .game-info': {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  '& .game-title': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
    fontSize: '1rem',
    fontWeight: 600
  },
  '& .game-amount': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    fontSize: '1.1rem',
    fontWeight: 700
  },
  '& .game-user': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  '& .avatar': {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 600
  },
  '& .username': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
    fontSize: '0.9rem'
  }
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
  // maxWidth: '100%',
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
  path: string;
  winningAmount?: string;
  username?: string;
  image?: string;
  players?: number;
  multiplier?: string;
  progress?: number;
}

// Game data
const gamesData = {
  lottery: [
    { id: 'wingo', name: 'Win Go', path: '/wingo', winningAmount: '₹3,552.00', username: 'Mem****987' },
    { id: 'trx', name: 'Trx Win Go', path: '/trx', winningAmount: '₹2,236.00', username: 'Mem****939' },
    { id: 'racing', name: 'Racing', path: '/racing', winningAmount: '₹2,078.00', username: 'Mem****225' },
    { id: 'k3', name: 'K3', path: '/k3', winningAmount: '₹1,845.00', username: 'Mem****445' },
  ],
  original: [
    { id: 'original1', name: 'Original Game 1', path: '/original/1', winningAmount: '₹2,324.00', username: 'Mem****550' },
  ],
  slots: [
    { id: 'slots1', name: 'Slots Game 1', path: '/slots/1', winningAmount: '₹4,283.00', username: 'Mem****426' },
  ],
  sports: [
    { id: 'sports1', name: 'Sports Game 1', path: '/sports/1', winningAmount: '₹3,084.00', username: 'Mem****830' },
  ],
  casino: [
    { id: 'casino1', name: 'Casino Game 1', path: '/casino/1', winningAmount: '₹2,156.00', username: 'Mem****721' },
  ],
  rummy: [
    { id: 'rummy1', name: 'Rummy Game 1', path: '/rummy/1', winningAmount: '₹5,156.00', username: 'Mem****332' },
  ],
  fishing: [
    { id: 'fishing1', name: 'Fishing Game 1', path: '/fishing/1', winningAmount: '₹1,956.00', username: 'Mem****445' },
  ],
  popular: [
    { id: 'popular1', name: 'Popular Game 1', path: '/popular/1', winningAmount: '₹3,356.00', username: 'Mem****889' },
  ],
};

const gamesCategories = [
  { label: 'Lottery', value: 'lottery', games: gamesData.lottery, icon: '🎲' },
  { label: 'Original', value: 'original', games: gamesData.original, icon: '🎮' },
  { label: 'Slots', value: 'slots', games: gamesData.slots, icon: '🎰' },
  { label: 'Sports', value: 'sports', games: gamesData.sports, icon: '⚽' },
  { label: 'Casino', value: 'casino', games: gamesData.casino, icon: '🎲' },
  { label: 'Rummy', value: 'rummy', games: gamesData.rummy, icon: '🃏' },
  { label: 'Fishing', value: 'fishing', games: gamesData.fishing, icon: '🎣' },
  { label: 'Popular', value: 'popular', games: gamesData.popular, icon: '🏆' },
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

interface GameSectionProps {
  title: string;
  games: Game[];
  onGameClick: (game: Game) => void;
  isMobile: boolean;
  isBlueTheme: boolean;
}

const GameSection: React.FC<GameSectionProps> = ({ title, games, onGameClick, isMobile, isBlueTheme }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} key={game.id}>
            <GameCard onClick={() => onGameClick(game)}>
              <Box className="game-content">
                <Box className="game-header">
                  <Box className="game-icon">
                    {gamesCategories.find(cat => cat.value === game.id.split('1')[0])?.icon || '🎮'}
                  </Box>
                  <Box className="game-info">
                    <Typography className="game-title">
                      {game.name}
                    </Typography>
                    <Typography className="game-amount">
                      Winning amount {game.winningAmount || '₹1,324.00'}
                    </Typography>
                  </Box>
                </Box>
                <Box className="game-user">
                  <Box className="avatar">
                    {(game.username || 'Mem****550').charAt(0)}
                  </Box>
                  <Typography className="username">
                    {game.username || 'Mem****550'}
                  </Typography>
                </Box>
              </Box>
            </GameCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

interface GamesPageProps {
  onThemeChange: (theme: 'blue' | 'green') => void;
  currentTheme: 'blue' | 'green';
}

const GamesPage: React.FC<GamesPageProps> = ({ onThemeChange, currentTheme }) => {
  const [tabValue, setTabValue] = useState(0);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);
  const [onlinePlayers, setOnlinePlayers] = useState<number>(0);
  const [jackpotAmount, setJackpotAmount] = useState(1000000);
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "Weekend Mega Tournament",
      prize: "₹1,000,000",
      players: 256,
      timeLeft: "2d 5h",
      game: "Win Go"
    },
    {
      id: 2,
      name: "Daily Speed Challenge",
      prize: "₹500,000",
      players: 128,
      timeLeft: "5h 30m",
      game: "TRX"
    },
    {
      id: 3,
      name: "Pro Players League",
      prize: "₹750,000",
      players: 64,
      timeLeft: "1d 12h",
      game: "K3"
    }
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    const category = Object.keys(gamesData)[newValue];
    const element = document.getElementById(category.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGameClick = (game: Game) => {
    navigate(game.path);
  };

  const handleThemeChange = () => {
    onThemeChange(currentTheme === 'green' ? 'blue' : 'green');
  };

  useEffect(() => {
    // Simulate socket connection for online players
    const interval = setInterval(() => {
      setOnlinePlayers(Math.floor(Math.random() * 1000) + 500);
    }, 5000);

    // Simulate incoming game notifications
    const notificationInterval = setInterval(() => {
      const messages = [
        "🎉 New jackpot winner: ₹50,000!",
        "🔥 Hot streak: 5 wins in a row!",
        "💰 Big win alert: ₹100,000!",
        "🎮 New game tournament starting soon!",
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setNotifications(prev => {
        const newNotifications = [...prev, { id: Date.now(), message: randomMessage }];
        // Keep the last 3 notifications visible
        if (newNotifications.length > 3) {
          newNotifications.shift();
        }
        return newNotifications;
      });

      // Remove the first notification after 3 seconds
      setTimeout(() => {
        setNotifications(notifications => notifications.filter(n => n.id !== notifications[0].id));
      }, 3000);
    }, 10000);

    // Update jackpot amount
    const jackpotInterval = setInterval(() => {
      setJackpotAmount(prev => prev + Math.floor(Math.random() * 1000));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(notificationInterval);
      clearInterval(jackpotInterval);
    };
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: themeColors[currentTheme].background,
    }}>
      <Container sx={{ pb: 8, pt: isMobile ? 1 : 1 }}>
  
        {/* Hero Section */}
        <Box sx={{ mt: 0, mb: 1, position: 'relative', overflow: 'hidden', width: '100%' }}>
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
                filter: 'brightness(0.7)',
              }}
            />
            <HeroContent className="hero-content">
              <Container>
                <Grid container spacing={5} alignItems="center" mt={6} sx={{ textAlign: 'center' }}>
                  <Grid item xs={12}  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        textShadow: `0 0 10px ${themeColors[currentTheme].glow}`,
                      }}>
                        {featuredGame.commission} COMMISSION
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        color: themeColors[currentTheme].text,
                        fontWeight: 500,
                      }}>
                        {featuredGame.details}
                      </Typography>
                    </Box>
                    <HeroButton sx={{
                      '&:hover': {
                        backgroundColor: themeColors[currentTheme].secondary,
                        transform: 'scale(1.05)',
                      },
                    }}>
                      Play Now
                    </HeroButton>
                  </Grid>
                  <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ 
                      background: `${themeColors[currentTheme].primary}15`,
                      padding: '32px',
                      borderRadius: '24px',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${themeColors[currentTheme].border}`,
                      boxShadow: `0 0 30px ${themeColors[currentTheme].glow}`,
                      width: '100%',
                    }}>
                      <Typography variant="h5" sx={{ 
                        color: themeColors[currentTheme].text,
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
                  </Grid>
                </Grid>
              </Container>
            </HeroContent>
          </HeroCard>
        </Box>
        <Box sx={{
        // position: 'fixed',
        // top: '20px',
        // left: '20px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: theme => `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background}CC`,
        backdropFilter: 'blur(10px)',
        padding: '8px 16px',
        borderRadius: '20px',
        border: theme => `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
        width: { xs: '190px', sm: '190px' }, // Responsive width
      }}>
        <LiveIndicator />
        <Typography variant="body2" sx={{ color: '#4CAF50' }}>
          {onlinePlayers.toLocaleString()} Players Online
        </Typography>
      </Box>
        {/* Jackpot Counter */}
        <JackpotCounter>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            MEGA JACKPOT
          </Typography>
          <Typography variant="h3" sx={{ 
            color: '#fff',
            fontWeight: 800,
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
          }}>
            ₹<CountUp end={jackpotAmount} separator="," duration={2} />
          </Typography>
        </JackpotCounter>

        {/* Live Tournaments */}
        <Box sx={{ mb: 6, width: '100%' }}>
          <Typography variant="h5" sx={{ 
            mb: 3,
            color: themeColors[currentTheme].primary,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <EmojiEventsIcon /> Live Tournaments
          </Typography>
          <Grid container spacing={3} sx={{ width: '100%' }}>
            {tournaments.map((tournament) => (
              <Grid item xs={12} sm={12}  key={tournament.id} sx={{ width: '100%' }}>
                <TournamentCard>
                  <PrizeBadge>
                    {tournament.prize}
                  </PrizeBadge>
                  <Typography variant="h6" sx={{ mb: 2, color: themeColors[currentTheme].text }}>
                    {tournament.name}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2
                  }}>
                    <Typography variant="body2" sx={{ color: themeColors[currentTheme].text }}>
                      🎮 {tournament.game}
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeColors[currentTheme].primary }}>
                      👥 {tournament.players} Players
                    </Typography>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="body2" sx={{ color: themeColors[currentTheme].text }}>
                      ⏰ Ends in: {tournament.timeLeft}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: `linear-gradient(135deg, ${themeColors[currentTheme].primary}, ${themeColors[currentTheme].secondary})`,
                        color: '#fff',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${themeColors[currentTheme].secondary}, ${themeColors[currentTheme].primary})`,
                        }
                      }}
                    >
                      Join Now
                    </Button>
                  </Box>
                </TournamentCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Winning Information Section */}
        <WinningInfoSection>
          <WinningInfoTitle variant="h6">
            Winning Information
          </WinningInfoTitle>
          <WinningInfoList>
            <WinningInfoItem>
              <Box className="user-avatar">
                <img src="/path/to/avatar1.jpg" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography>Mem****783</Typography>
              <Box className="game-icon">🎮</Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="winning-amount">₹5,248.00</Typography>
                <Typography variant="caption" sx={{ color: themeColors[currentTheme].text }}>
                  Winning amount
                </Typography>
              </Box>
            </WinningInfoItem>
            <WinningInfoItem>
              <Box className="user-avatar">
                <img src="/path/to/avatar2.jpg" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography>Mem****335</Typography>
              <Box className="game-icon">🎲</Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="winning-amount">₹8,101.00</Typography>
                <Typography variant="caption" sx={{ color: themeColors[currentTheme].text }}>
                  Winning amount
                </Typography>
              </Box>
            </WinningInfoItem>
            <WinningInfoItem>
              <Box className="user-avatar">
                <img src="/path/to/avatar3.jpg" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography>Mem****666</Typography>
              <Box className="game-icon">🎰</Box>
              <Box sx={{ flex: 1 }}>
                <Typography className="winning-amount">₹9,202.00</Typography>
                <Typography variant="caption" sx={{ color: themeColors[currentTheme].text }}>
                  Winning amount
                </Typography>
              </Box>
            </WinningInfoItem>
          </WinningInfoList>
        </WinningInfoSection>

        {/* Game Categories Grid */}
        <Box sx={{ mb: 6 }}>
          <GameCategoryGrid>
            <CategoryCard>
              <Box className="category-icon">🎲</Box>
              <Typography className="category-name">Lottery</Typography>
            </CategoryCard>
            <CategoryCard>
              <Box className="category-icon">🎮</Box>
              <Typography className="category-name">Original</Typography>
            </CategoryCard>
            <CategoryCard>
              <Box className="category-icon">🎰</Box>
              <Typography className="category-name">Slots</Typography>
            </CategoryCard>
            <CategoryCard>
              <Box className="category-icon">⚽</Box>
              <Typography className="category-name">Sports</Typography>
            </CategoryCard>
            <CategoryCard>
              <Box className="category-icon">🎲</Box>
              <Typography className="category-name">Casino</Typography>
            </CategoryCard>
            <CategoryCard>
              <Box className="category-icon">🃏</Box>
              <Typography className="category-name">Rummy</Typography>
            </CategoryCard>
            <CategoryCard>
              <Box className="category-icon">🎣</Box>
              <Typography className="category-name">Fishing</Typography>
            </CategoryCard>
            <CategoryCard>
              <Box className="category-icon">🏆</Box>
              <Typography className="category-name">Popular</Typography>
            </CategoryCard>
          </GameCategoryGrid>
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
              <Grid item xs={12} sm={12}  key={winner.id}>
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

        {/* Today's Earnings Rank Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ 
            mb: 3, 
            color: themeColors[currentTheme].primary, 
            fontWeight: 700,
            fontSize: isMobile ? '1.25rem' : '1.5rem',
          }}>
            Today's Earnings Rank
          </Typography>
          <EarningsRankSection>
            <PodiumSection />
            <RankList>
              <RankListItem>
                <Box className="rank">4</Box>
                <Box className="avatar">
                  <img src="/path/to/avatar4.jpg" alt="4th" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography sx={{ fontSize: isMobile ? '12px' : '14px' }}>Mem****558</Typography>
                <Typography className="amount">₹320,686.00</Typography>
              </RankListItem>
              <RankListItem>
                <Box className="rank">5</Box>
                <Box className="avatar">
                  <img src="/path/to/avatar5.jpg" alt="5th" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography sx={{ fontSize: isMobile ? '12px' : '14px' }}>Mem****656</Typography>
                <Typography className="amount">₹119,321.00</Typography>
              </RankListItem>
            </RankList>
          </EarningsRankSection>
        </Box>

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

        {/* Theme Switcher */}
        <ThemeSwitcher 
          onClick={handleThemeChange}
          className={currentTheme === 'blue' ? 'blue-theme' : ''}
        >
          <PaletteIcon />
        </ThemeSwitcher>
      </Container>

      {/* Flash Notifications */}
    <Box sx={{
      position: 'fixed',
      top: { xs: '60px', md: '70px' }, // Adjust for mobile and desktop
      right: '20px',
      zIndex: 9999,
      // background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
      borderRadius: '12px',
      padding: '12px',
      // border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}`,
      // boxShadow: `0 0 15px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: { xs: '90%', sm: '100%' }, // Responsive width
    }}>
      {notifications.map(notification => (
        <FlashNotification key={notification.id} sx={{
           background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20`,
          // borderRadius: '8px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          
          // boxShadow: `0 0 10px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
        }}>
          <NotificationsActiveIcon color="primary" />
          <Typography variant="body2" sx={{ color: theme => themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text }}>
            {notification.message}
          </Typography>
        </FlashNotification>
      ))}
    </Box>

    
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

// Add new styled components
const FlashNotification = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '70px', // Adjusted to be below the navbar
  right: '20px',
  zIndex: 9999,
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '12px',
  padding: '12px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}`,
  boxShadow: `0 0 15px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  animation: `${flashAnimation} 3s ease-in-out`,
}));

const LiveIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '13px',
  right: '20px',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: '#4CAF50',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    borderRadius: '50%',
    background: '#4CAF50',
    animation: `${pulseGlow} 2s infinite`,
  },
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
  // Set a maximum width for the content
  margin: '0 auto', // Center the content
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

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 900,
  textShadow: `0 0 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}, 0 0 30px rgba(0,0,0,0.5)`,
  marginBottom: theme.spacing(2),
  transform: 'translateZ(50px)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  color: '#fff',
  marginBottom: theme.spacing(3),
  transform: 'translateZ(30px)',
  textShadow: '0 0 10px rgba(0,0,0,0.5)',
  [theme.breakpoints.down('sm')]: {
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

const GameCategoryGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px',
  padding: '24px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    padding: '16px',
  },
}));

const CategoryCard = styled(Box)(({ theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '16px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 20px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}20`,
  },
  '& .category-icon': {
    fontSize: '32px',
    marginBottom: '8px',
  },
  '& .category-name': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
    fontSize: '14px',
    fontWeight: 600,
    textAlign: 'center',
  },
}));

const WinningInfoSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const WinningInfoTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  fontWeight: 600,
}));

const WinningInfoList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '16px',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
}));

const WinningInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: '12px',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  '& .user-avatar': {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  '& .game-icon': {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  },
  '& .winning-amount': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    fontWeight: 600,
  },
}));

const EarningsRankSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  padding: '24px',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
  },
}));

const RankPodium = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '16px',
  marginBottom: '24px',
  position: 'relative',
  padding: '20px 0',
  [theme.breakpoints.down('sm')]: {
    gap: '8px',
    padding: '16px 0',
  },
}));

interface PodiumStepProps {
  rank: 1 | 2 | 3;
  username: string;
  amount: string;
  avatar: string;
}

const PodiumStep = styled(Box)<{ rank: 1 | 2 | 3 }>(({ theme, rank }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '16px',
  width: rank === 1 ? '120px' : '100px',
  height: rank === 1 ? '120px' : rank === 2 ? '100px' : '80px',
  background: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary})`,
  borderRadius: '16px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: rank === 1 ? '100px' : '80px',
    height: rank === 1 ? '100px' : rank === 2 ? '80px' : '60px',
    padding: '12px',
  },
  '& .crown': {
    position: 'absolute',
    top: '-30px',
    fontSize: '40px',
    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
      top: '-25px',
    },
  },
  '& .avatar': {
    width: rank === 1 ? '60px' : '50px',
    height: rank === 1 ? '60px' : '50px',
    borderRadius: '50%',
    border: '2px solid #fff',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    [theme.breakpoints.down('sm')]: {
      width: rank === 1 ? '50px' : '40px',
      height: rank === 1 ? '50px' : '40px',
    },
  },
  '& .username': {
    color: '#fff',
    fontSize: rank === 1 ? '14px' : '12px',
    fontWeight: 600,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: rank === 1 ? '12px' : '10px',
    },
  },
  '& .amount': {
    color: '#fff',
    fontSize: rank === 1 ? '16px' : '14px',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: rank === 1 ? '14px' : '12px',
    },
  },
}));

const RankList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    gap: '8px',
  },
}));

const RankListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  background: `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}15`,
  borderRadius: '12px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    gap: '8px',
  },
  '& .rank': {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      width: '20px',
      height: '20px',
      fontSize: '12px',
    },
  },
  '& .avatar': {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `2px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    [theme.breakpoints.down('sm')]: {
      width: '32px',
      height: '32px',
    },
  },
  '& .amount': {
    marginLeft: 'auto',
    padding: '4px 12px',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    color: '#fff',
    borderRadius: '20px',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      padding: '4px 8px',
      fontSize: '12px',
    },
  },
}));

const PodiumSection = () => {
  const theme = useTheme();
  const podiumData = [
    { rank: 2, username: 'Mem****401', amount: '₹585,900.00', avatar: '/path/to/avatar2.jpg' },
    { rank: 1, username: 'Mem****133', amount: '₹736,012.00', avatar: '/path/to/avatar1.jpg' },
    { rank: 3, username: 'Mem****534', amount: '₹405,798.00', avatar: '/path/to/avatar3.jpg' },
  ];

  return (
    <RankPodium>
      {podiumData.map((data) => (
        <PodiumStep key={data.rank} rank={data.rank as 1 | 2 | 3}>
          {data.rank === 1 && <span className="crown">👑</span>}
          <Box className="avatar">
            <img src={data.avatar} alt={`${data.rank}${data.rank === 1 ? 'st' : data.rank === 2 ? 'nd' : 'rd'}`} 
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
          <Typography className="username">{data.username}</Typography>
          <Typography className="amount">{data.amount}</Typography>
        </PodiumStep>
      ))}
    </RankPodium>
  );
};

// Add new styled components for jackpot counter
const JackpotCounter = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary})`,
  padding: '24px',
  borderRadius: '16px',
  textAlign: 'center',
  marginBottom: '32px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    animation: `${gradientGlow} 3s ease infinite`,
  },
}));

// Add new styled components for tournament card
const TournamentCard = styled(Card)(({ theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  padding: '16px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 0 30px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  },
}));

// Add new styled components for prize badge
const PrizeBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  color: '#fff',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: 600,
  animation: `${pulseAnimation} 2s infinite`,
}));

export default GamesPage;
