import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateTimeSlot } from "../../hooks/use-timeslots";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toastService from "../../services/toast-service";
import dayjs from "dayjs";

const EditTimeSlotModal = ({ open, onClose, organizationId, eventId, timeSlot }) => {
    const editTimeSlot = useUpdateTimeSlot();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const formik = useFormik({
        initialValues: {
            startTime: dayjs(timeSlot.startTime).format("YYYY-MM-DDTHH:mm"),
            endTime: dayjs(timeSlot.endTime).format("YYYY-MM-DDTHH:mm"),
            maxParticipants: timeSlot.maxParticipants || "",
        },
        validationSchema: Yup.object({
            startTime: Yup.string()
                .required("Start time is required")
                .test("future-start-time", "Start time must be in the future", (value) =>
                    value ? dayjs(value).isAfter(dayjs()) : false
                ),
            endTime: Yup.string()
                .required("End time is required")
                .test("future-end-time", "End time must be in the future", (value) =>
                    value ? dayjs(value).isAfter(dayjs()) : false
                )
                .test("end-after-start", "End time must be after start time", function (value) {
                    return value ? dayjs(value).isAfter(dayjs(this.parent.startTime)) : false;
                }),
            maxParticipants: Yup.number()
                .nullable()
                .transform((value, originalValue) =>
                    typeof originalValue === "string" && originalValue.trim() === "" ? null : value
                )
                .min(1, "Max participants must be greater than 0")
                .max(2147483647, "Are you sure you can have that many participants?")
                .typeError("Max participants must be a number or empty for unlimited"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const formattedValues = {
                startTime: dayjs(values.startTime).format("YYYY-MM-DDTHH:mm"),
                endTime: dayjs(values.endTime).format("YYYY-MM-DDTHH:mm"),
                maxParticipants: values.maxParticipants || null,
            };
            try {
                await editTimeSlot.mutateAsync({
                    organizationId,
                    eventId,
                    timeSlotId: timeSlot.id,
                    timeSlot: formattedValues,
                });
                toastService.success("Time slot updated successfully");
                onClose();
            } catch (err) {
                toastService.error(err.response?.data?.Errors?.details?.[0] || "Failed to update time slot");
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
                    Update Time Slot
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
                        id="startTime"
                        name="startTime"
                        label="Start Time"
                        type="datetime-local"
                        value={formik.values.startTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                        helperText={formik.touched.startTime && formik.errors.startTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="endTime"
                        name="endTime"
                        label="End Time"
                        type="datetime-local"
                        value={formik.values.endTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                        helperText={formik.touched.endTime && formik.errors.endTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="maxParticipants"
                        name="maxParticipants"
                        label="Max Participants (leave empty for Unlimited)"
                        value={formik.values.maxParticipants}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.maxParticipants && Boolean(formik.errors.maxParticipants)}
                        helperText={formik.touched.maxParticipants && formik.errors.maxParticipants}
                    />
                    <Box sx={{ textAlign: "right", marginTop: "1rem" }}>
                        <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Saving..." : "Update Time Slot"}
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTimeSlotModal;
