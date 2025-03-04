import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '12px 0',
  borderBottom: `1px solid ${themeColors.green.border}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const InvitationRules: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const rules = [
    'Share your invitation code with friends to earn commission.',
    'Each successful referral earns you points and increases your agent level.',
    'Higher agent levels unlock better commission rates.',
    'Commission is calculated based on your direct and team subordinates\' activity.',
    'Maintain active status by meeting minimum monthly requirements.',
    'Commission payouts are processed weekly.',
    'Keep your invitation code private and secure.',
    'Multiple accounts using the same invitation code are not allowed.',
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
          Invitation Rules
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
            General Rules
          </Typography>
          <List>
            {rules.map((rule, index) => (
              <StyledListItem key={index}>
                <ListItemText 
                  primary={`${index + 1}. ${rule}`}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                    },
                  }}
                />
              </StyledListItem>
            ))}
          </List>
        </StyledCard>

        <StyledCard>
          <Typography variant="h6" gutterBottom sx={{
            background: themeColors.green.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}>
            Commission Structure
          </Typography>
          <List>
            <StyledListItem>
              <ListItemText 
                primary="Level 1 Agent"
                secondary="Base commission rate: 0.3%"
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary="Level 2 Agent"
                secondary="Base commission rate: 0.5%"
              />
            </StyledListItem>
            <StyledListItem>
              <ListItemText 
                primary="Level 3 Agent"
                secondary="Base commission rate: 0.8%"
              />
            </StyledListItem>
          </List>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default InvitationRules; 