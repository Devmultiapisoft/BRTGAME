import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface InfoProps {
  balance: number;
  onRecharge: () => void;
  onWithdraw: () => void;
}

const Info: React.FC<InfoProps> = ({ balance, onRecharge, onWithdraw }) => {
  return (
    <Box className="game-head">
      <Box className="total-box">
        <Box className="c-row c-row-between c-row-middle info">
          <Box className="c-row c-row-middle">
            <Box className="m-r-10">
              <img src="/images/icon_wallet.webp" alt="Wallet Icon" style={{ width: '60px', height: '60px' }} />
            </Box>
            <Box>
              <Typography variant="h6" className="total m-b-5">Total</Typography>
              <Typography variant="body2" className="wallet">Balance</Typography>
            </Box>
          </Box>
          <Box className="c-row c-row-middle">
            <Typography variant="h6" className="num">₹ {balance.toFixed(2)}</Typography>
            <Button onClick={onRecharge} className="reload_money" style={{ marginLeft: '10px' }}>
              <img src="/images/tải%20xuống%20(1).png" alt="Reload Icon" style={{ width: '15px', height: '15px' }} />
            </Button>
          </Box>
        </Box>
        <Box className="total-btn c-row c-row-between">
          <Button variant="contained" onClick={onRecharge} className="item">Recharge</Button>
          <Button variant="outlined" onClick={onWithdraw} className="item">Withdraw</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Info; 