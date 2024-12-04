import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateEvent } from "../../hooks/use-events";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toastService from "../../services/toast-service";

const CreateEventModal = ({ open, onClose, organizationId }) => {
    const createEvent = useCreateEvent();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            location: "",
            requirements: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            location: Yup.string().required("Location is required"),
            requirements: Yup.string().required("Requirements are required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await createEvent.mutateAsync({ organizationId, event: values });
                onClose();
            } catch (err) {
                toastService.error(err.response.data.Errors.details[0]);
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
                    overflow: "hidden",
                },
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <DialogTitle sx={{ fontWeight: "bold", margin: 0, flexGrow: 1, padding: "1rem" }}>
                    Create Event
                </DialogTitle>
                <DialogActions>
                    <IconButton edge="end" color="primary" onClick={onClose} sx={{ padding: "1rem" }}>
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
                        id="location"
                        name="location"
                        label="Location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.location && Boolean(formik.errors.location)}
                        helperText={formik.touched.location && formik.errors.location}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="requirements"
                        name="requirements"
                        label="Requirements"
                        value={formik.values.requirements}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.requirements && Boolean(formik.errors.requirements)}
                        helperText={formik.touched.requirements && formik.errors.requirements}
                    />
                    <Box sx={{ textAlign: "right", marginTop: "1rem" }}>
                        <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Saving..." : "Create Event"}
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEventModal;
