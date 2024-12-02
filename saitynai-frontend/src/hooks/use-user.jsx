import { useContext } from 'react';
import { UserContext } from '../services/auth-provider';

export const useUserRole = () => {
  const userContext = useContext(UserContext);
  return userContext?.user?.decodedJwt?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
};

export const useUserId = () => {
  const userContext = useContext(UserContext);
  return userContext?.user?.decodedJwt?.sub;
};


export const useUserName = () => {
  const userContext = useContext(UserContext);
  return userContext?.user?.decodedJwt?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
};

export const useUserOrganizationId = () => {
  const userContext = useContext(UserContext);
  return userContext?.user?.decodedJwt?.OrganizationId;
};

