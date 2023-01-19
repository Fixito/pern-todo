import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context.jsx';

const Logout = () => {
  const { setUser } = useGlobalContext();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, [setUser]);

  return <Navigate to='/' />;
};

export default Logout;
