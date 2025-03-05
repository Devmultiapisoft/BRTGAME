import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
  SwipeableDrawer as BottomSheet,
} from '@mui/material';
import {
  ArrowBack,
  VolumeUp,
  Refresh,
  Add,
  Remove,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../../theme';
import { keyframes } from '@mui/system';

// Add this animation keyframe
const rotateScale = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.05);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

// Styled components
const GameContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#090909',
  minHeight: '100vh',
  color: '#fff',
}));

const WalletCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
}));

const NumberCircle = styled(Button)<{ selected?: boolean; isStored?: boolean }>(({ theme, selected, isStored }) => ({
  width: '100%',
  aspectRatio: '1', // Makes it perfectly square
  padding: 0,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: selected ? '#fff' : theme.palette.text.primary,
  border: selected ? '2px solid #fae59f' : '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px', // Rounded corners for the square
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',

  // Background image
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '85%',
    height: '85%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url('/image-removebg-preview.png')`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
  },

  // Selection overlay
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: selected ? 'rgba(143, 82, 6, 0.8)' : 'transparent',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    zIndex: 1,
  },

  '&:hover': {
    borderColor: '#fae59f',
  },

  '& .number': {
    position: 'relative',
    zIndex: 2,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textShadow: selected ? '0 0 4px rgba(0,0,0,0.5)' : 'none',
  },
}));

const SpecialButton = styled(Button)<{ selected?: boolean; isStored?: boolean }>(
  ({ theme, selected, isStored }) => ({
    padding: '8px',
    borderRadius: '8px',
    border: `2px solid ${
      isStored
        ? '#FF0000'
        : selected
        ? theme.palette.secondary.main
        : theme.palette.divider
    }`,
    backgroundColor: selected ? 'rgba(156, 39, 176, 0.08)' : 'transparent',
    color: selected ? theme.palette.secondary.main : theme.palette.text.primary,
    boxShadow: selected ? '0 0 8px rgba(156, 39, 176, 0.4)' : 'none',
    '&:hover': {
      backgroundColor: selected ? 'rgba(156, 39, 176, 0.12)' : 'rgba(0, 0, 0, 0.04)',
    },
  })
);

const BetTimeButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  marginBottom: '16px',
  '& button': {
    flex: 1,
    padding: '8px',
    borderRadius: '8px',
    border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
    '&.active': {
      background: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary})`,
      color: '#fff',
    }
  }
}));

const BetDialog = styled(BottomSheet)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '95%',
    width: '400px',
    margin: '0 auto',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    background: theme.palette.background.paper,
  },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TimerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  backdropFilter: 'blur(4px)',
  borderRadius: 'inherit',
}));

const CountdownTimer = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontSize: '24px',
  fontWeight: 'bold',
  textShadow: '0 0 10px rgba(0,0,0,0.5)',
}));

interface GameState {
  balance: number;
  currentPeriod: string;
  selectedAmount: number;
  quantity: number;
  multiplier: number;
  isDialogOpen: boolean;
  selectedNumbers: number[];
  timeLeft: number;
  selectedBetTime: number;
  betTypes: string[]; // Changed from single betType to array of betTypes
  storedNumbers: number[];
  storedBetTypes: string[];
}

// Add this new interface for game history
interface GameResult {
  period: string;
  numbers: number[];
  result: string;
  time: string;
  color?: string;
}

const K3Game: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    balance: 1000,
    currentPeriod: '202401010001',
    selectedAmount: 1,
    quantity: 1,
    multiplier: 1,
    isDialogOpen: false,
    selectedNumbers: [],
    timeLeft: 180,
    selectedBetTime: 30, // default 30 seconds
    betTypes: [], // Initialize as empty array
    storedNumbers: [],
    storedBetTypes: [],
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  // Add this new state
  const [gameHistory, setGameHistory] = useState<GameResult[]>([
    {
      period: '202401010001',
      numbers: [3, 5, 8],
      result: 'Big',
      time: '12:30',
      color: '#4CAF50'  // green for win
    },
    {
      period: '202401010002',
      numbers: [1, 2, 4],
      result: 'Small',
      time: '12:29',
      color: '#FF1744'  // red for loss
    },
    // Add more sample data as needed
  ]);

  const amounts = [1, 10, 100, 1000];
  const multipliers = [1, 5, 10, 20, 50, 100];
  const betTimes = [30, 60, 180, 300]; // 30s, 1min, 3min, 5min
  const betTypes = [
    { type: 'Big', value: 100 },
    { type: 'Small', value: 100 },
    { type: 'Odd', value: 100 },
    { type: 'Even', value: 100 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft > 0 ? prev.timeLeft - 1 : prev.selectedBetTime;
        
        // Show countdown when 5 seconds or less remain
        if (newTimeLeft <= 5) {
          setShowCountdown(true);
          setIsTimeUp(true);
        } else if (newTimeLeft === prev.selectedBetTime) {
          setShowCountdown(false);
          setIsTimeUp(false);
        }
        
        return {
          ...prev,
          timeLeft: newTimeLeft
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNumberSelect = (number: number) => {
    if (isTimeUp) return;

    setGameState(prev => {
      const isNumberSelected = prev.selectedNumbers.includes(number);
      const isNumberStored = prev.storedNumbers.includes(number);

      if (isNumberSelected) {
        // If number is selected, remove it from stored numbers if it's there
        return {
          ...prev,
          selectedNumbers: prev.selectedNumbers.filter(n => n !== number),
          storedNumbers: prev.storedNumbers.filter(n => n !== number),
        };
      } else {
        // If number is not selected, add it to both selected and stored
        return {
          ...prev,
          betTypes: [], // Clear special selections when selecting numbers
          selectedNumbers: [...prev.selectedNumbers, number],
          storedNumbers: [...prev.storedNumbers, number],
        };
      }
    });
  };

  const handleSpecialSelect = (type: 'Big' | 'Small' | 'Odd' | 'Even') => {
    if (isTimeUp) return;

    setGameState(prev => {
      const isTypeSelected = prev.betTypes.includes(type);
      const isTypeStored = prev.storedBetTypes.includes(type);

      if (isTypeSelected) {
        // If type is selected, remove it from stored types if it's there
        return {
          ...prev,
          betTypes: prev.betTypes.filter(t => t !== type),
          storedBetTypes: prev.storedBetTypes.filter(t => t !== type),
        };
      } else {
        // If type is not selected, add it to both selected and stored
        return {
          ...prev,
          betTypes: [...prev.betTypes, type],
          storedBetTypes: [...prev.storedBetTypes, type],
        };
      }
    });
  };

  const handleBetTimeSelect = (time: number) => {
    setGameState(prev => ({
      ...prev,
      selectedBetTime: time,
      timeLeft: time // Reset timer with new selected time
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBetSubmit = () => {
    if (gameState.selectedNumbers.length === 0 && gameState.betTypes.length === 0) return;
    
    // Calculate total amount including both number and special bets
    const numberBetsAmount = gameState.selectedNumbers.length * gameState.selectedAmount;
    const specialBetsAmount = gameState.betTypes.length * gameState.selectedAmount;
    const totalAmount = (numberBetsAmount + specialBetsAmount) * gameState.quantity * gameState.multiplier;
    
    if (totalAmount > gameState.balance) return;

    setGameState(prev => ({
      ...prev,
      balance: prev.balance - totalAmount,
      isDialogOpen: false,
      selectedNumbers: [],
      betTypes: [],
    }));
  };

  return (
    <GameContainer>
      <AppBar position="static" color="transparent">
        <Box display="flex" justifyContent="space-between" p={2}>
          <IconButton color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">K3 Game</Typography>
          <IconButton color="inherit">
            <VolumeUp />
          </IconButton>
        </Box>
      </AppBar>

      <Container maxWidth="sm">
        {/* Timer Display */}
        <Box textAlign="center" my={2}>
          <Typography variant="h4" color="primary">
            {formatTime(gameState.timeLeft)}
          </Typography>
          <Typography>Period: {gameState.currentPeriod}</Typography>
        </Box>

        {/* Bet Time Selection */}
        <BetTimeButtons>
          {betTimes.map(time => (
            <Button
              key={time}
              className={gameState.selectedBetTime === time ? 'active' : ''}
              onClick={() => handleBetTimeSelect(time)}
            >
              {time === 30 ? '30s' : time === 60 ? '1m' : time === 180 ? '3m' : '5m'}
            </Button>
          ))}
        </BetTimeButtons>

        {/* Game Sections Container */}
        <Box position="relative">
          {/* Single Overlay for both sections */}
          {showCountdown && (
            <TimerOverlay>
              <CountdownTimer>
                {gameState.timeLeft}s
              </CountdownTimer>
            </TimerOverlay>
          )}

          {/* Number Grid */}
          <Box mt={3}>
            <Grid container spacing={2}>
              {Array.from({ length: 16 }, (_, i) => i + 1).map((number, index) => (
                <Grid item xs={3} key={number} sx={{ aspectRatio: '1' }}>
                  <NumberCircle
                    disabled={isTimeUp}
                    selected={gameState.selectedNumbers.includes(number)}
                    isStored={gameState.storedNumbers.includes(number)}
                    onClick={() => handleNumberSelect(number)}
                    sx={{
                      opacity: showCountdown ? 0.5 : 1,
                      pointerEvents: showCountdown ? 'none' : 'auto',
                    }}
                  >
                    <span className="number">{number}</span>
                  </NumberCircle>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Special Buttons */}
          <Box mt={2}>
            <Grid container spacing={2}>
              {betTypes.map(({ type, value }) => (
                <Grid item xs={3} key={type}>
                  <SpecialButton
                    fullWidth
                    disabled={isTimeUp}
                    variant={gameState.betTypes.includes(type) ? "contained" : "outlined"}
                    isStored={gameState.storedBetTypes.includes(type)}
                    onClick={() => handleSpecialSelect(type as 'Big' | 'Small' | 'Odd' | 'Even')}
                    sx={{
                      opacity: showCountdown ? 0.5 : 1,
                      pointerEvents: showCountdown ? 'none' : 'auto',
                    }}
                  >
                    <Box>
                      <Typography variant="body2">{type}</Typography>
                      <Typography variant="caption">₹{value}</Typography>
                    </Box>
                  </SpecialButton>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Place Bet Button */}
        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            disabled={isTimeUp || (gameState.selectedNumbers.length === 0 && gameState.betTypes.length === 0)}
            onClick={() => setGameState(prev => ({ ...prev, isDialogOpen: true }))}
            sx={{
              backgroundColor: '#8f5206',
              color: '#fae59f',
              '&:hover': {
                backgroundColor: '#6d3f05',
              },
              opacity: showCountdown ? 0.5 : 1,
              pointerEvents: showCountdown ? 'none' : 'auto',
            }}
          >
            {isTimeUp ? 'Time Up' : 'Place Bet'}
          </Button>
        </Box>

        {/* Results Table */}
        <Box mt={3} sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ 
            '& th, & td': { 
              padding: '8px',
              fontSize: '0.875rem',
              borderBottom: '1px solid rgba(224, 224, 224, 0.4)'
            }
          }}>
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Numbers</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameHistory.map((record, index) => (
                <TableRow key={index} sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }}>
                  <TableCell>{record.period}</TableCell>
                  <TableCell>{record.numbers.join(', ')}</TableCell>
                  <TableCell sx={{ color: record.color }}>{record.result}</TableCell>
                  <TableCell>{record.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Betting Dialog */}
        <BetDialog
          open={gameState.isDialogOpen}
          onClose={() => setGameState(prev => ({ ...prev, isDialogOpen: false }))}
          TransitionComponent={Slide}
          TransitionProps={{ direction: "up" }}
        >
          <DialogHeader>
            <Typography variant="h6">Place Bet</Typography>
            <Box textAlign="right">
              <Typography variant="caption" color="textSecondary">Available Balance</Typography>
              <Typography variant="h6" color="primary">₹ {gameState.balance}</Typography>
            </Box>
          </DialogHeader>

          <DialogContent sx={{ p: 2 }}>
            {/* Selected Items Summary */}
            <Box mb={2} p={2} bgcolor="action.hover" borderRadius={2}>
              {gameState.selectedNumbers.length > 0 && (
                <Box mb={1}>
                  <Typography variant="subtitle2" color="textSecondary">Selected Numbers</Typography>
                  <Typography variant="body1">
                    {gameState.selectedNumbers.join(', ')}
                  </Typography>
                </Box>
              )}
              
              {gameState.betTypes.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Selected Types</Typography>
                  <Typography variant="body1">
                    {gameState.betTypes.join(', ')}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Amount Selection */}
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Amount
              </Typography>
              <Grid container spacing={1}>
                {amounts.map(amount => (
                  <Grid item key={amount}>
                    <Button
                      size="small"
                      variant={gameState.selectedAmount === amount ? "contained" : "outlined"}
                      onClick={() => setGameState(prev => ({ ...prev, selectedAmount: amount }))}
                    >
                      ₹{amount}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Quantity Selection */}
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Quantity
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton 
                  size="small"
                  onClick={() => setGameState(prev => ({ 
                    ...prev, 
                    quantity: Math.max(1, prev.quantity - 1)
                  }))}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <TextField
                  size="small"
                  value={gameState.quantity}
                  type="number"
                  InputProps={{ 
                    readOnly: true,
                    sx: { width: '60px', textAlign: 'center' }
                  }}
                />
                <IconButton 
                  size="small"
                  onClick={() => setGameState(prev => ({ 
                    ...prev, 
                    quantity: prev.quantity + 1
                  }))}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Multiplier Selection */}
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Multiplier
              </Typography>
              <Grid container spacing={1}>
                {multipliers.map(mult => (
                  <Grid item key={mult}>
                    <Button
                      size="small"
                      variant={gameState.multiplier === mult ? "contained" : "outlined"}
                      onClick={() => setGameState(prev => ({ ...prev, multiplier: mult }))}
                    >
                      x{mult}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Total Amount */}
            <Box mt={2} p={2} bgcolor="action.hover" borderRadius={2}>
              <Typography variant="subtitle2" color="textSecondary">Total Amount</Typography>
              <Typography variant="h5" color="primary">
                ₹{(gameState.selectedNumbers.length + gameState.betTypes.length) * 
                  gameState.selectedAmount * gameState.quantity * gameState.multiplier}
              </Typography>
            </Box>

            <FormControlLabel
              control={<Checkbox defaultChecked size="small" />}
              label={<Typography variant="caption">I agree to the Pre-Selling Rules</Typography>}
            />
          </DialogContent>

          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button 
              variant="outlined"
              onClick={() => setGameState(prev => ({ ...prev, isDialogOpen: false }))}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleBetSubmit}
              sx={{ flex: 1 }}
            >
              Confirm
            </Button>
          </DialogActions>
        </BetDialog>
      </Container>
    </GameContainer>
  );
};

  export default K3Game;
