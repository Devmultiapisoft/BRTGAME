import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton, Paper, Grid, Button } from '@mui/material';
import { AccountBalance, ArrowForwardIos, Chat, SelfImprovement } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: 24,
  height: 'calc(100vh - 100px)', // Adjust height to fit below the image
}));

export const CustomerServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  return (
    <AnimatedBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: 375,
        margin: '0 auto',
        p: 0,
        bgcolor: 'background.default',
        position: 'relative',
        height: '100vh',
      }}
    >
      {/* Background Image Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100px',
          backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s")', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ position: 'absolute', left: 16, top: 16 }}>
          <ArrowForwardIos sx={{ transform: 'rotate(180deg)', color: 'white' }} />
        </IconButton>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>
          Customer Service
        </Typography>
      </Box>

      {/* Main Content Section */}
      <GlowPaper>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {[
            { title: 'Live Chat', status: 'Online', icon: <Chat /> },
            { title: 'TC Self-service', icon: <SelfImprovement /> },
            { title: 'Withdrawal', icon: <AccountBalance /> }
          ].map((service, index) => (
            <Grid item xs={12} key={index}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={service.icon}
                  sx={{
                    height: 80,
                    borderRadius: 2,
                    justifyContent: 'flex-start',
                    px: 3
                  }}
                >
                  <Box textAlign="left">
                    <Typography fontWeight={600}>{service.title}</Typography>
                    {service.status && (
                      <Typography variant="caption" color="success.main">
                        {service.status}
                      </Typography>
                    )}
                  </Box>
                </Button>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </GlowPaper>
    </AnimatedBox>
  );
};