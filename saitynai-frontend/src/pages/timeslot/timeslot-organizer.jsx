import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetEvent } from "../../hooks/use-events";
import { useGetTimeSlot, useUpdateTimeSlot } from "../../hooks/use-timeslots";
import toastService from '../../services/toast-service';
import EditTimeSlotModal from "./edit-timeslot-modal";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteTimeSlot } from "../../hooks/use-timeslots";
import { useGetTimeslotParticipants, useRemoveParticipant } from "../../hooks/use-participants";

const TimeSlotOrganizer = ({ organizationId, eventId, timeSlotId }) => {
    const { data: eventData, isLoading: eventIsLoading, error: eventError } = useGetEvent(organizationId, eventId);
    const { data: timeSlotData, isLoading: timeSlotIsLoading, error: timeSlotError } = useGetTimeSlot(organizationId, eventId, timeSlotId);
    const { data: participantsData, isLoading: participantsIsLoading, error: participantsError } = useGetTimeslotParticipants(organizationId, eventId, timeSlotId);
    const [event, setEvent] = useState([]);
    const [timeSlot, setTimeSlot] = useState([]);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const navigate = useNavigate();
    const deleteTimeSlot = useDeleteTimeSlot();
    const [participants, setParticipants] = useState([]);
    const [isCancelConfirmOpen, setCancelConfirmOpen] = useState(false);
    const [isCancelling, setCanceling] = useState(false);
    const updateTimeSlot = useUpdateTimeSlot();
    const removeParticipant = useRemoveParticipant();

    useEffect(() => {
        if (timeSlotData) {
            setTimeSlot(timeSlotData);
        }
    }, [timeSlotData]);

    useEffect(() => {
        if (eventData) {
            setEvent(eventData);
        }
    }, [eventData]);

    useEffect(() => {
        if (participantsData && participantsData.participants) {
            setParticipants(participantsData.participants);
        }
    }, [participantsData]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteTimeSlot.mutateAsync({ organizationId, eventId, timeSlotId });
            navigate(`/organizations/${organizationId}/events/${eventId}`);
        } catch (err) {
            toastService.error(err.response.data.Errors.details[0]);
        } finally {
            setDeleting(false);
            setDeleteConfirmOpen(false);
        }
    };

    const handleCancel = async () => {
        setCanceling(true);
        try {
            const newTimeSlot = { ...timeSlot, isCancelled: true };
            await updateTimeSlot.mutateAsync({ organizationId, eventId, timeSlotId, timeSlot: newTimeSlot });
            toastService.success("Time slot cancelled successfully");
        } catch (err) {
            toastService.error(err.response.data.Errors.details[0]);
        } finally {
            setCanceling(false);
            setCancelConfirmOpen(false);
        }
    };

    const handleParticipantRemove = async (participantId) => {
        try {
            await removeParticipant.mutateAsync({ organizationId, eventId, timeSlotId, participantId });
        } catch (err) {
            toastService.error(err.response.data.Errors.details[0]);
        }
    };

    if (timeSlotIsLoading || eventIsLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (timeSlotError || eventError) {
        return <Typography>Error loading time slot data. Please refresh page</Typography>;
    }

    if (!timeSlotData || !eventData) {
        return <Typography>Time slot not found.</Typography>;
    }

    return (
        <Container style={{ textAlign: "left", padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                {event.name} - Time Slot
            </Typography>

            {isAvailableTimeSlot(timeSlot) && <>
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
                Edit Time Slot
            </Button>
            <Button
                variant="outlined"
                sx={{
                    margin: '0.75rem 0',
                    marginRight: isMobile ? 0 : '1rem',
                    padding: '0.5rem 1rem',
                }}
                onClick={() => setCancelConfirmOpen(true)}
                fullWidth={isMobile}
            >
                Cancel Time Slot
            </Button>
            </>}
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
                {isDeleting ? "Deleting..." : "Delete Time Slot"}
            </Button>

            <Box sx={{ marginBottom: "1rem" }} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Start time:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {formatDateTime(timeSlot.startTime)}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>End time:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {formatDateTime(timeSlot.endTime)}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Max allowed participants count:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {timeSlot.maxParticipants || "Unlimited"}
                    </Typography>
                </Grid>

            </Grid>
            <br />
            <Typography variant="h5">
                    Participants List
                </Typography>
            {participantsIsLoading && (
                <Typography variant="body1" color="textSecondary">
                    Loading...
                </Typography>
            )}
            {participantsError && (
                <Typography variant="body1" color="error">
                    Error loading participants.
                </Typography>
            )}
            {!participantsIsLoading && !participantsError && participants.length === 0 && (
                <Typography variant="body1" color="textSecondary">
                    Currently, this time slot doesn't have any participants.
                </Typography>
            )}
            {!participantsIsLoading && !participantsError && participants.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>NAME AND SURNAME</strong></TableCell>
                                <TableCell><strong>EMAIL</strong></TableCell>
                                <TableCell><strong>PHONE</strong></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {participants.map((participant) => (
                                <TableRow key={participant.id}>
                                    <TableCell>{participant.name} {participant.surname}</TableCell>
                                    <TableCell>{participant.email}</TableCell>
                                    <TableCell>{participant.phoneNumber}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                handleParticipantRemove(participant.id);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {isEditModalOpen && (
                <EditTimeSlotModal
                    open={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    organizationId={organizationId}
                    eventId={eventId}
                    timeSlot={timeSlot}
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
                        Delete Time Slot
                    </DialogTitle>
                    <DialogActions>
                        <IconButton edge="end" color="primary" onClick={() => setDeleteConfirmOpen(false)} sx={{ padding: '1rem' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Box>
                <DialogContent>
                    <Typography id="delete-confirmation-description" sx={{ marginBottom: '1rem' }}>
                        Are you sure you want to delete this time slot?
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

            <Dialog
                open={isCancelConfirmOpen}
                onClose={() => setCancelConfirmOpen(false)}
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        overflow: 'hidden',
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <DialogTitle sx={{ fontWeight: 'bold', margin: 0, flexGrow: 1, padding: '1rem' }}>
                        Cancel Time Slot
                    </DialogTitle>
                    <DialogActions>
                        <IconButton edge="end" color="primary" onClick={() => setCancelConfirmOpen(false)} sx={{ padding: '1rem' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Box>
                <DialogContent>
                    <Typography id="cancel-confirmation-description" sx={{ marginBottom: '1rem' }}>
                        Are you sure you want to cancel this time slot?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: 'primary.main' }}
                            onClick={handleCancel}
                            disabled={isCancelling}
                            fullWidth={isMobile}
                        >
                            {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

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
    return !timeSlot.isCancelled && new Date(timeSlot.startTime) > new Date();
};

export default TimeSlotOrganizer;
