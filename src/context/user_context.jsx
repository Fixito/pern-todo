import React, { useContext, useReducer } from 'react';
import user_reducer from '../reducers/user_reducer.js';
import { useGlobalContext } from './global_context.jsx';
import { getLocalStorage } from '../utils/helpers.js';
import { HANDLE_CHANGE, LOGOUT_USER, LOGIN_USER } from '../action.js';
import { auth_url as url } from '../utils/constants.js';
import axios from 'axios';

const UserContext = React.createContext();

const initialState = {
  name: getLocalStorage().user?.name,
  token: getLocalStorage().token,
  user_inputs: {
    name: '',
    email: '',
    password: ''
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, initialState);
  const { showAlert } = useGlobalContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const register = async () => {
    const {
      user_inputs: { name, email, password }
    } = state;

    try {
      const { data } = await axios.post(`${url}register`, {
        name,
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({
        type: LOGIN_USER,
        payload: data
      });
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  };

  const login = async (e) => {
    const {
      user_inputs: { email, password }
    } = state;

    try {
      const { data } = await axios.post(`${url}login`, {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: LOGIN_USER, payload: data });
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <UserContext.Provider
      value={{ ...state, handleChange, register, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
