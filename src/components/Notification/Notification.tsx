import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import MessageIcon from '@mui/icons-material/Message';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  height: 'calc(100vh - 100px)',
}));

const NotificationPage = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      type: 'Login notification',
      date: '2025-03-04 16:28:12',
      content: 'Your account has just been logged in at 2025-03-04 16:28:12. If you have any questions, please contact online customer service for consultation! I wish you happy gaming and lots of profits!'
    },
    {
      type: 'Login notification',
      date: '2025-03-04 16:21:47',
      content: 'Your account has just been logged in at 2025-03-04 16:21:47. If you have any questions, please contact online customer service for consultation! I wish you happy gaming and lots of profits!'
    },
    {
      type: 'Sign Up',
      date: '2025-02-28 17:16:59',
      content: 'Congratulations on your successful registration. You are now our member and we will serve you wholeheartedly! We offer many industry leading games, this is the leading gaming platform, try the lottery games we develop. While enjoying the best gaming experience, you can also join unlimited agents and make money without leaving home.'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: '100%',
        height: '100vh',
        margin: '0 auto',
        p: 3,
        bgcolor: 'background.default',
        position: 'relative'
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowForwardIos sx={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Notifications
        </Typography>
      </Box>

      {/* Notifications List */}
      <GlowPaper>
        <List>
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
               
                  <MessageIcon sx={{ mr: 1, color: 'primary.main' }} />
                
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {notification.type}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="caption"
                        display="block"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {notification.date}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ mt: 1, display: 'block' }}
                      >
                        {notification.content}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="middle" />}
            </motion.div>
          ))}
        </List>
      </GlowPaper>
    </AnimatedBox>
  );
};

export default NotificationPage;