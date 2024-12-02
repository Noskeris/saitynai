import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';
import '@fontsource/rubik';
import Home from './pages/home/home';
import Login from './pages/auth/login';
import Organizations from './pages/organizations/organizations';
import Organization from './pages/organization/organization';
import Layout from './components/layout';
import NotFound from './pages/not-found';
import { PrivateRoute } from './components/private-route';
import Register from './pages/auth/register';
import Event from './pages/event/event';
import SetupOrganization from './pages/organization/setup-organization';

const theme = createTheme({
  typography: {
    fontFamily: '"Rubik", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#1b1b1b',
    },
    secondary: {
      main: '#ffffff',
    },
    custom1: {
      main: '#efefef',
    },
    custom2: {
      main: '#241123',
    },
    custom3: {
      main: '#82204b',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        body: {
          backgroundColor: theme.palette.custom1.main,
          padding: 0,
          height: '100vh',
        },
        '#root': {
          height: '100%',
        },
      }}
    />
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={
          <PrivateRoute accessLevel={undefined}>
            <Login />
          </PrivateRoute>
        } />

        <Route path="/register" element={
          <PrivateRoute accessLevel={undefined}>
            <Register />
          </PrivateRoute>
        } />

        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:id" element={<Organization />} />
        <Route path="/organizations/:id/events" element={<Organizations />} />
        <Route path="/organizations/:organizationId/events/:eventId" element={<Event />} />

        <Route
          path="/organizations/:organizationId/events/:eventId/timeslots/:timeslotId"
          element={
            <PrivateRoute accessLevel={['Organizer']}>
              <Organizations />
            </PrivateRoute>
          } />

        <Route
          path="/setup-organization"
          element={
            <PrivateRoute accessLevel={['Organizer']}>
              <SetupOrganization />
            </PrivateRoute>
          } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </ThemeProvider>
);

export default App;
