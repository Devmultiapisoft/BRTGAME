import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Grid, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../../theme';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import icon0 from '../../../assets/icon1.jpg';
import icon1 from '../../../assets/icon11.jpg';
import icon2 from '../../../assets/icon2.jpg';
import icon3 from '../../../assets/icon3.jpg';
import icon4 from '../../../assets/icon4.jpg';
import icon5 from '../../../assets/icon5.jpg';
import icon6 from '../../../assets/icon6.jpg';
import icon7 from '../../../assets/icon7.jpg';
import icon8 from '../../../assets/icon8.jpg';
import icon9 from '../../../assets/icon9.jpg';

const icons = [
  icon0, // icon1 for number 0
  icon1, // icon2 for number 1
  icon2, // icon3 for number 2
  icon3, // icon4 for number 3
  icon4, // icon5 for number 4
  icon5, // icon6 for number 5
  icon6, // icon7 for number 6
  icon7,
  icon8, // icon8 for number 7
  icon9  // icon9 for number 8
];

const Trx10Min = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 59 });
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [betHistory, setBetHistory] = useState<{ numbers: number[], result: string }[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'Big' | 'Small'>('Big');
  const [showChart, setShowChart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedBet, setSelectedBet] = useState<{ numbers: number[], result: string } | null>(null);
  const [isLastTenSeconds, setIsLastTenSeconds] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          // Handle timer end
          // alert('Time is up!');
          setIsLastTenSeconds(false);
          return { minutes: 9, seconds: 59 }; // Reset to 59 seconds
        }
        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.minutes === 0 && prev.seconds <= 10) {
          setIsLastTenSeconds(true);
          playBeepSound();
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const playBeepSound = () => {
    const beep = new Audio('./beep.mp3'); // Ensure you have a beep.mp3 file in the public directory
    beep.play();
  };

  // Game history data
  const gameHistory = [
    { period: '2503051024', blook: '70173922("*a93b8")', chart: 'Big', ds: '8', result: '' },
    { period: '2503051023', blook: '70173902("*b4edf")', chart: 'Small', ds: '4', result: '' },
    { period: '2503051022', blook: '70173882("*4aa38")', chart: 'Big', ds: '8', result: '' },
    { period: '2503051021', blook: '70173862("*3dc5")', chart: 'Big', ds: '5', result: '' },
    { period: '2503051020', blook: '70173842("*9ddc1")', chart: 'Small', ds: '1', result: '' },
  ];

  const handleNumberClick = (num: number) => {
    if (!selectedNumbers.includes(num)) {
      setSelectedNumbers(prev => [...prev, num]);
    }
    setOpenPopup(true);
    setSelectedNumber(num);
  };

  const handleBet = () => {
    const result = Math.random() > 0.5 ? 'Win' : 'Loss';
    setBetHistory(prev => [...prev, { numbers: selectedNumbers, result }]);
    setOpenPopup(false);
    setSelectedNumbers([]); // Reset selected numbers
    setBetAmount(1); // Reset bet amount
  };

  // Function to handle row click in betting history
  const handleBetRowClick = (bet: { numbers: number[], result: string }) => {
    setSelectedBet(bet);
  };

  interface GameHistoryRow {
    period: string;
    block: string;
    type: string;
    result: number;
  }

  const handleRowClick = (row: GameHistoryRow) => {
    alert(`Selected: ${JSON.stringify(row)}`);
  };

  const GameHistory = () => {
    const dummyData = [
      { period: '2503051163', block: '70176700(**44104)', type: 'Small', result: 4 },
      { period: '2503051162', block: '7017680(**2748)', type: 'Big', result: 8 },
      { period: '2503051161', block: '7017660(**aad67)', type: 'Big', result: 7 },
      { period: '2503051160', block: '70176640(**cdee1)', type: 'Small', result: 1 },
      { period: '2503051159', block: '70176620(**68991)', type: 'Small', result: 1 },
      { period: '2503051158', block: '70176600(**3410c)', type: 'Small', result: 0 },
      { period: '2503051157', block: '70176580(**11aec)', type: 'Small', result: 1 },
      { period: '2503051156', block: '70176560(**bdd01)', type: 'Small', result: 1 },
      { period: '2503051155', block: '70176540(**30705)', type: 'Big', result: 5 },
      { period: '2503051154', block: '70176520(**519c2)', type: 'Small', result: 2 },
    ];

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#FFF' }}>Game History</Typography>
        <TableContainer component={Paper} sx={{ mt: 2, bgcolor: '#2E2E2E', borderRadius: '8px' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Period</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Block</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>B/S</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((row: GameHistoryRow, index) => (
                <TableRow key={index} onClick={() => handleRowClick(row)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#FFD700', color: '#000' } }}>
                  <TableCell sx={{ color: '#FFF' }}>{row.period}</TableCell>
                  <TableCell sx={{ color: '#FFF' }}>{row.block}</TableCell>
                  <TableCell sx={{ color: '#FFF' }}>{row.type}</TableCell>
                  <TableCell sx={{ color: '#FFF' }}>{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Box sx={{
      bgcolor: themeColors.green.background,
      minHeight: '100vh',
      p: 2,
      color: themeColors.green.text,
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton sx={{ color: themeColors.green.text }} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ ml: 1, fontWeight: 'bold' }}>TTC</Typography>
      </Box>

      {/* Title and Timer Display */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, bgcolor: themeColors.green.primary, p: 2, borderRadius: '8px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: themeColors.green.text }}>Tcc Win Go 1Min</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: themeColors.green.text }}>
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </Typography>
      </Box>

      {/* Game Tabs */}
      <Box sx={{ 
        display: 'flex', 
        gap: '10px', 
        padding: '10px', 
        mb: 3,
        bgcolor: themeColors.green.background,
        borderRadius: '8px',
        overflowX: 'auto'
      }}>
        <Box 
          className="tab-item " 
          onClick={() => navigate('/trx/1min')}
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            border: `2px solid ${themeColors.green.primary}`,
            background: themeColors.green.sectionBg,
            '& img': {
              width: '30px',
              height: '30px',
            },
            '& span': {
              fontSize: '12px',
              marginTop: '2px',
              color: themeColors.green.text
            }
          }}
        >  
          <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="TRX 1Min" />
          <span>1Min</span>
        </Box>
        <Box 
          className="tab-item" 
          onClick={() => navigate('/trx/3min')}
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            border: `1px solid ${themeColors.green.border}`,
            '& img': {
              width: '30px',
              height: '30px',
            },
            '& span': {
              fontSize: '12px',
              marginTop: '2px',
              color: themeColors.green.text
            }
          }}
        >  
          <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="TRX 3Min" />
          <span>3Min</span>
        </Box>
        <Box 
          className="tab-item" 
          onClick={() => navigate('/trx/5min')}
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            border: `1px solid ${themeColors.green.border}`,
            '& img': {
              width: '30px',
              height: '30px',
            },
            '& span': {
              fontSize: '12px',
              marginTop: '2px',
              color: themeColors.green.text
            }
          }}
        >  
          <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="TRX 5Min" />
          <span>5Min</span>
        </Box>
        <Box 
          className="tab-item active" 
          onClick={() => navigate('/trx/10min')}
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            border: `1px solid ${themeColors.green.border}`,
            '& img': {
              width: '30px',
              height: '30px',
            },
            '& span': {
              fontSize: '12px',
              marginTop: '2px',
              color: themeColors.green.text
            }
          }}
        >  
          <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="TRX 5Min" />
          <span>10Min</span>
        </Box>
      </Box>

      {/* Last 10 Seconds Display */}
      {isLastTenSeconds && (
        <Dialog open={isLastTenSeconds} sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            backdropFilter: 'blur(5px)',
          },
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #00b4d8, #00FF88)',
            p: 4,
            borderRadius: '8px',
            animation: 'flash 1s infinite alternate',
          }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#FFF' }}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </Typography>
          </Box>
        </Dialog>
      )}

      {/* Game ID Display */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: themeColors.green.primary, textAlign: 'center', mb: 3 }}>2503051069</Typography>

      {/* Color Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Paper sx={{ bgcolor: themeColors.green.primary, p: 1.5, textAlign: 'center', borderRadius: '8px' }}>
            <Typography variant="h6">Green</Typography>
            <Typography variant="h5">2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ bgcolor: themeColors.green.secondary, p: 1.5, textAlign: 'center', borderRadius: '8px' }}>
            <Typography variant="h6">Violet</Typography>
            <Typography variant="h5">4.6</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ bgcolor: themeColors.green.primary, p: 1.5, textAlign: 'center', borderRadius: '8px' }}>
            <Typography variant="h6">Red</Typography>
            <Typography variant="h5">2</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Number Grid */}
      <Grid container spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
        {/* First Row */}
        <Grid container item xs={12} justifyContent="center">
          {[0, 1, 2, 3, 4].map((num) => (
            <Grid item xs={2} key={num}> 
              <Paper sx={{
                width: '60px',
                height: '60px',
                backgroundImage: `url(${icons[num]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                boxShadow: selectedNumbers.includes(num) ? '0 12px 24px rgba(0, 0, 0, 0.5)' : '0 6px 12px rgba(0, 0, 0, 0.3)',
                border: selectedNumbers.includes(num) ? '4px solid rgba(255, 255, 255, 0.8)' : 'none',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                },
                animation: selectedNumbers.includes(num) ? 'bounce 0.5s infinite alternate' : 'none',
                '@keyframes bounce': {
                  '0%': { transform: 'translateY(0)' },
                  '100%': { transform: 'translateY(-5px)' }
                }
              }} onClick={() => handleNumberClick(num)}>
                <Typography variant="h6" sx={{ color: themeColors.green.text, fontWeight: 'bold' }}></Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Second Row */}
        <Grid container item xs={12} justifyContent="center">
          {[5, 6, 7, 8, 9].map((num) => (
            <Grid item xs={2} key={num}> 
              <Paper sx={{
                width: '60px',
                height: '60px',
                backgroundImage: `url(${icons[num]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                boxShadow: selectedNumbers.includes(num) ? '0 12px 24px rgba(0, 0, 0, 0.5)' : '0 6px 12px rgba(0, 0, 0, 0.3)',
                border: selectedNumbers.includes(num) ? '4px solid rgba(255, 255, 255, 0.8)' : 'none',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                },
                animation: selectedNumbers.includes(num) ? 'bounce 0.5s infinite alternate' : 'none',
                '@keyframes bounce': {
                  '0%': { transform: 'translateY(0)' },
                  '100%': { transform: 'translateY(-5px)' }
                }
              }} onClick={() => handleNumberClick(num)}>
                <Typography variant="h6" sx={{ color: themeColors.green.text, fontWeight: 'bold' }}></Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Big/Small Option Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button variant="contained" sx={{ bgcolor: '#444', color: '#FFF', flex: 1, mr: 1 }} onClick={() => setSelectedType('Big')}>Big</Button>
        <Button variant="contained" sx={{ bgcolor: '#666', color: '#FFF', flex: 1, ml: 1 }} onClick={() => setSelectedType('Small')}>Small</Button>
      </Box>

      {/* Game History Section */}
      <GameHistory />

      {/* Chart Data Section */}
      {showChart && <Box sx={{ mb: 3, animation: 'fadeIn 0.5s' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#FFF' }}>Chart Data</Typography>
        {/* Chart data visualization goes here */}
      </Box>}

      {/* Betting History Section */}
      {showHistory && <Box sx={{ mb: 3, animation: 'fadeIn 0.5s' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#FFF' }}>Betting History</Typography>
        <TableContainer component={Paper} sx={{ mt: 2, bgcolor: '#2E2E2E', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
          <Table size="small">
            <TableBody>
              {betHistory.map((bet, index) => (
                <TableRow key={index} sx={{
                  bgcolor: bet.result === 'Win' ? '#c8e6c9' : '#ffcdd2',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#FFD700', color: '#000' },
                }} onClick={() => handleBetRowClick(bet)}>
                  <TableCell sx={{ color: themeColors.green.text }}>Numbers: {bet.numbers.join(', ')}</TableCell>
                  <TableCell sx={{ color: themeColors.green.text }}>{bet.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>}

      {/* Display selected bet details */}
      {selectedBet && <Box sx={{ mt: 3, animation: 'fadeIn 0.5s' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#FFF' }}>Selected Bet Details</Typography>
        <Typography variant="body1" sx={{ color: '#FFF' }}>Numbers: {selectedBet.numbers.join(', ')}</Typography>
        <Typography variant="body1" sx={{ color: '#FFF' }}>Result: {selectedBet.result}</Typography>
      </Box>}

      {/* Balance Section */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2
      }}>
        <Typography variant="h6">Balance: 0.00</Typography>
        <Box>
          <Button variant="contained" sx={{
            mr: 1,
            bgcolor: themeColors.green.primary,
            '&:hover': { bgcolor: themeColors.green.secondary }
          }} onClick={handleBet}>
            Decode
          </Button>
          <Button variant="contained" sx={{
            bgcolor: themeColors.green.secondary,
            '&:hover': { bgcolor: themeColors.green.primary }
          }}>
            Bet History
          </Button>
        </Box>
      </Box>

      {/* Bet History Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Bet History</Typography>
        {betHistory.length === 0 ? (
          <Typography variant="body1">No bets placed yet.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableBody>
                {betHistory.map((bet, index) => (
                  <TableRow key={index} sx={{
                    bgcolor: bet.result === 'Win' ? '#c8e6c9' : '#ffcdd2'
                  }}>
                    <TableCell sx={{ color: themeColors.green.text }}>Numbers: {bet.numbers.join(', ')}</TableCell>
                    <TableCell sx={{ color: themeColors.green.text }}>{bet.result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Betting Popup */}
      <Dialog 
        open={openPopup} 
        onClose={() => setOpenPopup(false)} 
        sx={{ 
          '& .MuiDialog-paper': { 
            position: 'fixed', 
            bottom: 0, 
            margin: 0, 
            borderRadius: '16px 16px 0 0',
            width: '90%', // Full width
          } 
        }}
      >
        <DialogTitle>Place Your Bet</DialogTitle>
        <DialogContent>
          <Typography variant="body1">You selected numbers: {selectedNumbers.join(', ')}</Typography>
          <Typography variant="body1">Balance: 0.00</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Bet Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
          />
          <Typography variant="body1">Quantity:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={() => setBetAmount(betAmount - 1)}>-</Button>
            <TextField
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              sx={{ width: '60px', textAlign: 'center' }}
            />
            <Button onClick={() => setBetAmount(betAmount + 1)}>+</Button>
          </Box>
          <Typography variant="body1">Total amount: ₹{betAmount}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button onClick={handleBet}>Confirm Bet</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Trx10Min;


