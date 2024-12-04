import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserRole } from '../../hooks/use-user';
import EventGuestAndUser from './event-guest-and-user';
import EventOrganizer from './event-organizer';

const Event = () => {
  const userRole = useUserRole();
  const { organizationId, eventId } = useParams();

  return (<>
    {userRole === undefined && (
      <EventGuestAndUser organizationId={organizationId} eventId={eventId} />
    )}
    {userRole !== undefined && userRole === "User" && (
      <EventGuestAndUser organizationId={organizationId} eventId={eventId} />
    )}
    {userRole !== undefined && userRole === 'Organizer' && (
      <EventOrganizer organizationId={organizationId} eventId={eventId} />
    )}
  </>
  );
};

export default Event;