import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetOrganization } from "../../hooks/use-organizations";
import { useGetEvent } from "../../hooks/use-events";
import { useGetTimeSlotsList } from "../../hooks/use-timeslots";
import toastService from '../../services/toast-service';
import EditEventModal from "./edit-event-modal";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteEvent } from "../../hooks/use-events";
import CreateTimeSlotModal from "./create-timeslot-modal";

const EventOrganizer = ({ organizationId, eventId }) => {
    const { data: organizationData, isLoading: organizationIsLoading, error: organizationError } = useGetOrganization(organizationId);
    const { data: eventData, isLoading: eventIsLoading, error: eventError } = useGetEvent(organizationId, eventId);
    const { data: timeSlotsData, isLoading: timeSlotsIsLoading, error: timeSlotsError } = useGetTimeSlotsList(organizationId, eventId);
    const [organization, setOrganization] = useState();
    const [event, setEvent] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
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
            await deleteEvent.mutateAsync({ organizationId, eventId });
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
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timeSlots.map((timeSlot) => (
                                <TableRow key={timeSlot.id}>
                                    <TableCell>{formatDateTime(timeSlot.startTime)}</TableCell>
                                    <TableCell>{formatDateTime(timeSlot.endTime)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                navigate(`/organizations/${organizationId}/events/${eventId}/timeslots/${timeSlot.id}`);
                                            }}
                                        >
                                            More Details
                                        </Button>
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

            {isCreateModalOpen && (
                <CreateTimeSlotModal
                    open={isCreateModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    organizationId={organizationId}
                    eventId={eventId}
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
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default EventOrganizer;
