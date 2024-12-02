import React from 'react';
import MenuBar from './menu-bar';
import Footer from './footer';
import { Box, Container } from '@mui/material';

const Layout = ({ children }) => (
  <>
    <MenuBar />
    <Box
      component="main"
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '84px',
        paddingBottom: '64px',
        '@media (max-width:599px)': {
          paddingTop: '0',
          paddingBottom: '0',
        },
      }}
    >
      <Container
        sx={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: 3,
          padding: '2rem',
          width: '90vw',
          maxWidth: '90vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '@media (max-width:599px)': {
            width: '100vw',
            maxWidth: '100vw',
            borderRadius: '0',
          },
        }}
      >
        {children}
      </Container>
    </Box>
    <Footer />
  </>
);

export default Layout;
