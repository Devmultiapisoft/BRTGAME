import React from 'react';
import { Box, Button } from '@mui/material';

interface ListOrderProps {
  onSelect: (number: number) => void;
}

const ListOrder: React.FC<ListOrderProps> = ({ onSelect }) => {
  return (
    <Box className="box">
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

export default ListOrder; 