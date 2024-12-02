import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserName, useUserOrganizationId, useUserRole } from '../hooks/use-user';
import { UserContext } from '../services/auth-provider';

const MenuBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const userRole = useUserRole();
  const user = useContext(UserContext);
  const userName = useUserName();
  const organizationId = useUserOrganizationId();

  const handleLogout = async () => {
    try {
      await user.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItemsList = () => {
    if (userRole === undefined) {
      return [
        ['ORGANIZATIONS', () => navigate('/organizations')],
        ['REGISTER', () => navigate('/register')],
        ['LOGIN', () => navigate('/login')],
      ];
    }
    if (userRole === 'User') {
      return [
        ['ORGANIZATIONS', () => navigate('/organizations')],
        ['LOGOUT', handleLogout],
      ];
    }
    if (userRole === 'Organizer') {
      const list = [];

      if (organizationId) {
        list.push(['ORGANIZATION', () => navigate(`/organizations/${organizationId}`)]);
        list.push(['EVENTS', () => navigate(`/organizations/${organizationId}/events`)]);
      }

      list.push(['LOGOUT', handleLogout]);

      return list;
    }
    return [];
  }

  const menuItems = (
    <>
      {menuItemsList().map((item) => (
        <Button key={item[0]} onClick={item[1]} color="secondary" sx={{ fontWeight: 'bold' }}>{item[0]}</Button>
      ))}
    </>
  );

  const mobileMenuItems = (
    <>
      {menuItemsList().map((item) => (
        <ListItem
          key={item[0]}
          onClick={() => {
            setDrawerOpen(false);
            item[1]();
          }}
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
        >
          <ListItemText
            primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
            primary={item[0]}
          />
        </ListItem>

      ))}
    </>
  );

  return (
    <AppBar
      sx={{ backgroundColor: 'custom2.main' }}
      style={{ height: 64 }}
    >
      <Toolbar style={{ height: '100%', paddingLeft: '16px' }}>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, color: 'secondary', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          EVENTS SYSTEM
        </Typography>
        <Typography paddingRight={2}>
          {userName}
        </Typography>
        {isMobile ? (
          <>
            <IconButton color="secondary" onClick={toggleDrawer(true)} edge="end">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                display="flex"
                justifyContent="flex-end"
                p={3}
              >
                <IconButton edge="end" color="primary" onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <List sx={{ width: 250, color: 'secondary' }}>
                {mobileMenuItems}
              </List>
            </Drawer>
          </>
        ) : (
          <Box>
            {menuItems}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
