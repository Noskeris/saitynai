import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Link, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetOrganization } from "../../hooks/use-organizations";
import { useGetEvent } from "../../hooks/use-events";
import { useGetTimeSlotsList } from "../../hooks/use-timeslots";
import toastService from '../../services/toast-service';
import { useUserRole, useUserId } from '../../hooks/use-user';
import { useRemoveParticipant, useAddParticipant } from "../../hooks/use-participants";
import EditEventModal from "./edit-event-modal";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteEvent } from "../../hooks/use-events";

const EventOrganizer = ({ organizationId, eventId }) => {
    const { data: organizationData, isLoading: organizationIsLoading, error: organizationError } = useGetOrganization(organizationId);
    const { data: eventData, isLoading: eventIsLoading, error: eventError } = useGetEvent(organizationId, eventId);
    const { data: timeSlotsData, isLoading: timeSlotsIsLoading, error: timeSlotsError } = useGetTimeSlotsList(organizationId, eventId);
    const [organization, setOrganization] = useState();
    const [event, setEvent] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const userRole = useUserRole();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const navigate = useNavigate();
    const deleteEvent = useDeleteEvent();

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

    const handleDelete = async () => {
        setDeleting(true);
        try {
            console.log(eventId)
            await deleteEvent.mutateAsync({organizationId, eventId});
            navigate(`/organizations/${organizationId}/events`);
        } catch (err) {
            toastService.error(err.response.data.Errors.details[0]);
        } finally {
            setDeleting(false);
            setDeleteConfirmOpen(false);
        }
    };

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
                {event.name}
            </Typography>

            <Button
                variant="contained"
                sx={{
                    margin: '0.75rem 0',
                    marginRight: isMobile ? 0 : '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'custom3.main',
                }}
                onClick={() => setEditModalOpen(true)}
                fullWidth={isMobile}
            >
                Edit Event
            </Button>
            <Button
                variant="contained"
                sx={{
                    margin: '0.75rem 0',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'custom2.main',
                }}
                onClick={() => setDeleteConfirmOpen(true)}
                fullWidth={isMobile}
                disabled={isDeleting}
            >
                {isDeleting ? "Deleting..." : "Delete Event"}
            </Button>

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
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                }}
            >
                <Typography variant="h5">
                    Time Slots
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        margin: '0.75rem 0',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'custom3.main',
                    }}
                    onClick={() => setCreateModalOpen(true)}
                    fullWidth={isMobile}
                >
                    Add time slot
                </Button>
            </div>
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
                    Currently, this event doesn't have any time slot. Click the button to create a new time slot.
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

            {isEditModalOpen && (
                <EditEventModal
                    open={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    organizationId={organizationId}
                    event={event}
                />
            )}

            <Dialog
                open={isDeleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        overflow: 'hidden',
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <DialogTitle sx={{ fontWeight: 'bold', margin: 0, flexGrow: 1, padding: '1rem' }}>
                        Delete Event
                    </DialogTitle>
                    <DialogActions>
                        <IconButton edge="end" color="primary" onClick={() => setDeleteConfirmOpen(false)} sx={{ padding: '1rem' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Box>
                <DialogContent>
                    <Typography id="delete-confirmation-description" sx={{ marginBottom: '1rem' }}>
                        Are you sure you want to delete this event?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'primary.main' }}
                            onClick={handleDelete}
                            disabled={isDeleting}
                            fullWidth={isMobile}
                        >
                            {isDeleting ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

        </Container>
    );
};

const formatDateTime = (dateTime) => {
    return new Date(dateTime).toISOString().replace('T', ' ').slice(0, 16);
};

const isAvailableTimeSlot = (timeSlot) => {
    const isFullTimeSlot = timeSlot.maxParticipants ? timeSlot.participantsCount < timeSlot.maxParticipants : true;
    return !isFullTimeSlot && !timeSlot.IsCancelled && timeSlot.startTime > new Date();
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
            {timeSlot.isParticipant && (
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

export default EventOrganizer;
