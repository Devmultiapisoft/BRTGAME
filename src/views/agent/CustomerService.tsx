import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../theme';

const HeaderSection = styled(Box)(({ theme }) => ({
  background: themeColors.green.gradient,
  color: themeColors.green.text,
  padding: '20px',
  textAlign: 'center',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderBottom: `1px solid ${themeColors.green.border}`,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: themeColors.green.cardBg,
  color: themeColors.green.text,
  padding: '15px',
  marginBottom: '12px',
  borderRadius: '16px',
  border: `1px solid ${themeColors.green.border}`,
  transition: 'all 0.3s ease',
  backgroundImage: `linear-gradient(135deg, ${themeColors.green.primary}10, ${themeColors.green.secondary}10)`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${themeColors.green.glow}`,
    backgroundImage: `linear-gradient(135deg, ${themeColors.green.primary}20, ${themeColors.green.secondary}20)`,
    border: `1px solid ${themeColors.green.primary}50`,
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '15px',
  marginBottom: '10px',
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1rem',
  background: themeColors.green.gradient,
  color: themeColors.green.text,
  border: `1px solid ${themeColors.green.border}`,
  '&:hover': {
    background: themeColors.green.gradient,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${themeColors.green.glow}`,
  },
}));

const CustomerService: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ 
      bgcolor: themeColors.green.background,
      minHeight: '100vh',
      color: themeColors.green.text,
      pb: 2,
      backdropFilter: 'blur(20px)',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      <HeaderSection>
        <IconButton 
          sx={{ 
            color: themeColors.green.text,
            position: 'absolute',
            left: 15,
            '&:hover': {
              transform: 'scale(1.1)',
              color: themeColors.green.primary,
            },
          }} 
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            flex: 1, 
            textAlign: 'center',
            background: themeColors.green.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Agent Customer Service
        </Typography>
      </HeaderSection>

      <Container 
        maxWidth={false}
        disableGutters
        sx={{ 
          width: '100%',
          height: '100%',
          p: 2,
        }}
      >
        <StyledCard>
          <Typography variant="h6" gutterBottom sx={{
            background: themeColors.green.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}>
            Contact Support
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Our dedicated support team is available 24/7 to assist you with any questions or concerns.
          </Typography>

          <ContactButton startIcon={<WhatsAppIcon />}>
            WhatsApp Support
          </ContactButton>

          <ContactButton startIcon={<TelegramIcon />}>
            Telegram Support
          </ContactButton>

          <ContactButton startIcon={<EmailIcon />}>
            Email Support
          </ContactButton>
        </StyledCard>

        <StyledCard>
          <Typography variant="h6" gutterBottom sx={{
            background: themeColors.green.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}>
            Support Hours
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>WhatsApp</Typography>
            <Typography>24/7</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Telegram</Typography>
            <Typography>24/7</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Email</Typography>
            <Typography>Response within 24h</Typography>
          </Box>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default CustomerService; 