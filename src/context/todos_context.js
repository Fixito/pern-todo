import React, { useContext, useReducer } from 'react';
import todos_reducer from '../reducers/todos_reducer.js';

const initialState = {};

const TodosContext = React.createContext();

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todos_reducer, initialState);

  const getTodos = () => {
    // dispatch({type: })
  };
  return <TodosContext value={{}}>{children}</TodosContext>;
};

export const useTodosContext = () => {
  return useContext(TodosContext);
};
