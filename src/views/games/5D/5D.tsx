import React, { useState, useEffect } from 'react';
import {
  Dialog as BetDialog,
  DialogActions,
  DialogContent,
  DialogTitle as DialogHeader,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Slide,
  Container,
  AppBar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { Add, Remove, VolumeUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { Theme as MUITheme } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';

// Add these styled components
// const BetDialog = styled(Box)(({ theme }: { theme: Theme }) => ({
//   '& .MuiDrawer-paper': {
//     width: '80%', // or specific width like '300px'
//     maxWidth: '400px',
//     height: '100%',
//     background: theme.palette.background.paper,
//     position: 'fixed',
//     left: 0,
//     top: 0,
//     bottom: 0,
//   },
// }));

const DialogHeader = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderBottom: `1px solid ${(theme as MUITheme).palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%', // Added to ensure full width
  maxWidth: '100%', // Added to prevent overflow
  boxSizing: 'border-box', // Added to include padding in width calculation
}));

const BetTimeButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  padding: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  '& button': {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'transparent',
    color: theme.palette.text.primary,
    '&.active': {
      background: `linear-gradient(135deg, #8f5206, #6d3f05)`,
      color: '#fae59f',
      border: 'none',
    }
  }
}));

// Add betTimes constant
const betTimes = [30, 60, 180, 300];

interface GameState {
  balance: number;
  selectedAmount: number;
  quantity: number;
  multiplier: number;
  selectedPosition: string | null;
  selectedNumber: number | null;
  isDialogOpen: boolean;
  agreeToTerms: boolean;
  timeLeft: number;
  selectedBetTime: number;
  // ... other properties
}

interface GameResult {
  period: string;
  numbers: { [key: string]: number };
  sum: number;
  time: string;
}

const NumberCircle = styled(Button)<{ selected?: boolean }>(({ theme, selected }) => ({
  width: '100%',
  aspectRatio: '1',
  padding: 0,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: selected ? '#fff' : (theme as MUITheme).palette.text.primary,
  border: selected ? '2px solid #fae59f' : '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',

  '&:hover': {
    borderColor: '#fae59f',
  },

  '& .number': {
    position: 'relative',
    zIndex: 2,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
}));

const PositionButton = styled(Button)<{ active?: boolean }>(({ active }) => ({
  minWidth: '60px',
  height: '60px',
  borderRadius: '12px',
  border: active ? '2px solid #fae59f' : '2px solid rgba(255, 255, 255, 0.3)',
  backgroundColor: active ? 'rgba(143, 82, 6, 0.8)' : 'rgba(255, 255, 255, 0.05)',
  color: active ? '#fff' : 'inherit',
  '&.disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  }
}));

// Add new styled components
const TimerSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  marginBottom: '16px',
}));

const TimerOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  borderRadius: '8px',
});

const CountdownTimer = styled(Typography)({
  fontSize: '48px',
  color: '#ff4444',
  fontWeight: 'bold',
});

const ResultBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  padding: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  marginBottom: '16px',
});

