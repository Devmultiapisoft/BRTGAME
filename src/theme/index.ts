import { createTheme } from '@mui/material/styles';

export const themeColors = {
  green: {
    primary: '#00FF88',
    secondary: '#00b4d8',
    background: 'rgba(26, 26, 26, 0.8)',
    text: '#FFFFFF',
    border: 'rgba(0, 255, 136, 0.1)',
    glow: 'rgba(0, 255, 136, 0.2)',
    accent: '#00b4d8',
    gradient: 'linear-gradient(135deg, #00FF88, #00b4d8)',
    cardBg: 'rgba(26, 26, 26, 0.9)',
    sectionBg: 'rgba(0, 255, 136, 0.05)',
    hoverBg: 'rgba(0, 255, 136, 0.1)',
  },
  blue: {
    primary: '#00B4D8',
    secondary: '#FFA500',
    background: 'rgba(255, 255, 255, 0.9)',
    text: '#1A1A1A',
    border: 'rgba(0, 180, 216, 0.1)',
    glow: 'rgba(0, 180, 216, 0.2)',
    accent: '#FFA500',
    gradient: 'linear-gradient(135deg, #00B4D8, #FFA500)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    sectionBg: 'rgba(0, 180, 216, 0.05)',
    hoverBg: 'rgba(0, 180, 216, 0.1)',
  },
  skyblue: {
    primary: '#87CEEB',
    secondary: '#FFA500',
    background: 'rgba(255, 255, 255, 0.95)',
    text: '#1A1A1A',
    border: 'rgba(135, 206, 235, 0.1)',
    glow: 'rgba(135, 206, 235, 0.2)',
    accent: '#FFA500',
    gradient: 'linear-gradient(135deg, #87CEEB, #FFA500)',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    sectionBg: 'rgba(135, 206, 235, 0.05)',
    hoverBg: 'rgba(135, 206, 235, 0.1)',
  },
  white: {
    primary: '#1E88E5',
    secondary: '#FF9800',
    background: '#FFFFFF',
    text: '#1A1A1A',
    border: 'rgba(30, 136, 229, 0.1)',
    glow: 'rgba(30, 136, 229, 0.2)',
    accent: '#1565C0',
    gradient: 'linear-gradient(135deg, #1E88E5, #FF9800)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    sectionBg: 'rgba(30, 136, 229, 0.05)',
    hoverBg: 'rgba(30, 136, 229, 0.1)',
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
        fontWeight: 700,
        background: colors.gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: colors.primary,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: colors.primary,
      },
      body1: {
        fontSize: '1rem',
        color: colors.text,
      },
      body2: {
        fontSize: '0.875rem',
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
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.cardBg || colors.background,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            backgroundImage: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`,
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 8px 24px ${colors.glow}`,
              backgroundImage: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
              border: `1px solid ${colors.primary}50`,
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
            padding: '12px 28px',
            transition: 'all 0.3s ease',
            backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: '#FFFFFF',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px ${colors.glow}`,
              backgroundImage: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: `linear-gradient(135deg, ${colors.primary}05, ${colors.secondary}05)`,
            backdropFilter: 'blur(10px)',
          },
        },
      },
    },
  });
}; 