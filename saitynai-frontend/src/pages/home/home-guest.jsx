import React from 'react';
import { Container, Typography, Button, Link } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomeGuest = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom padding={3}>
        Welcome to events system!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Check organizations to find suitable events
      </Typography>

      <Button
        variant="contained"
        sx={{
          margin: '1.5rem 0',
          padding: '0.5rem 2rem',
          backgroundColor: 'custom3.main',
        }}
        onClick={() => navigate('/organizations')}
        fullWidth={isMobile}
      >
        Organizations
      </Button>

      <Typography variant="body2" padding={5}>
        <Link
          component="button"
          onClick={() => navigate('/login')}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Login
        </Link>{' '}
        or{' '}
        <Link
          component="button"
          onClick={() => navigate('/register')}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          register
        </Link>{' '}
        to sign in to the events or be an organizer
      </Typography>
    </Container>
  );
};

export default HomeGuest;
