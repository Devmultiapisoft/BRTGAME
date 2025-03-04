import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  IconButton,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../../theme';

const HeaderSection = styled(Box)(({ theme }) => ({
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  padding: '20px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderBottom: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: '60px',
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    padding: '8px',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

const StyledTab = styled(Tab)<{ selected?: boolean }>(({ theme, selected }) => ({
  background: selected ? themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary : themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg,
  color: selected ? themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text : themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary,
  borderRadius: '8px',
  minHeight: '44px',
  padding: '6px 16px',
  fontSize: '14px',
  '&.Mui-selected': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  },
  '&:hover': {
    background: selected ? themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary : themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].hoverBg,
  },
}));

const CommissionSection = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderBottom: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg,
}));

const CommissionRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  '& .label': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary,
    fontSize: '14px',
  },
  '& .value': {
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
    fontSize: '14px',
    fontWeight: 'bold',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`game-tabpanel-${index}`}
      aria-labelledby={`game-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const RebateRatio: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const gameTypes = ['Lottery', 'Slot', 'Live', 'Sport', 'Poker'];

  const commissionLevels = [
    {
      level: 'L0',
      data: [
        { label: '1Level subordinate commission', value: '0.6%' },
        { label: '2Level subordinate commission', value: '0.18%' },
        { label: '3Level subordinate commission', value: '0.054%' },
        { label: '4Level subordinate commission', value: '0.0162%' },
        { label: '5Level subordinate commission', value: '0.0049%' },
        { label: '6Level subordinate commission', value: '0.0015%' },
      ],
    },
    {
      level: 'L1',
      data: [
        { label: '1Level subordinate commission', value: '0.7%' },
        { label: '2Level subordinate commission', value: '0.245%' },
        { label: '3Level subordinate commission', value: '0.0858%' },
        { label: '4Level subordinate commission', value: '0.03%' },
        { label: '5Level subordinate commission', value: '0.0105%' },
        { label: '6Level subordinate commission', value: '0.0037%' },
      ],
    },
    {
      level: 'L2',
      data: [
        { label: '1Level subordinate commission', value: '0.75%' },
        { label: '2Level subordinate commission', value: '0.2813%' },
        { label: '3Level subordinate commission', value: '0.1055%' },
        { label: '4Level subordinate commission', value: '0.0396%' },
        { label: '5Level subordinate commission', value: '0.0148%' },
        { label: '6Level subordinate commission', value: '0.0056%' },
      ],
    },
    {
      level: 'L3',
      data: [
        { label: '1Level subordinate commission', value: '0.8%' },
        { label: '2Level subordinate commission', value: '0.32%' },
        { label: '3Level subordinate commission', value: '0.128%' },
        { label: '4Level subordinate commission', value: '0.0512%' },
        { label: '5Level subordinate commission', value: '0.0205%' },
        { label: '6Level subordinate commission', value: '0.0082%' },
      ],
    },
    {
      level: 'L4',
      data: [
        { label: '1Level subordinate commission', value: '0.85%' },
        { label: '2Level subordinate commission', value: '0.3825%' },
        { label: '3Level subordinate commission', value: '0.1721%' },
        { label: '4Level subordinate commission', value: '0.0774%' },
        { label: '5Level subordinate commission', value: '0.0348%' },
        { label: '6Level subordinate commission', value: '0.0157%' },
      ],
    },
  ];

  return (
    <Box sx={{ 
      bgcolor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
      minHeight: '100vh',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      <HeaderSection>
        <IconButton 
          sx={{ 
            color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
            position: 'absolute',
            left: 15,
            '&:hover': {
              color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary,
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
            fontWeight: 'bold',
            color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
          }}
        >
          Rebate Ratio
        </Typography>
      </HeaderSection>

      <StyledTabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{ 
          bgcolor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background,
        }}
      >
        {gameTypes.map((game, index) => (
          <StyledTab
            key={index}
            label={game}
            selected={selectedTab === index}
          />
        ))}
      </StyledTabs>

      {gameTypes.map((game, index) => (
        <TabPanel key={index} value={selectedTab} index={index}>
          {commissionLevels.map((level, levelIndex) => (
            <CommissionSection key={levelIndex}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
                  fontWeight: 'bold',
                  mb: 1,
                }}
              >
                Commission Level {level.level}
              </Typography>
              {level.data.map((item, itemIndex) => (
                <CommissionRow key={itemIndex}>
                  <Typography className="label">{item.label}</Typography>
                  <Typography className="value">{item.value}</Typography>
                </CommissionRow>
              ))}
            </CommissionSection>
          ))}
        </TabPanel>
      ))}
    </Box>
  );
};

export default RebateRatio; 