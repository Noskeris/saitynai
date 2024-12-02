import React from 'react';
import HomeGuest from './home-guest';
import { useUserRole } from '../../hooks/use-user';
import HomeUser from './home-user';
import HomeOrganizer from './home-organizer';

const Home = () => {
  const userRole = useUserRole();

  return (<>
    {userRole === undefined && (
      <HomeGuest />
    )}
    {userRole !== undefined && userRole === "User" && (
      <HomeUser />
    )}
    {userRole !== undefined && userRole === 'Organizer' && (
      <HomeOrganizer />
    )}
  </>
  );
};

export default Home;