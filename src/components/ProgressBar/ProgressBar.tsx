import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgressContainer = styled(Box)({
  width: '100%',
  marginBottom: '8px',
});

const StyledProgress = styled(LinearProgress)({
  height: '8px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    borderRadius: '4px',
    background: 'linear-gradient(90deg, #00FF88 0%, #00CC6A 100%)',
  },
});

const ProgressText = styled(Typography)({
  fontSize: '0.75rem',
  color: '#B0B0B0',
  textAlign: 'center',
  marginTop: '4px',
});

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
    <ProgressContainer>
      <StyledProgress 
        id={progressBarId}
        variant="determinate" 
        value={progress} 
      />
      <ProgressText 
        id={progressTextId}
        variant="body2"
      >
        {current} / {total}
      </ProgressText>
    </ProgressContainer>
  );
};

export default ProgressBar; 