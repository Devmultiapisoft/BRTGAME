import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  Chip,
  Box,
  Theme,
  useTheme,
  Skeleton,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { themeColors } from '../../theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface ColumnConfig {
  key: string;
  label: string;
  format?: (value: any) => React.ReactNode;
}

interface FinancialMetricsProps {
  apiKey: string;
  title: string;
  columns: ColumnConfig[];
}

// Add interface for data types
interface FinancialData {
  date?: string;
  amount?: number;
  status?: string;
  week?: string;
  bonus?: number;
  month?: string;
  members?: number;
}

interface StatusChipProps {
  status: string;
  children?: React.ReactNode;
}

const FinancialMetricCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].background} 0%, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].cardBg} 100%)`,
  borderRadius: '16px',
  border: `1px solid ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border}`,
  padding: '24px',
  margin: '16px 0',
  boxShadow: `0 8px 32px ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].glow}`
}));

const DynamicTable = styled(TableContainer)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderColor: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].border,
    color: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text,
  },
  '& .MuiTableHead-root': {
    background: `linear-gradient(135deg, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}20, ${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].secondary}20)`
  }
}));

const StatusChip = styled(Chip)<StatusChipProps>(({ theme, status }) => ({
  background: status === 'completed' 
    ? `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary}30` 
    : `${themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].error}30`,
  color: status === 'completed' 
    ? themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary 
    : themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].error,
  border: `1px solid ${
    status === 'completed' 
      ? themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary 
      : themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].error
  }`
}));

const HeaderSection = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  width: '100%'
});

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ 
  apiKey, 
  title, 
  columns 
}) => {
  const [data, setData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulated API call with typed response
        const response = await new Promise<{ [key: string]: FinancialData[] }>(resolve => 
          setTimeout(() => {
            resolve({
              daily: [
                { date: '2023-10-01', amount: 1500.00, status: 'completed' },
                { date: '2023-10-02', amount: 2000.00, status: 'pending' },
                { date: '2023-10-03', amount: 1750.50, status: 'completed' },
                { date: '2023-10-04', amount: 2250.75, status: 'processing' }
              ],
              weekly: [
                { week: 'Week 40', bonus: 5000, status: 'completed' },
                { week: 'Week 41', bonus: 4500, status: 'processing' }
              ],
              myteam: [
                { month: 'January', members: 5, bonus: 2500, status: 'paid' },
                { month: 'February', members: 7, bonus: 3500, status: 'pending' }
              ],
              trade: [
                { month: 'January', members: 8, bonus: 3000, status: 'completed' },
                { month: 'February', members: 10, bonus: 4000, status: 'pending' }
              ]
            });
          }, 1000)
        );

        const dataForKey = response[apiKey] || [];
        setData(dataForKey);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  const renderCellContent = (row: FinancialData, column: ColumnConfig) => {
    const value = row[column.key as keyof FinancialData];
    
    if (column.key === 'status') {
      return <StatusChip label={value as string} status={value as string} size="small" />;
    }
    
    if (column.format && value !== undefined) {
      return column.format(value);
    }
    
    return value;
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

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
              transform: 'scale(1.1)',
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
            background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
      </HeaderSection>

      <Box sx={{ p: 2 }}>
        <FinancialMetricCard>
          {loading && (
            <Box sx={{ width: '100%', mb: 2 }}>
              <LinearProgress sx={{ 
                background: themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].primary 
              }} />
            </Box>
          )}

          <DynamicTable component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.key} sx={{ fontWeight: 700 }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  // Show skeleton rows while loading
                  Array.from(new Array(3)).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      {columns.map((column) => (
                        <TableCell key={`skeleton-cell-${column.key}-${index}`}>
                          <Skeleton animation="wave" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : data.length > 0 ? (
                  data.map((row, index) => (
                    <TableRow key={index} hover>
                      {columns.map((column) => (
                        <TableCell key={`${column.key}-${index}`}>
                          {renderCellContent(row, column)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={columns.length} 
                      align="center"
                      sx={{ 
                        py: 6,
                        color: theme => themeColors[theme.palette.mode === 'dark' ? 'green' : 'blue'].text
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Typography variant="body1">
                          No data available
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Check back later for updates
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DynamicTable>
        </FinancialMetricCard>
      </Box>
    </Box>
  );
};

export default FinancialMetrics;
