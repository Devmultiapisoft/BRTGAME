import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <Box sx={{
      width: '80%',
      borderRadius: '10px',
      maxWidth: '340px',
      zIndex: 2006,
      backgroundColor: '#fff',
      padding: 2,
      boxShadow: 3,
    }}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>Rule</Typography>
      <Typography variant="body1" sx={{ marginY: 2 }}>{message}</Typography>
      <Button variant="contained" color="error" onClick={onClose}>I know</Button>
    </Box>
  );
};

export default Alert; 