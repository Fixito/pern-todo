import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context.jsx';

const Logout = () => {
  const { logout } = useUserContext();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to='/' />;
};

export default Logout;
