import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  IconButton,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

const NewSubordinates: React.FC = () => {
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
          New Subordinates
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
          <Typography variant="h6" gutterBottom>Today's New Subordinates</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Total New Members</Typography>
            <Typography sx={{ 
              background: themeColors.green.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}>0</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Active Members</Typography>
            <Typography sx={{ 
              background: themeColors.green.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}>0</Typography>
          </Box>
        </StyledCard>

        <StyledCard>
          <Typography variant="h6" gutterBottom>This Week's New Subordinates</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Total New Members</Typography>
            <Typography sx={{ 
              background: themeColors.green.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}>0</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Active Members</Typography>
            <Typography sx={{ 
              background: themeColors.green.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}>0</Typography>
          </Box>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default NewSubordinates; 