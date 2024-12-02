import { Button, TextField, Container, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/api';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';

const Register = () => {
  const [role, setRole] = useState('User');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleRoleChange = (_, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
      formik.setFieldValue('role', newRole);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: 'User',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      surname: Yup.string().required('Surname is required'),
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phoneNumber: Yup.string().required('Phone is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await register(values);
        navigate('/');
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container style={{ textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom padding={3}>
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
      <Box mb={2}>
        <ToggleButtonGroup
          sx={{ minWidth: '50%' }}
          fullWidth={isMobile}
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="User role toggle"
        >
          <ToggleButton sx={{ minWidth: '50%' }} fullWidth={isMobile} value="User" aria-label="User">
            Register as user
          </ToggleButton>
          <ToggleButton sx={{ minWidth: '50%' }} fullWidth={isMobile} value="Organizer" aria-label="Organizer">
            Register as organizer
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
        <Box mb={2}>
          <TextField
            sx={{ minWidth: '50%' }}
            fullWidth={isMobile}
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box mb={2}>
          <TextField
            sx={{ minWidth: '50%' }}
            fullWidth={isMobile}
            id="surname"
            name="surname"
            label="Surname"
            variant="outlined"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
        </Box>
        <Box mb={2}>
          <TextField
            sx={{ minWidth: '50%' }}
            fullWidth={isMobile}
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box mb={2}>
          <TextField
            sx={{ minWidth: '50%' }}
            fullWidth={isMobile}
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mb={2}>
          <TextField
            sx={{ minWidth: '50%' }}
            fullWidth={isMobile}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone"
            variant="outlined"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Box>
        <Box mb={2}>
          <TextField
            sx={{ minWidth: '50%' }}
            fullWidth={isMobile}
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Button
          sx={{ margin: '1.5rem 0', padding: '0.5rem 2rem', backgroundColor: 'custom3.main', minWidth: '30%' }}
          fullWidth={isMobile}
          variant="contained"
          color="primary"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Container>
  );
};

export default Register;