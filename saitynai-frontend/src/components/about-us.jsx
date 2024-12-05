import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Link, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const AboutUs = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Link href="#" onClick={handleOpen} underline="hover" color="secondary">
                <Typography>About Us</Typography>
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        overflow: 'hidden',
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <DialogTitle sx={{ fontWeight: 'bold', margin: 0, flexGrow: 1, padding: '1rem' }}>
                        About Us
                    </DialogTitle>
                    <DialogActions>
                        <IconButton edge="end" color="primary" onClick={handleClose} sx={{ padding: '1rem' }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Box>
                <DialogContent>
                    <Typography>
                        This system was created as a final project for the KTU Saitynai module. The system is designed
                        for organizations to manage their organized events. The system allows organizations to create,
                        edit, delete, and view events, as well as view participants. Participants can register for
                        events or cancel their registration. Guests can do everything participants can, except for
                        registering for events.
                    </Typography>

                    <img src="/ktu-logo-lt-pilnas.png" alt="KTU logo" style={{ width: '100%', height: 'auto' }} />

                </DialogContent>
            </Dialog>
        </>
    );
};

export default AboutUs;
