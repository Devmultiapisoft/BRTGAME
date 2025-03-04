import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
  total: number;
  progressBarId: string;
  progressTextId: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, progressBarId, progressTextId }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 1000);

    return () => clearInterval(interval);
  }, [total]);

  const progress = (current / total) * 100;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <LinearProgress 
        id={progressBarId}
        variant="determinate" 
        value={progress} 
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography 
        id={progressTextId}
        variant="body2" 
        color="text.secondary" 
        align="center"
        sx={{ mt: 1 }}
      >
        {current} / {total}
      </Typography>
    </Box>
  );
};

export default ProgressBar; 