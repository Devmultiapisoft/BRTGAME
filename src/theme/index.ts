import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Gold color
      light: '#FFE55C',
      dark: '#B2A600',
    },
    secondary: {
      main: '#FF9800', // Orange color
      light: '#FFB74D',
      dark: '#C66900',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#B0B0B0',
          '&.Mui-selected': {
            color: '#FFD700',
          },
        },
      },
    },
  },
});

export default theme; 