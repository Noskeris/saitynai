import React from 'react';
import { useUserRole } from '../../hooks/use-user';
import OrganizationsGuestAndUser from './organizations-guest-and-user';
import NotFound from '../not-found';

const Organizations = () => {
  const userRole = useUserRole();

  return (<>
    {userRole === undefined && (
      <OrganizationsGuestAndUser />
    )}
    {userRole !== undefined && userRole === "User" && (
      <OrganizationsGuestAndUser />
    )}
    {userRole !== undefined && userRole === 'Organizer' && (
      <NotFound />
    )}
  </>
  );
};

export default Organizations;