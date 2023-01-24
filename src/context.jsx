import { createContext, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppContext = createContext();

const getUserFromLocallStorage = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserFromLocallStorage());
  const [userInputs, setUserInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    const { name, email, password } = userInputs;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        { name, email, password }
      );

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setUserInputs({
        name: '',
        email: '',
        password: ''
      });
      navigate('/todos');
    } catch (error) {
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = userInputs;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        {
          email,
          password
        }
      );
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setUserInputs({
        name: '',
        email: '',
        password: ''
      });
      navigate('/todos');
    } catch (error) {
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  const showAlert = (msg = '', type = '', show = false) => {
    setAlert({ msg, type, show });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        userInputs,
        alert,
        inputRef,
        setUser,
        showAlert,
        setAlert,
        handleChange,
        login,
        register
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
