import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Link, Box, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const Contacts = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Link href="#" onClick={handleOpen} underline="hover" color="secondary">
        <Typography>Contacts</Typography>
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
          <DialogTitle sx={{ fontWeight: 'bold', margin: 0, flexGrow: 1 }}>
            Contacts
          </DialogTitle>
          <DialogActions>
            <IconButton edge="end" color="primary" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Box>
        <DialogContent>
          <Typography variant="body1">
            If you need any help or information, you can reach out to us by email or phone.<br /><br />
            Email: support@events.com<br />
            Phone: +37068888888 (We provide consultations during working hours: I–V  8 a.m. – 8 p.m., VI  9 a.m. – 4 p.m.)
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Contacts;
