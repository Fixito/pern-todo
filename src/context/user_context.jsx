import React, { useContext, useReducer } from 'react';
import user_reducer from '../reducers/user_reducer.js';

const UserContext = React.createContext();

const initialState = {
  name: null,
  token: ''
};

export const UserProvider = () => {
  const [state, dispatch] = useReducer(user_reducer, initialState);
};

export const useTodosContext = () => useContext(UserContext);
