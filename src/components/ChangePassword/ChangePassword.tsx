import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  height: 'calc(100vh - 100px)', // Adjust height to fit below the image
}));

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add password change logic here
    navigate(-1);
  };

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
          Change Password
        </Typography>
      </Box>

      {/* Main Content Section */}
      <GlowPaper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Old Password"
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
          >
            Change Password
          </Button>
        </form>
      </GlowPaper>
    </AnimatedBox>
  );
};

export { ChangePasswordPage };