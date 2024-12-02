import React, { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetOrganizationsList } from "../../hooks/use-organizations";

const OrganizationsGuestAndUser = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetOrganizationsList();

    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        if (data && data.organizations) {
            setOrganizations(data.organizations);
        }
    }, [data]);

    return (
        <Container style={{ textAlign: "left", padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Organizations
            </Typography>
            {isLoading && (
                <Typography variant="body1" color="textSecondary">
                    Loading...
                </Typography>
            )}
            {error && (
                <Typography variant="body1" color="error">
                    Error loading organizations.
                </Typography>
            )}
            {!isLoading && !error && organizations.length === 0 && (
                <Typography variant="body1" color="textSecondary">
                    Currently, there are no organizations available. Come back next time!
                </Typography>
            )}
            {!isLoading && !error && organizations.length > 0 && (
                <List>
                    {organizations.map((org) => (
                        <ListItem
                            key={org.id}
                            onClick={() => navigate(`/organizations/${org.id}`)}
                        >
                            <ListItemText
                                sx={{
                                    cursor: "pointer",
                                    transition: "visibility 0.3s, opacity 0.3s",
                                    "&:hover": {
                                        opacity: 0.7,
                                    },
                                }}
                            >
                                - {org.name}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default OrganizationsGuestAndUser;
