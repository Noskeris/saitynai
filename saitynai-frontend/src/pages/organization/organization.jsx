import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserRole } from '../../hooks/use-user';
import OrganizationsGuestAndUser from './organization-guest-and-user';
import OrganizationsOrganizer from './organization-organizer';
import NotFound from '../not-found';
import { useUserOrganizationId } from '../../hooks/use-user';

const Organization = () => {
  const userRole = useUserRole();
  const { id } = useParams();

  const userOrganizationId = useUserOrganizationId();

  return (<>
    {userRole === undefined && (
      <OrganizationsGuestAndUser organizationId={id} />
    )}
    {userRole !== undefined && userRole === "User" && (
      <OrganizationsGuestAndUser organizationId={id} />
    )}
    {userRole !== undefined && userRole === 'Organizer' && (
      <>
        {(!id || id !== userOrganizationId) ? <NotFound /> : <OrganizationsOrganizer organizationId={id} />}
      </>
    )}
  </>
  );
};

export default Organization;