import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetOrganization } from "../../hooks/use-organizations";
import { useGetEventsList } from "../../hooks/use-events";

const OrganizationGuestAndUser = ({ organizationId }) => {
    const navigate = useNavigate();
    const { data: organizationData, isLoading: organizationIsLoading, error: organizationError } = useGetOrganization(organizationId);
    const { data: eventsData, isLoading: eventsIsLoading, error: eventsError } = useGetEventsList(organizationId);
    const [organization, setOrganization] = useState();
    const [events, setEvents] = useState([]);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        if (organizationData) {
            setOrganization(organizationData);
        }
    }, [organizationData]);

    useEffect(() => {
        if (eventsData && eventsData.events) {
            setEvents(eventsData.events);
        }
    }, [eventsData]);

    if (organizationIsLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (organizationError) {
        return <Typography>Error loading organization data. Please refresh page</Typography>;
    }

    if (!organization) {
        return <Typography>Organization not found.</Typography>;
    }

    return (
        <Container style={{ textAlign: "left", padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                {organization.name}
            </Typography>

            <Box sx={{ marginBottom: "1rem" }} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Description:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {organization.description}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Address:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {organization.address}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Contact Info:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {organization.contactInfo}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Website:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {organization.website}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Is Non-Profit:</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {organization.isNonProfit ? "Yes" : "No"}
                    </Typography>
                </Grid>
            </Grid>
            <br />
            <Typography variant="h5" gutterBottom>
                Organization's events
            </Typography>
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
                    Currently, there are no events available for this organization. Come back next time!
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
        </Container>
    );
};

export default OrganizationGuestAndUser;