const NumberBox = styled(Box)({
  width: '50px',
  height: '60px',
  border: '2px solid #fae59f',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1a1a1a',
  '& .position': {
    fontSize: '12px',
    color: '#fae59f',
    marginBottom: '4px',
  },
  '& .number': {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
});

const PlaceBetButton = styled(Button)<{ countdown?: number }>(({ countdown }) => ({
  width: '100%',
  height: '48px',
  backgroundColor: '#8f5206',
  color: '#fae59f',
  '&:hover': {
    backgroundColor: '#6d3f05',
  },
  '&:disabled': {
    backgroundColor: '#4a2a03',
    color: 'rgba(250, 229, 159, 0.5)',
  },
  '&::after': countdown ? {
    content: `"${countdown}"`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    color: '#ff4444',
  } : undefined,
}));

const globalStyles = css`
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const Game5D: React.FC = () => {
  const navigate = useNavigate();
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  
  const amounts = [1, 10, 100, 1000];
  const multipliers = [1, 5, 10, 20, 50, 100];
  const betTimes = [30, 60, 180, 300];

  const [gameState, setGameState] = useState<GameState>({
    balance: 1000,
    currentPeriod: '202401010001',
    selectedAmount: 1,
    quantity: 1,
    multiplier: 1,
    isDialogOpen: false,
    timeLeft: 180,
    selectedBetTime: 30,
    selectedPosition: null,
    selectedNumber: null,
    selectedNumbers: { A: null, B: null, C: null, D: null, E: null, Sum: null },
    agreeToTerms: false,
  });

  const [buttonCountdown, setButtonCountdown] = useState<number | null>(null);

  const [gameHistory] = useState<GameResult[]>([
    {
      period: '202401010001',
      numbers: { A: 3, B: 5, C: 2, D: 4, E: 1 },
      sum: 15,
      time: '12:30',
    },
    // Add more sample history
  ]);

  const [resultNumbers, setResultNumbers] = useState({
    A: '0',
    B: '0',
    C: '0',
    D: '0',
    E: '0',
  });

  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft > 0 ? prev.timeLeft - 1 : prev.selectedBetTime;
        if (newTimeLeft <= 5) {
          setShowCountdown(true);
          setIsTimeUp(true);
        } else if (newTimeLeft === prev.selectedBetTime) {
          setShowCountdown(false);
          setIsTimeUp(false);
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isTimeUp && gameState.timeLeft <= 5) {
      setIsSpinning(true);
      
      // Simulate spinning effect
      const spinInterval = setInterval(() => {
        setResultNumbers(prev => ({
          A: Math.floor(Math.random() * 10).toString(),
          B: Math.floor(Math.random() * 10).toString(),
          C: Math.floor(Math.random() * 10).toString(),
          D: Math.floor(Math.random() * 10).toString(),
          E: Math.floor(Math.random() * 10).toString(),
        }));
      }, 100);

      // Stop spinning after 4 seconds and show final numbers
      setTimeout(() => {
        clearInterval(spinInterval);
        setIsSpinning(false);
        // Here you would normally set the actual result numbers from your backend
        setResultNumbers({
          A: Math.floor(Math.random() * 10).toString(),
          B: Math.floor(Math.random() * 10).toString(),
          C: Math.floor(Math.random() * 10).toString(),
          D: Math.floor(Math.random() * 10).toString(),
          E: Math.floor(Math.random() * 10).toString(),
        });
      }, 4000);

      return () => clearInterval(spinInterval);
    }
  }, [isTimeUp, gameState.timeLeft]);

  const handlePositionSelect = (position: 'A' | 'B' | 'C' | 'D' | 'E' | 'Sum') => {
    if (isTimeUp) return;
    
    if (position === 'Sum') {
      // Calculate sum of selected numbers, using 0 for unselected positions
      const sum = ['A', 'B', 'C', 'D', 'E'].reduce((acc, pos) => {
        return acc + (gameState.selectedNumbers[pos] ?? 0);
      }, 0);

      setGameState(prev => ({
        ...prev,
        selectedPosition: 'Sum',
        selectedNumber: sum,
        selectedNumbers: {
          ...prev.selectedNumbers,
          Sum: sum
        }
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      selectedPosition: position,
      selectedNumber: null,
    }));
  };

  const handleNumberSelect = (number: number) => {
    if (isTimeUp || !gameState.selectedPosition) return;
    setGameState(prev => ({
      ...prev,
      selectedNumber: number,
      selectedNumbers: {
        ...prev.selectedNumbers,
        [prev.selectedPosition as string]: number
      }
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlaceBet = () => {
    if (!gameState.selectedPosition || gameState.selectedNumber === null) return;

    const totalAmount = gameState.selectedAmount * gameState.quantity * gameState.multiplier;
    if (totalAmount > gameState.balance) return;

    setGameState(prev => ({
      ...prev,
      balance: prev.balance - totalAmount,
      isDialogOpen: false,
      selectedPosition: null,
      selectedNumber: null,
      agreeToTerms: false, // Reset agree to terms
    }));
  };

  const handleBetTimeSelect = (time: number) => {
    setGameState(prev => ({
      ...prev,
      selectedBetTime: time,
      timeLeft: time
    }));
  };

  const updateAmount = (change: number) => {
    setGameState(prev => ({
      ...prev,
      selectedAmount: Math.max(1, prev.selectedAmount + change)
    }));
  };

  const updateQuantity = (change: number) => {
    setGameState(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change)
    }));
  };

  useEffect(() => {
    if (isTimeUp && gameState.timeLeft <= 5) {
      setButtonCountdown(gameState.timeLeft);
    } else {
      setButtonCountdown(null);
    }
  }, [isTimeUp, gameState.timeLeft]);

  return (
    <>
      <Global styles={globalStyles} />
      <Container maxWidth="sm">
        <AppBar position="static" color="transparent">
          <Box display="flex" justifyContent="space-between" p={2}>
            <IconButton color="inherit" onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">5D Game</Typography>
            <IconButton color="inherit">
              <VolumeUp />
            </IconButton>
          </Box>
        </AppBar>

        {/* Timer Section with Bet Time Selection */}
        <TimerSection>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Timer Display */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Period: {gameState.currentPeriod}</Typography>
              <Typography variant="h4" color="primary">
                {formatTime(gameState.timeLeft)}
              </Typography>
            </Box>

            {/* Bet Time Selection */}
            <BetTimeButtons>
              {betTimes.map(time => (
                <Button
                  key={time}
                  className={gameState.selectedBetTime === time ? 'active' : ''}
                  onClick={() => handleBetTimeSelect(time)}
                  disabled={isTimeUp}
                >
                  {time === 30 ? '30s' : time === 60 ? '1m' : time === 180 ? '3m' : '5m'}
                </Button>
              ))}
            </BetTimeButtons>
          </Box>

          {/* Countdown Overlay */}
          {showCountdown && (
            <TimerOverlay>
              <CountdownTimer>
                {gameState.timeLeft}s
              </CountdownTimer>
            </TimerOverlay>
          )}
        </TimerSection>

        {/* Result Display Section */}
        <ResultBox>
          {Object.entries(resultNumbers).map(([position, number]) => (
            <NumberBox key={position} sx={{ animation: isSpinning ? 'pulse 0.5s infinite' : 'none' }}>
              <span className="position">{position}</span>
              <span className="number">{number}</span>
            </NumberBox>
          ))}
        </ResultBox>

        {/* Position Selection */}
        <Box mb={3}>
          <Grid container spacing={2}>
            {['A', 'B', 'C', 'D', 'E', 'Sum'].map((position) => (
              <Grid item xs={2} key={position} sx={{ maxWidth: '16.66%' }}>
                <PositionButton
                  active={gameState.selectedPosition === position}
                  onClick={() => handlePositionSelect(position as 'A' | 'B' | 'C' | 'D' | 'E' | 'Sum')}
                  disabled={isTimeUp}
                  className={isTimeUp ? 'disabled' : ''}
                >
                  {position}
                  <Typography variant="caption" display="block">
                    {position === 'Sum' 
                      ? (Object.entries(gameState.selectedNumbers)
                          .filter(([key]) => key !== 'Sum')
                          .reduce((acc, [_, value]) => acc + (value ?? 0), 0))
                      : (gameState.selectedNumbers[position] ?? '-')}
                  </Typography>
                </PositionButton>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Number Grid */}
        <Box mt={3}>
          <Grid container spacing={2}>
            {Array.from({ length: 10 }, (_, i) => i).map((number) => (
              <Grid item xs={2.4} key={number}>
                <NumberCircle
                  disabled={isTimeUp || !gameState.selectedPosition || gameState.selectedPosition === 'Sum'}
                  selected={gameState.selectedPosition === 'Sum' ? 
                    gameState.selectedNumbers.Sum === number : 
                    gameState.selectedNumber === number}
                  onClick={() => handleNumberSelect(number)}
                  sx={{
                    opacity: isTimeUp || !gameState.selectedPosition || gameState.selectedPosition === 'Sum' ? 0.5 : 1,
                    pointerEvents: isTimeUp || !gameState.selectedPosition || gameState.selectedPosition === 'Sum' ? 'none' : 'auto',
                    cursor: gameState.selectedPosition === 'Sum' ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span className="number">{number}</span>
                </NumberCircle>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Place Bet Button */}
        <Box mt={3}>
          <PlaceBetButton
            variant="contained"
            disabled={isTimeUp || !gameState.selectedPosition || gameState.selectedNumber === null}
            onClick={() => setGameState(prev => ({ ...prev, isDialogOpen: true }))}
            countdown={buttonCountdown}
          >
            {buttonCountdown ? '' : 'Place Bet'}
          </PlaceBetButton>
        </Box>

        {/* Results Table */}
        <Box mt={3} sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Numbers</TableCell>
                <TableCell>Sum</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.period}</TableCell>
                  <TableCell>
                    {Object.entries(record.numbers).map(([key, value]) => `${key}:${value}`).join(' ')}
                  </TableCell>
                  <TableCell>{record.sum}</TableCell>
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
          TransitionProps={{ direction: "left" }}
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
              {gameState.selectedPosition && gameState.selectedNumber !== null && (
                <Box mb={1}>
                  <Typography variant="subtitle2" color="textSecondary">Selected Position & Number</Typography>
                  <Typography variant="body1">
                    Position {gameState.selectedPosition}: {gameState.selectedNumber}
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
                {[10, 20, 50, 100, 200, 500].map(amount => (
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
                  onClick={() => updateQuantity(-1)}
                  disabled={gameState.quantity <= 1}
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
                  onClick={() => updateQuantity(1)}
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
                {[1, 2, 5, 10, 20, 50].map(mult => (
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
                ₹{gameState.selectedAmount * gameState.quantity * gameState.multiplier}
              </Typography>
            </Box>

            <FormControlLabel
              control={
                <Checkbox 
                  checked={gameState.agreeToTerms}
                  onChange={(e) => setGameState(prev => ({
                    ...prev,
                    agreeToTerms: e.target.checked
                  }))}
                  size="small"
                />
              }
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
              onClick={handlePlaceBet}
              disabled={!gameState.agreeToTerms}
              sx={{ flex: 1 }}
            >
              Confirm
            </Button>
          </DialogActions>
        </BetDialog>
      </Container>
    </>
  );
};

export default Game5D;
