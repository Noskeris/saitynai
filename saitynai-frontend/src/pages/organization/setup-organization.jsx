import { Button, TextField, Container, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useCreateOrganization } from '../../hooks/use-organizations';
import toastService from '../../services/toast-service';
import { useUserOrganizationId } from '../../hooks/use-user';
import NotFound from '../not-found';
import { UserContext } from '../../services/auth-provider';

const SetupOrganization = () => {
    const [isNonProfit, setIsNonProfit] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const createOrganization = useCreateOrganization();
    const navigate = useNavigate();
    const userOrganizationId = useUserOrganizationId();
    const user = useContext(UserContext);

    const handleIsNonProfitChange = (_, newIsNonProfit) => {
        if (newIsNonProfit !== null) {
            setIsNonProfit(newIsNonProfit);
            formik.setFieldValue('isNonProfit', newIsNonProfit);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            contactInfo: '',
            address: '',
            website: '',
            isNonProfit: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required'),
            contactInfo: Yup.string().required('Contact information is required'),
            address: Yup.string().required('Address is required'),
            website: Yup.string().required('Website is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await createOrganization.mutateAsync(values);
                await user.renewToken();
                navigate("/");
            } catch (err) {
                toastService.error(err.response.data.Errors.details[0]);
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (userOrganizationId) {
        return <NotFound />;
    }

    return (
        <Container style={{ textAlign: 'center', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom padding={3}>
                Set Up Organization
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        sx={{ minWidth: '50%' }}
                        fullWidth={isMobile}
                        id="contactInfo"
                        name="contactInfo"
                        label="Contant information"
                        variant="outlined"
                        value={formik.values.contactInfo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contactInfo && Boolean(formik.errors.contactInfo)}
                        helperText={formik.touched.contactInfo && formik.errors.contactInfo}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        sx={{ minWidth: '50%' }}
                        fullWidth={isMobile}
                        id="address"
                        name="address"
                        label="Address"
                        variant="outlined"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        sx={{ minWidth: '50%' }}
                        fullWidth={isMobile}
                        id="website"
                        name="website"
                        label="Website"
                        variant="outlined"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                </Box>
                <Box mb={2}>
                    <ToggleButtonGroup
                        sx={{ width: isMobile ? '100%' : '50%' }}
                        fullWidth={isMobile}
                        value={isNonProfit}
                        exclusive
                        onChange={handleIsNonProfitChange}
                        aria-label="Is Non Profit toggle"
                    >
                        <ToggleButton sx={{ width: '50%' }} fullWidth={isMobile} value={false} aria-label="No">
                            For-Profit organization
                        </ToggleButton>
                        <ToggleButton sx={{ width: '50%' }} fullWidth={isMobile} value={true} aria-label="Yes">
                            Non-Profit organization
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Button
                    sx={{ margin: '1.5rem 0', padding: '0.5rem 2rem', backgroundColor: 'custom3.main', minWidth: '30%' }}
                    fullWidth={isMobile}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Setting Up...' : 'Set Up'}
                </Button>
            </form>
        </Container>
    );
};

export default SetupOrganization;