import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton, Paper } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: theme.spacing(3),
  height: 'calc(100vh - 100px)', // Adjust height to fit below the image
}));

export const AgreementPage = ({ type }: { type: number }) => {
  const navigate = useNavigate();
  const agreements = [
    `Confidentiality Agreement Content...`,
    `Risk Disclosure Agreement Content...`
  ];

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
          {type === 0 ? 'Confidentiality' : 'Risk Disclosure'}
        </Typography>
      </Box>

      {/* Main Content Section */}
      <GlowPaper sx={{ p: 2, maxHeight: 500, overflow: 'auto' }}>
        <Typography variant="body2" whiteSpace="pre-wrap">
          {agreements[type]}
        </Typography>
      </GlowPaper>
    </AnimatedBox>
  );
};