import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Stack,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  SelectChangeEvent,
  Container,
  Card,
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

const CommissionSection = styled(Card)(({ theme }) => ({
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

const CommissionItem = styled(Card)(({ theme }) => ({
  background: themeColors.green.cardBg,
  padding: '15px',
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: themeColors.green.text,
  borderRadius: '16px',
  border: `1px solid ${themeColors.green.border}`,
  transition: 'all 0.3s ease',
  backgroundImage: `linear-gradient(135deg, ${themeColors.green.primary}05, ${themeColors.green.secondary}05)`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${themeColors.green.glow}`,
    backgroundImage: `linear-gradient(135deg, ${themeColors.green.primary}10, ${themeColors.green.secondary}10)`,
    border: `1px solid ${themeColors.green.primary}30`,
  },
}));

const CommissionValue = styled(Typography)(({ theme }) => ({
  background: themeColors.green.gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  fontSize: '1.1rem',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: themeColors.green.cardBg,
  color: themeColors.green.text,
  borderRadius: '16px',
  border: `1px solid ${themeColors.green.border}`,
  transition: 'all 0.3s ease',
  backgroundImage: `linear-gradient(135deg, ${themeColors.green.primary}05, ${themeColors.green.secondary}05)`,
  '& .MuiSelect-select': {
    padding: '15px',
  },
  '&:hover': {
    border: `1px solid ${themeColors.green.primary}50`,
    backgroundImage: `linear-gradient(135deg, ${themeColors.green.primary}10, ${themeColors.green.secondary}10)`,
  },
}));

const CommissionDetails: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [date, setDate] = useState('2025-03-04');

  const handleDateChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    setDate(event.target.value as string);
  };

  const commissionTypes = [
    {
      title: 'Lottery Commission',
      items: [
        { label: 'Bet Amount', value: '0' },
        { label: 'Agent level', value: '0' },
        { label: 'Settled Commission', value: '0' },
      ]
    },
    {
      title: 'Slot Commission',
      items: [
        { label: 'Bet Amount', value: '0' },
        { label: 'Agent level', value: '0' },
        { label: 'Settled Commission', value: '0' },
      ]
    },
    {
      title: 'Live Commission',
      items: [
        { label: 'Bet Amount', value: '0' },
        { label: 'Agent level', value: '0' },
        { label: 'Settled Commission', value: '0' },
      ]
    },
    {
      title: 'Sport Commission',
      items: [
        { label: 'Bet Amount', value: '0' },
        { label: 'Agent level', value: '0' },
        { label: 'Settled Commission', value: '0' },
      ]
    },
    {
      title: 'Poker Commission',
      items: [
        { label: 'Bet Amount', value: '0' },
        { label: 'Agent level', value: '0' },
        { label: 'Settled Commission', value: '0' },
      ]
    },
  ];

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
          Commission Details
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
        <FormControl fullWidth sx={{ mb: 2 }}>
          <StyledSelect
            value={date}
            onChange={handleDateChange}
          >
            <MenuItem value="2025-03-04">2025-03-04</MenuItem>
            <MenuItem value="2025-03-03">2025-03-03</MenuItem>
            <MenuItem value="2025-03-02">2025-03-02</MenuItem>
          </StyledSelect>
        </FormControl>

        <List sx={{ p: 0 }}>
          {commissionTypes.map((section, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <CommissionSection>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold',
                    background: themeColors.green.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {section.title}
                </Typography>
              </CommissionSection>
              {section.items.map((item, itemIndex) => (
                <CommissionItem key={itemIndex}>
                  <Typography variant="body1">{item.label}</Typography>
                  <CommissionValue>{item.value}</CommissionValue>
                </CommissionItem>
              ))}
            </Box>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default CommissionDetails; 