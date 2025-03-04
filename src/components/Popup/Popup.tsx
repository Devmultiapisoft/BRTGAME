import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2
      }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'grey.500',
            '&:hover': {
              color: 'primary.main',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 4,
          }}
        >
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup; 