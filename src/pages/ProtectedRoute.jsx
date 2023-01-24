import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context.jsx';

const ProtectedRoute = ({ children }) => {
  const { token } = useUserContext();

  if (!token) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;
