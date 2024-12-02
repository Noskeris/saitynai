import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/api';
import { UserContext } from '../../services/auth-provider';
import { useContext } from 'react';
import { useMediaQuery } from '@mui/material';

const Login = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login(values);
        user.login(response.token);
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
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
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
          {formik.isSubmitting ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
    </Container>
  );
};

export default Login;