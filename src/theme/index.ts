import { createTheme } from '@mui/material/styles';

export const themeColors = {
  green: {
    primary: '#00FF88',
    secondary: '#00b4d8',
    background: 'rgba(18, 18, 18, 0.95)',
    text: '#FFFFFF',
    border: 'rgba(0, 255, 136, 0.15)',
    glow: 'rgba(0, 255, 136, 0.3)',
    accent: '#00FF88',
    gradient: 'linear-gradient(45deg, #00FF88 30%, #00b4d8 90%)',
    cardBg: 'rgba(26, 26, 26, 0.9)',
    hoverGlow: '0 0 25px rgba(0, 255, 136, 0.4)',
  },
  purple: {
    primary: '#9C27B0',
    secondary: '#E1BEE7',
    background: 'rgba(18, 18, 18, 0.95)',
    text: '#FFFFFF',
    border: 'rgba(156, 39, 176, 0.15)',
    glow: 'rgba(156, 39, 176, 0.3)',
    accent: '#9C27B0',
    gradient: 'linear-gradient(45deg, #9C27B0 30%, #E1BEE7 90%)',
    cardBg: 'rgba(26, 26, 26, 0.9)',
    hoverGlow: '0 0 25px rgba(156, 39, 176, 0.4)',
  },
  gold: {
    primary: '#FFD700',
    secondary: '#FFA500',
    background: 'rgba(18, 18, 18, 0.95)',
    text: '#FFFFFF',
    border: 'rgba(255, 215, 0, 0.15)',
    glow: 'rgba(255, 215, 0, 0.3)',
    accent: '#FFD700',
    gradient: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
    cardBg: 'rgba(26, 26, 26, 0.9)',
    hoverGlow: '0 0 25px rgba(255, 215, 0, 0.4)',
  },
  red: {
    primary: '#FF1744',
    secondary: '#FF4569',
    background: 'rgba(18, 18, 18, 0.95)',
    text: '#FFFFFF',
    border: 'rgba(255, 23, 68, 0.15)',
    glow: 'rgba(255, 23, 68, 0.3)',
    accent: '#FF1744',
    gradient: 'linear-gradient(45deg, #FF1744 30%, #FF4569 90%)',
    cardBg: 'rgba(26, 26, 26, 0.9)',
    hoverGlow: '0 0 25px rgba(255, 23, 68, 0.4)',
  },
  neon: {
    primary: '#00FFFF',
    secondary: '#FF00FF',
    background: 'rgba(18, 18, 18, 0.95)',
    text: '#FFFFFF',
    border: 'rgba(0, 255, 255, 0.15)',
    glow: 'rgba(0, 255, 255, 0.3)',
    accent: '#00FFFF',
    gradient: 'linear-gradient(45deg, #00FFFF 30%, #FF00FF 90%)',
    cardBg: 'rgba(26, 26, 26, 0.9)',
    hoverGlow: '0 0 25px rgba(0, 255, 255, 0.4)',
  },
  blue: {
    primary: '#00B4D8',
    secondary: '#90E0EF',
    background: 'rgba(255, 255, 255, 0.95)',
    text: '#1A1A1A',
    border: 'rgba(0, 180, 216, 0.15)',
    glow: 'rgba(0, 180, 216, 0.3)',
    accent: '#00B4D8',
    gradient: 'linear-gradient(45deg, #00B4D8 30%, #90E0EF 90%)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    hoverGlow: '0 0 25px rgba(0, 180, 216, 0.4)',
  },
  white: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    background: '#FFFFFF',
    text: '#1A1A1A',
    border: 'rgba(255, 255, 255, 0.15)',
    glow: 'rgba(255, 255, 255, 0.3)',
    accent: '#FFFFFF',
    gradient: 'linear-gradient(45deg, #FFFFFF 30%, #F5F5F5 90%)',
    cardBg: '#FFFFFF',
    hoverGlow: '0 0 25px rgba(255, 255, 255, 0.4)',
  }
};

export const createAppTheme = (themeName: keyof typeof themeColors) => {
  const colors = themeColors[themeName];
  
  return createTheme({
    palette: {
      mode: themeName === 'green' ? 'dark' : 'light',
      primary: {
        main: colors.primary,
        light: colors.secondary,
        dark: colors.primary,
      },
      background: {
        default: themeName === 'green' ? '#121212' : '#FFFFFF',
        paper: colors.background,
      },
      text: {
        primary: colors.text,
        secondary: themeName === 'green' ? '#B0B0B0' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 900,
        background: colors.gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: `0 0 10px ${colors.glow}`,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 800,
        color: colors.text,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: colors.text,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: colors.text,
      },
      h5: {
        fontSize: '1.1rem',
        fontWeight: 600,
        color: colors.text,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        color: colors.text,
      },
      body1: {
        fontSize: '0.875rem',
        color: colors.text,
      },
      body2: {
        fontSize: '0.75rem',
        color: colors.text,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: themeName === 'green' ? '#121212' : '#FFFFFF',
            color: colors.text,
            margin: 0,
            padding: 0,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: themeName === 'green' ? '#1A1A1A' : '#F5F5F5',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.primary,
              borderRadius: '4px',
              '&:hover': {
                background: colors.secondary,
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.cardBg,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: colors.hoverGlow,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 24px',
            transition: 'all 0.3s ease',
            background: colors.gradient,
            color: themeName === 'green' ? '#000' : '#fff',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: colors.hoverGlow,
            },
            '&.Mui-disabled': {
              background: themeName === 'green' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            },
          },
          outlined: {
            background: 'transparent',
            border: `2px solid ${colors.primary}`,
            color: colors.primary,
            '&:hover': {
              background: `${colors.primary}20`,
              border: `2px solid ${colors.primary}`,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: `${colors.primary}20`,
            color: colors.primary,
            border: `1px solid ${colors.border}`,
            '&:hover': {
              backgroundColor: `${colors.primary}30`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: colors.cardBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${colors.border}`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: colors.border,
            color: colors.text,
          },
          head: {
            backgroundColor: `${colors.primary}10`,
            color: colors.primary,
            fontWeight: 700,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: `${colors.primary}10`,
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: colors.text,
            '&.Mui-selected': {
              color: colors.primary,
            },
            '&:hover': {
              color: colors.primary,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: colors.primary,
            height: '3px',
          },
        },
      },
    },
  });
}; 