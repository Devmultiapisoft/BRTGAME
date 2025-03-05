import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../../theme';

const TrxGames = () => {
  const navigate = useNavigate();

  const gameOptions = [
    {
      title: 'TRX 1 Minute',
      description: 'Fast-paced 1-minute game',
      path: '/games/trx/1min',
      color: '#FF6B6B'
    },
    {
      title: 'TRX 3 Minutes',
      description: 'Medium-paced 3-minute game',
      path: '/games/trx/3min',
      color: '#4ECDC4'
    },
    {
      title: 'TRX 5 Minutes',
      description: 'Longer 5-minute game',
      path: '/games/trx/5min',
      color: '#45B7D1'
    }
  ];

  return (
    <Box sx={{
      bgcolor: themeColors.green.background,
      minHeight: '100vh',
      p: 2,
      color: themeColors.green.text,
      fontFamily: 'Arial, sans-serif'
    }}>
      <Typography variant="h4" sx={{ 
        fontWeight: 'bold', 
        textAlign: 'center', 
        mb: 4,
        color: themeColors.green.text 
      }}>
        TRX Games
      </Typography>

      <Grid container spacing={3}>
        {gameOptions.map((game, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: game.color,
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
              onClick={() => navigate(game.path)}
            >
              <Typography variant="h5" sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                color: '#FFF'
              }}>
                {game.title}
              </Typography>
              <Typography variant="body1" sx={{ 
                textAlign: 'center',
                color: '#FFF',
                mb: 2
              }}>
                {game.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#FFF',
                  color: game.color,
                  '&:hover': {
                    bgcolor: '#F0F0F0',
                  }
                }}
              >
                Play Now
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrxGames; 