import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface JoinProps {
  onJoin: () => void;
}

const Join: React.FC<JoinProps> = ({ onJoin }) => {
  return (
    <Box className="popup-join van-popup van-popup--round van-popup--bottom" sx={{ transform: 'translateY(400px)', maxWidth: '10rem', left: 'auto', zIndex: 2032 }}>
      <Box className="betting-mark colorred">
        <Box className="head">
          <Box className="box">
            <Typography variant="h6" className="con">1 Minute</Typography>
            <Typography variant="body2" className="color" sx={{ color: 'rgb(109, 167, 244)' }}>Choose <span className="p-l-10">Red</span></Typography>
          </Box>
        </Box>
        <Box className="info">
          <Box className="item c-row c-row-between">
            <Typography className="tit">Amount</Typography>
            <Box className="c-row amount-box">
              {[1, 10, 100, 1000].map(amount => (
                <Button key={amount} variant="contained" onClick={() => onJoin()} className="li">{amount}</Button>
              ))}
            </Box>
          </Box>
          <Box className="item c-row c-row-between">
            <Typography className="tit">Quantity</Typography>
            <Box className="c-row c-row-between stepper-box">
              <Button className="li minus">-</Button>
              <input type="number" className="digit-box" defaultValue={1} />
              <Button className="li plus">+</Button>
            </Box>
          </Box>
          <Box className="item c-row c-row-middle">
            <Button variant="contained" onClick={onJoin} className="item yellow">Join</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Join; 