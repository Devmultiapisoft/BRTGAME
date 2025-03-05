import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../../theme';

// Styled Components
const GameHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  position: 'relative',
  justifyContent: 'space-between',
}));

const GameTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  padding: '10px',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  '& .tab-item': {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    '&.active': {
      border: `2px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}`,
      background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].sectionBg,
    },
    '& img': {
      width: '30px',
      height: '30px',
    },
    '& span': {
      fontSize: '12px',
      marginTop: '2px',
    },
  },
}));

const TimerSection = styled(Box)(({ theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  padding: '0',
  margin: '10px',
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  position: 'relative',
  borderRadius: '10px',
  overflow: 'hidden',
  '& .timer-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].gradient,
    '& .left-section': {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      '& .game-name': {
        fontSize: '14px',
        fontWeight: 'bold',
      },
      '& .period-number': {
        fontSize: '16px',
      },
    },
    '& .right-section': {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  '& .progress-bar': {
    width: '100%',
    height: '4px',
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].sectionBg,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0',
      height: '100%',
      width: '50%',
      background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
    },
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  padding: '10px',
  flex: 1,
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  '&.green': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    '&:hover': { background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].hoverBg },
  },
  '&.violet': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary,
    '&:hover': { background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].hoverBg },
  },
  '&.red': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].accent,
    '&:hover': { background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].hoverBg },
  },
}));

const NumberGrid = styled(Grid)(({ theme }) => ({
  padding: '10px',
  '& .number-cell': {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
    margin: '5px',
    cursor: 'pointer',
    position: 'relative',
    '& .count': {
      position: 'absolute',
      bottom: '-15px',
      fontSize: '12px',
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
    },
  },
}));

const SizeButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  '&:hover': {
    background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].hoverBg,
  },
  '& .multiplier': {
    marginLeft: '5px',
    fontSize: '12px',
    opacity: 0.9,
  },
}));

const HistoryTabs = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderBottom: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  '& button': {
    flex: 1,
    padding: '10px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
    '&.active': {
      color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
      borderBottom: `2px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}`,
    },
  },
}));

const WinGo: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 21 });
  const [currentPeriod, setCurrentPeriod] = useState('2503042559');
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [historyTab, setHistoryTab] = useState('game');
  const [gameHistory, setGameHistory] = useState([
    { period: '2503042558', number: '1', size: 'Small', color: 'Green' },
    { period: '2503042557', number: '5', size: 'Big', color: 'Green & Violet' },
    { period: '2503042556', number: '8', size: 'Big', color: 'Red' },
    { period: '2503042555', number: '5', size: 'Big', color: 'Green & Violet' },
    { period: '2503042554', number: '5', size: 'Big', color: 'Green & Violet' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          return { minutes: prev.minutes === 0 ? 0 : prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
  };

  return (
    <Box sx={{ 
      bgcolor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
      minHeight: '100vh',
      backdropFilter: 'blur(20px)'
    }}>
      <GameHeader>
        <IconButton sx={{ color: '#fff' }} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Win Go</Typography>
        <Button sx={{ color: '#fff' }}>Rules</Button>
      </GameHeader>

      <GameTabs>
       
       <Box className="tab-item active" onClick={() => navigate('/wingo/1min')}>  
         <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="Win Go 1Min" />
         <span>1Min</span>
       </Box>
       <Box className="tab-item" onClick={() => navigate('/wingo/3min')}>  
         <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="Win Go 5Min" />
         <span>3Min</span>
       </Box>
       <Box className="tab-item " onClick={() => navigate('/wingo/5min')}>  
         <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="Win Go 30s" />
         <span>5Min</span>
       </Box>
       <Box className="tab-item" onClick={() => navigate('/wingo/10min')}>  
         <img src="https://in.piccdn123.com/static/_template_/orange/img/game/time_cur.png" alt="Win Go 10Min" />
         <span>10Min</span>
       </Box>
     </GameTabs>

      <TimerSection>
        <Box className="timer-content">
          <Box className="left-section">
            <Typography className="game-name">Win Go 30s</Typography>
            <Typography className="period-number">{currentPeriod}</Typography>
          </Box>
          <Box className="right-section">
            <Typography>
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </Typography>
          </Box>
        </Box>
        <Box className="progress-bar" />
      </TimerSection>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <ColorButton className="green">
              Green 2
            </ColorButton>
          </Grid>
          <Grid item xs={4}>
            <ColorButton className="violet">
              Violet 4.5
            </ColorButton>
          </Grid>
          <Grid item xs={4}>
            <ColorButton className="red">
              Red 2
            </ColorButton>
          </Grid>
        </Grid>

        <NumberGrid container justifyContent="center">
          {Array.from({ length: 10 }, (_, i) => (
            <Box
              key={i}
              className="number-cell"
              onClick={() => handleNumberClick(i)}
              sx={{
                border: selectedNumber === i ? '2px solid #FF6B00' : '2px solid #ddd',
              }}
            >
              {i}
              <span className="count">0</span>
            </Box>
          ))}
        </NumberGrid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <SizeButton>
              Big
              <span className="multiplier">2</span>
            </SizeButton>
          </Grid>
          <Grid item xs={6}>
            <SizeButton>
              Small
              <span className="multiplier">2</span>
            </SizeButton>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2, bgcolor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background }}>
        <HistoryTabs>
          <button
            className={historyTab === 'game' ? 'active' : ''}
            onClick={() => setHistoryTab('game')}
          >
            Game History
          </button>
          <button
            className={historyTab === 'chart' ? 'active' : ''}
            onClick={() => setHistoryTab('chart')}
          >
            Chart
          </button>
          <button
            className={historyTab === 'my' ? 'active' : ''}
            onClick={() => setHistoryTab('my')}
          >
            My History
          </button>
        </HistoryTabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>B/S</TableCell>
                <TableCell>Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.period}</TableCell>
                  <TableCell>{record.number}</TableCell>
                  <TableCell>{record.size}</TableCell>
                  <TableCell>{record.color}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default WinGo; 