// SettingsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForwardIos, Edit, Security } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../theme';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
  borderRadius: 16,
  boxShadow: `0 8px 32px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`,
  overflow: 'hidden'
}));

const SettingsPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [nickname, setNickname] = useState('MEMBER-13379554');
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const handleNicknameChange = () => {
    setIsEditingNickname(!isEditingNickname);
  };

  const handleSaveNickname = (newNickname: string) => {
    setNickname(newNickname);
    setIsEditingNickname(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Background Image Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100px',
          backgroundImage: 'url("/path/to/your/image.jpg")',
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
          Settings
        </Typography>
      </Box>

      {/* Main Content Section */}
      <GlowPaper sx={{ p: 3, flex: 1 }}>
        {/* Profile Section */}
        <ListItem sx={{ py: 2 }}>
          <Avatar 
            src="/avatar.png" 
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 2,
              boxShadow: 3
            }}
          />
          <ListItemText
            primary={
              <Button 
                endIcon={<ArrowForwardIos sx={{ fontSize: 16 }} />}
                sx={{ textTransform: 'none', color: 'text.primary' }}
              >
                Change avatar
              </Button>
            }
          />
        </ListItem>
        <Divider variant="middle" />

        <List>
          <ListItem>
            {isEditingNickname ? (
              <NicknameEditor 
                currentNickname={nickname}
                onSave={handleSaveNickname}
                onCancel={() => setIsEditingNickname(false)}
              />
            ) : (
              <ListItemText
                primary="Nickname"
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">{nickname}</Typography>
                    <IconButton 
                      size="small" 
                      sx={{ ml: 1 }}
                      onClick={handleNicknameChange}
                    >
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                }
              />
            )}
          </ListItem>
          <Divider variant="middle" />

          <ListItem>
            <ListItemText
              primary="UID"
              secondary="1337954"
              secondaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        </List>

        {/* Security Section */}
        <GlowPaper sx={{ mb: 3 }}>
          <ListItem sx={{ py: 2 }}>
            <Security sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Security Information
            </Typography>
          </ListItem>
          <Divider variant="middle" />

          <List>
            <ListItem onClick={() => navigate('/change-password')}>
              <ListItemText
                primary="Login Password"
                secondary="Change Password"
              />
            </ListItem>
            <Divider variant="middle" />

            <ListItem onClick={() => navigate('/change-password')}>
              <ListItemText
                primary="Withdrawal Password"
                secondary="Change Password"
              />
            </ListItem>
          </List>
        </GlowPaper>

        {/* Version Section */}
        <GlowPaper>
          <ListItem>
            <ListItemText
              primary="Version"
              secondary="1.0.1"
              secondaryTypographyProps={{ 
                variant: 'body2',
                color: 'text.secondary'
              }}
            />
          </ListItem>
        </GlowPaper>
      </GlowPaper>
    </AnimatedBox>
  );
};

const NicknameEditor = ({ currentNickname, onSave, onCancel }: { currentNickname: string, onSave: (newNickname: string) => void, onCancel: () => void }) => {
  const [newNickname, setNewNickname] = useState(currentNickname);

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={newNickname}
        onChange={(e) => setNewNickname(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onSave(newNickname)}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;