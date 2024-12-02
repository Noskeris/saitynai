import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Box, Grid, Button, useMediaQuery, Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { useGetOrganization, useDeleteOrganization } from "../../hooks/use-organizations";
import EditOrganizationModal from "./edit-organization-modal";
import { UserContext } from "../../services/auth-provider";

const OrganizationOrganizer = ({ organizationId }) => {
    const { data: organizationData, isLoading: organizationIsLoading, error: organizationError } = useGetOrganization(organizationId);
    const [organization, setOrganization] = useState();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const deleteOrganization = useDeleteOrganization();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const user = useContext(UserContext);

    useEffect(() => {
        if (organizationData) {
            setOrganization(organizationData);
        }
    }, [organizationData]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteOrganization.mutateAsync(organizationId);
            await user.renewToken();
            navigate("/");
        } catch (error) {
            console.error("Failed to delete organization", error);
        } finally {
            setDeleting(false);
            setDeleteConfirmOpen(false);
        }
    };

    if (organizationIsLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (organizationError) {
        return <Typography>Error loading organization data. Please refresh the page.</Typography>;
    }

    if (!organization) {
        return <Typography>Organization not found.</Typography>;
    }

    return (
        <Container style={{ textAlign: "left", padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                {organization.name}
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
                Edit Organization
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
                {isDeleting ? "Deleting..." : "Delete Organization"}
            </Button>

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
            </Grid>

            {isEditModalOpen && (
                <EditOrganizationModal
                    open={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    organization={organization}
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
                        Delete Organization
                    </DialogTitle>
                    <DialogActions>
                        <IconButton edge="end" color="primary" onClick={() => setDeleteConfirmOpen(false)} sx={{ padding: '1rem' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Box>
                <DialogContent>
                    <Typography id="delete-confirmation-description" sx={{ marginBottom: '1rem' }}>
                        Are you sure you want to delete this organization?
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

export default OrganizationOrganizer;
