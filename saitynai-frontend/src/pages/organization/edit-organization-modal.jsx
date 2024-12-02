import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateOrganization } from "../../hooks/use-organizations";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const EditOrganizationModal = ({ open, onClose, organization }) => {
    const updateOrganization = useUpdateOrganization();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const formik = useFormik({
        initialValues: {
            name: organization.name,
            description: organization.description,
            contactInfo: organization.contactInfo,
            address: organization.address,
            website: organization.website,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            contactInfo: Yup.string().required("Contact information is required"),
            address: Yup.string().required("Address is required"),
            website: Yup.string().required("Website is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await updateOrganization.mutateAsync({ ...organization, ...values });
                onClose();
            } catch (error) {
                console.error("Failed to update organization", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dialog
                open={open}
                onClose={onClose}
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        overflow: 'hidden',
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <DialogTitle sx={{ fontWeight: 'bold', margin: 0, flexGrow: 1, padding: '1rem' }}>
                        Update Organization
                    </DialogTitle>
                    <DialogActions>
                        <IconButton edge="end" color="primary" onClick={onClose} sx={{ padding: '1rem' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Box>
                <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="contactInfo"
                        name="contactInfo"
                        label="Contact Info"
                        value={formik.values.contactInfo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contactInfo && Boolean(formik.errors.contactInfo)}
                        helperText={formik.touched.contactInfo && formik.errors.contactInfo}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="address"
                        name="address"
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="website"
                        name="website"
                        label="Website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                    <Box sx={{ textAlign: "right", marginTop: "1rem" }}>
                        <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </Box>
                </form>
                </DialogContent>
            </Dialog>
    );
};

export default EditOrganizationModal;
