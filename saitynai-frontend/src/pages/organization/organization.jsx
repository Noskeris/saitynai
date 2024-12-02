import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserRole } from '../../hooks/use-user';
import OrganizationsGuestAndUser from './organization-guest-and-user';
import OrganizationsOrganizer from './organization-organizer';

const Organization = () => {
  const userRole = useUserRole();
  const { id } = useParams();

  return (<>
    {userRole === undefined && (
      <OrganizationsGuestAndUser organizationId={id} />
    )}
    {userRole !== undefined && userRole === "User" && (
      <OrganizationsGuestAndUser organizationId={id} />
    )}
    {userRole !== undefined && userRole === 'Organizer' && (
      <OrganizationsOrganizer organizationId={id} />
    )}
  </>
  );
};

export default Organization;