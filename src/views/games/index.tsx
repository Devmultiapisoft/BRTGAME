import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
}));

const GameImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '4px 4px 0 0',
});

const GameTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textAlign: 'center',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`game-tabpanel-${index}`}
      aria-labelledby={`game-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface Game {
  name: string;
  image: string;
  path: string;
}

interface GameCategory {
  title: string;
  games: Game[];
}

const GamesPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenDialog(false);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleGameClick = (path: string) => {
    navigate(path);
  };

  const gameCategories: GameCategory[] = [
    {
      title: 'Win Go',
      games: [
        { name: 'Win Go 1Min', image: '/images/wingo.png', path: '/win' },
        { name: 'Win Go 3Min', image: '/images/wingo.png', path: '/win/3' },
        { name: 'Win Go 5Min', image: '/images/wingo.png', path: '/win/5' },
        { name: 'Win Go 10Min', image: '/images/wingo.png', path: '/win/10' },
      ],
    },
    {
      title: 'TRX',
      games: [
        { name: 'TRX 1Min', image: '/images/trx.jpeg', path: '/trx' },
        { name: 'TRX 3Min', image: '/images/trx.jpeg', path: '/trx/3' },
        { name: 'TRX 5Min', image: '/images/trx.jpeg', path: '/trx/5' },
        { name: 'TRX 10Min', image: '/images/trx.jpeg', path: '/trx/10' },
      ],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 4 
          }}
        >
          Games
        </Typography>

        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: 3,
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
          }
        }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            aria-label="game categories"
          >
            {gameCategories.map((category, index) => (
              <Tab 
                key={index} 
                label={category.title}
                sx={{
                  minWidth: isMobile ? 'auto' : 160,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              />
            ))}
          </Tabs>
        </Box>

        {gameCategories.map((category, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
            <Grid container spacing={3}>
              {category.games.map((game, gameIndex) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={gameIndex}>
                  <StyledCard onClick={() => handleGameClick(game.path)}>
                    <GameImage src={game.image} alt={game.name} />
                    <CardContent>
                      <GameTitle variant="h6">
                        {game.name}
                      </GameTitle>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        ))}
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 2,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 2
        }}>
          Welcome to Our Gaming Platform
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              color: theme.palette.grey[500],
              '&:hover': {
                color: theme.palette.primary.main,
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Experience the thrill of our exciting games and win big!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 4,
            }}
          >
            Get Started
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GamesPage;
