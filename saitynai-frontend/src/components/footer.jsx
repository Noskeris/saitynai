import React from 'react';
import { Box, Typography } from '@mui/material';
import AboutUs from './about-us';
import Contacts from './contacts';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundColor: 'custom2.main',
      boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <AboutUs />
    <Contacts />
    <Typography color="secondary">
      ©2024 Nojus Bronušas
    </Typography>
  </Box>
);

export default Footer;
