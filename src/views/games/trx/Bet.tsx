import React from 'react';
import { Box, Button } from '@mui/material';

interface BetProps {
  onSelect: (amount: number) => void;
}

const Bet: React.FC<BetProps> = ({ onSelect }) => {
  return (
    <Box className="con-box">
      <Box className="color-box c-row c-row-between">
        <Button variant="contained" className="btn green" onClick={() => onSelect(1)}>Green</Button>
        <Button variant="contained" className="btn violet" onClick={() => onSelect(2)}>Violet</Button>
        <Button variant="contained" className="btn red" onClick={() => onSelect(3)}>Red</Button>
      </Box>
      <Box className="number-box action m-t-10 c-row c-row-between c-flex-warp">
        {[...Array(10).keys()].map(num => (
          <Button key={num} variant="contained" className="item" onClick={() => onSelect(num)}>
            {num}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Bet; 