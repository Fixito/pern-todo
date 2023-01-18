import { useEffect } from 'react';
import { useGlobalContext } from '../context.jsx';

const Alert = ({ msg, type }) => {
  const { showAlert: removeAlert, todoList } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [removeAlert, todoList]);

  return (
    <div role='alert' className={`alert alert-${type}`}>
      {msg}
    </div>
  );
};

export default Alert;
