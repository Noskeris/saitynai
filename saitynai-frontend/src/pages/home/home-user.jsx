import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const HomeUser = () => {
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
        </Container>
    );
};

export default HomeUser;
