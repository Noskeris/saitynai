import React from 'react';
import { useUserRole } from '../../hooks/use-user';
import NotFound from '../not-found';
import EventsOrganizer from './events-organizer';
import { useParams } from 'react-router-dom';
import { useUserOrganizationId } from '../../hooks/use-user';

const Events = () => {
  const userRole = useUserRole();
  const {id} = useParams();
  const userOrganizationId = useUserOrganizationId();
  
  if (id === undefined || id !== userOrganizationId) {
    return <NotFound />;
  }

  return (<>
    {userRole !== undefined && userRole === 'Organizer' && (
      <EventsOrganizer organizationId={id} />
    )}
  </>
  );
};

export default Events;