import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '90%',
    maxWidth: '400px',
    margin: '16px',
    animation: 'slideIn 0.3s ease-out',
    '@keyframes slideIn': {
      '0%': {
        transform: 'translateY(-100px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
});

const AnimatedButton = styled(Button)({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.6s ease, height 0.6s ease',
  },
  '&:hover::before': {
    width: '300%',
    height: '300%',
  },
});

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
}

const Popup: React.FC<PopupProps> = ({ 
  isOpen, 
  onClose, 
  title = "Welcome!", 
  content = "This is a popup message." 
}) => {
  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
          background: 'linear-gradient(135deg, #132F4C 0%, #0A1929 100%)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography
          variant="h6"
          sx={{
            background: 'linear-gradient(45deg, #6C63FF 30%, #FF6584 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'grey.500',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: '#FF6584',
              transform: 'rotate(90deg)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography 
          variant="body2" 
          paragraph
          sx={{ 
            color: '#B2BAC2',
            lineHeight: 1.6,
            fontSize: '0.9rem',
          }}
        >
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <AnimatedButton 
          onClick={onClose} 
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            py: 1,
            fontWeight: 600,
          }}
        >
          Get Started
        </AnimatedButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default Popup; 