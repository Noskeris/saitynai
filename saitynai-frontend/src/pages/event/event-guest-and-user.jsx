import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Link, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetOrganization } from "../../hooks/use-organizations";
import { useGetEvent } from "../../hooks/use-events";
import { useGetTimeSlotsList } from "../../hooks/use-timeslots";
import toastService from '../../services/toast-service';
import { useUserRole, useUserId } from '../../hooks/use-user';
import { useRemoveParticipant, useAddParticipant } from "../../hooks/use-participants";

const EventGuestAndUser = ({ organizationId, eventId }) => {
    const { data: organizationData, isLoading: organizationIsLoading, error: organizationError } = useGetOrganization(organizationId);
    const { data: eventData, isLoading: eventIsLoading, error: eventError } = useGetEvent(organizationId, eventId);
    const { data: timeSlotsData, isLoading: timeSlotsIsLoading, error: timeSlotsError } = useGetTimeSlotsList(organizationId, eventId);
    const [organization, setOrganization] = useState();
    const [event, setEvent] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const userRole = useUserRole();

    useEffect(() => {
        if (organizationData) {
            setOrganization(organizationData);
        }
    }, [organizationData]);

    useEffect(() => {
        if (eventData && eventData) {
            setEvent(eventData);
        }
    }, [eventData]);

    useEffect(() => {
        if (timeSlotsData && timeSlotsData.timeSlots) {
            setTimeSlots(timeSlotsData.timeSlots);
        }
    }, [timeSlotsData]);

    if (organizationIsLoading || eventIsLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (organizationError || eventError) {
        return <Typography>Error loading event data. Please refresh page</Typography>;
    }

    if (!organization || !eventData) {
        return <Typography>Organization not found.</Typography>;
    }

    return (
        <Container style={{ textAlign: "left", padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                {organization.name} - {event.name}
            </Typography>

            <Box sx={{ marginBottom: "1rem" }} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Description:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {event.description}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Location:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {event.location}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Requirements:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {event.requirements}
                    </Typography>
                </Grid>

            </Grid>
            <br />
            <Typography variant="h5" gutterBottom>
                Time Slots
            </Typography>
            {timeSlotsIsLoading && (
                <Typography variant="body1" color="textSecondary">
                    Loading...
                </Typography>
            )}
            {timeSlotsError && (
                <Typography variant="body1" color="error">
                    Error loading time slots.
                </Typography>
            )}
            {!timeSlotsIsLoading && !timeSlotsError && timeSlots.length === 0 && (
                <Typography variant="body1" color="textSecondary">
                    Currently, this event doesn't have any time slot. Come back next time!
                </Typography>
            )}
            {!timeSlotsIsLoading && !timeSlotsError && timeSlots.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>START TIME</strong></TableCell>
                                <TableCell><strong>END TIME</strong></TableCell>
                                <TableCell><strong>AVAILABILITY</strong></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timeSlots.map((timeSlot) => (
                                <TableRow key={timeSlot.id}>
                                    <TableCell>{formatDateTime(timeSlot.startTime)}</TableCell>
                                    <TableCell>{formatDateTime(timeSlot.endTime)}</TableCell>
                                    {timeSlot.maxParticipants && <TableCell> {timeSlot.participantsCount}/{timeSlot.maxParticipants}</TableCell>}
                                    {!timeSlot.maxParticipants && <TableCell>Unlimited</TableCell>}
                                    <TableCell>{isAvailableTimeSlot(timeSlot) &&
                                        ((userRole === undefined && <GuestSignUpField
                                            key={`guest-signup-${timeSlot.id}`} />) ||
                                            (userRole === 'User' && <UserSignUpField
                                                key={`user-signup-${timeSlot.id}`}
                                                organizationId={organizationId}
                                                eventId={eventId}
                                                timeSlot={timeSlot} />))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const isAvailableTimeSlot = (timeSlot) => {
    let isFullTimeSlot = timeSlot.maxParticipants ? timeSlot.participantsCount >= timeSlot.maxParticipants : false;

    if (timeSlot.isParticipant) {
        isFullTimeSlot = false;
    }

    return !isFullTimeSlot && !timeSlot.isCancelled && new Date(timeSlot.startTime) > new Date();
};

const GuestSignUpField = () => {
    const navigate = useNavigate();
    return (
        <Typography variant="body2">
            <Link
                component="button"
                onClick={() => navigate('/login')}
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
                Login
            </Link>{' '}
            or{' '}
            <Link
                component="button"
                onClick={() => navigate('/register')}
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
                register
            </Link>{' '}
            to sign up to the available time slot
        </Typography>
    );
};

const UserSignUpField = ({organizationId, eventId, timeSlot}) => {
    const removeParticipant = useRemoveParticipant();
    const addParticipant = useAddParticipant();
    const userId = useUserId();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleRemoveParticipant = async () => {
        try {
            setIsButtonDisabled(true);
            await removeParticipant.mutateAsync({
                organizationId,
                eventId,
                timeSlotId: timeSlot.id,
                participantId: userId,
            });
        } catch (err) {
            toastService.error(err.response.data.Errors.details[0]);
        }
        setIsButtonDisabled(false);
    }

    const handleAddParticipant = async () => {
        try {
            setIsButtonDisabled(true);
            await addParticipant.mutateAsync({
                organizationId: organizationId,
                eventId: eventId,
                timeSlotId: timeSlot.id,
            });
        } catch (err) {
            toastService.error(err.response.data.Errors.details[0]);
        }
        setIsButtonDisabled(false);
    }

    return (
        <>
            {timeSlot.isParticipant && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveParticipant}
                    disabled={isButtonDisabled}
                >
                    Withdraw
                </Button>
            )}
            {!timeSlot.isParticipant && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddParticipant}
                    disabled={isButtonDisabled}
                >
                    Sign Up
                </Button>
            )
            }
        </>
    );
}


export default EventGuestAndUser;
