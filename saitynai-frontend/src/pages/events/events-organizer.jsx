import React, { useEffect, useState } from "react";
import { Container, Typography, Button, useMediaQuery, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetEventsList } from "../../hooks/use-events";
import CreateEventModal from "./create-event-modal";

const EventsOrganizer = ({organizationId}) => {
    const navigate = useNavigate();
    const {data: eventsData, isLoading: eventsIsLoading, error: eventsError} = useGetEventsList(organizationId);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (eventsData && eventsData.events) {
            setEvents(eventsData.events);
        }
    }, [eventsData]);

    return (
        <Container style={{ textAlign: "left", padding: "2rem" }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                }}
            >
                <Typography variant="h4">
                    Events
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
                    Add Event
                </Button>
            </div>
            {eventsIsLoading && (
                <Typography variant="body1" color="textSecondary">
                    Loading...
                </Typography>
            )}
            {eventsError && (
                <Typography variant="body1" color="error">
                    Error loading events.
                </Typography>
            )}
            {!eventsIsLoading && !eventsError && events.length === 0 && (
                <Typography variant="body1" color="textSecondary">
                    Your organization doesn't have any events yet. Click the button to create a new event.
                </Typography>
            )}
            {!eventsIsLoading && !eventsError && events.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>NAME</strong></TableCell>
                                {!isMobile && <TableCell><strong>LOCATION</strong></TableCell>}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.name}</TableCell>
                                    {!isMobile && <TableCell>{event.location}</TableCell>}
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`/organizations/${organizationId}/events/${event.id}`)}
                                        >
                                            MORE DETAILS
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {isCreateModalOpen && (
                <CreateEventModal
                    open={isCreateModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    organizationId={organizationId}
                />
            )}
        </Container>
    );
};

export default EventsOrganizer;
