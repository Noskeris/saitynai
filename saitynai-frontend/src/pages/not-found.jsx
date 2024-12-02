import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound = () => {

    return (

        <Container style={{ textAlign: 'center', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom padding={3}>
                404: Page not found
            </Typography>
            <Typography variant="h6" gutterBottom padding={3}>
                To go back to the home page click <a href="/">here</a>
            </Typography>
        </Container>
    );
};

export default NotFound;