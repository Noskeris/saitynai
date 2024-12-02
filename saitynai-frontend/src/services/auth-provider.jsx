import { createContext, useState, useEffect } from 'react';
import authService from './auth';
import toastService from "../services/toast-service";

export const UserContext = createContext(null);

function AuthenticationProvider({ children }) {

  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const [user, setUser] = useState(storedUser || null);

  useEffect(() => {
    const currentUser = authService.getUserInfo();
    setUser(currentUser);
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }, []);

  const isLoggedIn = !!user;

  const logout = async () => {
    const result = await authService.logout();
    
    if (result) {
      authService.removeCookies();
      setUser(null);
      sessionStorage.removeItem('user');
      toastService.success('Logout successful');
    }
  };

  const login = (token) => {
    authService.setCookies(token);
    const currentUser = authService.getUserInfo();
    setUser(currentUser);
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  };

  const renewToken = async () => {
    const updatedUser = await authService.renewToken();
  
    if (updatedUser) {
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  

  return (
    <UserContext.Provider value={{
      user: user,
      isLoggedIn,
      logout,
      login,
      renewToken,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default AuthenticationProvider;