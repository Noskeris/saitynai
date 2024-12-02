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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula dolor nec odio bibendum, sed
                        facilisis nulla scelerisque. Integer quis nibh ut sapien eleifend laoreet at ut elit.
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AboutUs;
