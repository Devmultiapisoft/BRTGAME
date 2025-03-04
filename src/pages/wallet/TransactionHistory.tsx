import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { ArrowForwardIos, FilterList } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MiddlewareReturn } from '@floating-ui/core';
import { MiddlewareState } from '@floating-ui/dom';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: 24
}));

const TransactionHistory = ({ apiKey, title }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch transactions based on apiKey
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Replace with actual API call
        const response = await fetch(`https://api.example.com/transactions?type=${apiKey}`);
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [apiKey]);

  // Apply filters
  useEffect(() => {
    let filtered = transactions;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(t => new Date(t.date) >= dateFilter);
    }

    setFilteredTransactions(filtered);
  }, [statusFilter, dateFilter, transactions]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleDateChange = (date) => {
    setDateFilter(date);
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setDateFilter(null);
  };

  return (
    <AnimatedBox
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    sx={{
      width: '100%',
      margin: 0,
      p: 3,
      bgcolor: 'background.default',
      position: 'relative',
      overflowX: 'hidden'
    }}
  >
    <Box sx={{ 
      maxWidth: 1200, // Set fixed maximum width
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowForwardIos sx={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {title} History
        </Typography>
      </Box>

      {/* Filters - Fixed Section */}
      <GlowPaper sx={{ 
        mb: 3,
        position: 'relative', // For calendar positioning
        overflow: 'visible' // Allow calendar overflow
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 3,
          '& .react-datepicker-popper': { // Calendar positioning fix
            zIndex: 9999
          }
        }}>
          <FormControl fullWidth sx={{ minWidth: 180 }}> {/* Minimum width */}
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>

          {/* Date Picker with Calendar Fix */}
          <Box sx={{ 
            width: '100%', 
            position: 'relative',
            '& .react-datepicker': {
              fontFamily: 'inherit',
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              overflow: 'visible',
              zIndex: 9999,
            }
          }}>
            <DatePicker
              selected={dateFilter}
              onChange={handleDateChange}
              popperPlacement="bottom-start"
              customInput={
                <TextField
                  fullWidth
                  label="From Date"
                />
              }
              dateFormat="dd/MM/yyyy"
            />
          </Box>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FilterList />}
          onClick={clearFilters}
          sx={{
            borderRadius: 2,
            py: 1,
            fontWeight: 600,
            borderColor: 'primary.main',
            color: 'primary.main'
          }}
        >
          Clear Filters
        </Button>
      </GlowPaper>

      {/* Transaction List */}
      <GlowPaper>
        {loading ? (
          <Typography>Loading transactions...</Typography>
        ) : (
          <List>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem sx={{ py: 2 }}>
                  <ListItemText
                    primary={`${transaction.amount} ${transaction.currency}`}
                    secondary={new Date(transaction.date).toLocaleString()}
                    primaryTypographyProps={{ fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: transaction.status === 'completed' ? '#00FF88' :
                             transaction.status === 'pending' ? '#FFD700' : '#FF1744'
                    }}
                  >
                    {transaction.status}
                  </Typography>
                </ListItem>
                {index < filteredTransactions.length - 1 && <Divider variant="middle" />}
              </motion.div>
            ))}
          </List>
        )}
      </GlowPaper>
    </Box>
  </AnimatedBox>
  );
};

export default TransactionHistory;