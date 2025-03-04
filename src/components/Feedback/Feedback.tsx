import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const AnimatedBox = motion(Box);

const GlowPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  padding: 24,
  height: 'calc(100vh - 100px)', // Adjust height to fit below the image
  position: 'relative',
}));

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle feedback submission
    console.log({ feedbackType, description });
    navigate(-1);
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);


  return (
    <AnimatedBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: 375,
        margin: '0 auto',
        p: 0, // Remove padding to fit the image
        bgcolor: 'background.default',
        position: 'relative',
        height: '100vh', // Full height
      }}
    >
      {/* Background Image Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100px', // Height of the image section
          backgroundImage: 'url("https://mirro.io/hs-fs/hubfs/Imported_Blog_Media/1-feedback-descriptive-2.jpg?width=600&height=400&name=1-feedback-descriptive-2.jpg")', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ position: 'absolute', left: 16, top: 16 }}>
          <ArrowForwardIos sx={{ transform: 'rotate(180deg)', color: 'white' }} />
        </IconButton>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>
          Feedback
        </Typography>
      </Box>

      {/* Main Content Section */}
      <GlowPaper>
        <form onSubmit={handleSubmit}>
          {/* Feedback Type */}
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ 
              fontWeight: 600, 
              mb: 1,
              color: 'text.primary'
            }}>
              Feedback Type:
            </FormLabel>
            <RadioGroup
              row
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
            >
              {['Suggestion', 'Function', 'Bug', 'Other'].map((type) => (
                <FormControlLabel
                  key={type.toLowerCase()}
                  value={type.toLowerCase()}
                  control={<Radio color="primary" />}
                  label={type}
                  sx={{ mr: 2 }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Description */}
          <TextField
            fullWidth
            label="Description Content"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 200 }}
            helperText={`${description.length}/200`}
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              background: 'linear-gradient(145deg, #2196F3 0%, #21CBF3 100%)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(33, 150, 243, 0.4)',
              },
            }}
          >
            Submit
          </Button>
        </form>
      </GlowPaper>
    </AnimatedBox>
  );
};

export default FeedbackPage;