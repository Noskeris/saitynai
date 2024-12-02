import React, {useState, useEffect} from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserOrganizationId } from '../../hooks/use-user';
import { useGetOrganization } from '../../hooks/use-organizations';


const HomeOrganizer = () => {
  const userOrganizationId = useUserOrganizationId();
  const [organizationId, setOrganizationId] = useState(userOrganizationId);

  useEffect(() => {
    setOrganizationId(userOrganizationId);
  }, [userOrganizationId]);

  return (
    <>
      {organizationId ? <HomeOrganizerWithOrganization organizationId={organizationId} /> : <HomeOrganizerWithoutOrganization />}
    </>
  );
};

const HomeOrganizerWithoutOrganization = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return <Container style={{ textAlign: 'center', padding: '2rem' }}>
    <Typography variant="h4" gutterBottom padding={3}>
      Your organization is ready for set up
    </Typography>

    <Button
      variant="contained"
      sx={{
        margin: '1.5rem 0',
        padding: '0.5rem 2rem',
        backgroundColor: 'custom3.main',
      }}
      onClick={() => navigate('/setup-organization')}
      fullWidth={isMobile}
    >
      Set up organization
    </Button>
  </Container>
};

const HomeOrganizerWithOrganization = ({ organizationId }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { data: organizationData, isLoading: organizationIsLoading, error: organizationError } = useGetOrganization(organizationId);

  if (organizationIsLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (organizationError) {
    return <Typography>Error loading organization data. Please refresh page</Typography>;
  }

  return <Container style={{ textAlign: 'center', padding: '2rem' }}>
    <Typography variant="h4" gutterBottom padding={1}>
      {organizationData.name}
    </Typography>

    <Typography variant="h6" gutterBottom>
      Want to update organization details? <Button
        variant="contained"
        sx={{
          margin: '1rem 0',
          padding: '0.5rem 1rem',
          backgroundColor: 'custom3.main',
        }}
        onClick={() => navigate(`/organizations/${organizationId}`)}
        fullWidth={isMobile}
      >
        Go to organization
      </Button>
    </Typography>
    <Typography variant="h6" gutterBottom>
      Want to see all you events? <Button
        variant="contained"
        sx={{
          margin: '1rem 0',
          padding: '0.5rem 1rem',
          backgroundColor: 'custom3.main',
        }}
        onClick={() => navigate(`/organizations/${organizationId}/events`)}
        fullWidth={isMobile}
      >
        Go to events
      </Button>
    </Typography>
  </Container>
};

export default HomeOrganizer;
