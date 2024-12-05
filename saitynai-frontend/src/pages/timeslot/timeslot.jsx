import React from 'react';
import { useUserRole } from '../../hooks/use-user';
import NotFound from '../not-found';
import TimeSlotOrganizer from './timeslot-organizer';
import { useParams } from 'react-router-dom';

const TimeSlot = () => {
    const userRole = useUserRole();
    const { organizationId, eventId, timeSlotId } = useParams();
    return (<>
        {userRole === undefined && (
            <NotFound />
        )}
        {userRole !== undefined && userRole === "User" && (
            <NotFound />
        )}
        {userRole !== undefined && userRole === 'Organizer' && (
            <TimeSlotOrganizer
                organizationId={organizationId}
                eventId={eventId}
                timeSlotId={timeSlotId}
            />
        )}
    </>
    );
};

export default TimeSlot;